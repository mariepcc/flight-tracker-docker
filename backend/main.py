from fastapi import FastAPI
from fastapi import HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func
from serpapi.google_search import GoogleSearch
from database import get_db, engine
import models
from models import Offer
from schema import FlightEntry
from utils import process_flight_data
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/tracked-flights")
async def results(db: Session = Depends(get_db)):
    subquery = (
        db.query(func.max(Offer.id).label("latest_id"))
        .group_by(Offer.origin_code, Offer.destination_code, Offer.departure_date)
        .subquery()
    )

    latest_offers = db.query(Offer).filter(Offer.id.in_(subquery)).all()

    if not latest_offers:
        return []

    results = []
    for offer in latest_offers:
        history = (
            db.query(Offer.price, Offer.created_at)
            .filter(
                Offer.origin_code == offer.origin_code,
                Offer.destination_code == offer.destination_code,
                Offer.departure_date == offer.departure_date,
            )
            .order_by(Offer.created_at.asc())
            .all()
        )

        price_history = [
            {"price": h.price, "fetched_at": h.created_at} for h in history
        ]

        results.append(
            {
                "id": offer.id,
                "origin_code": offer.origin_code,
                "origin_airport": offer.origin_airport,
                "destination_code": offer.destination_code,
                "destination_airport": offer.destination_airport,
                "price": offer.price,
                "departure_date": offer.departure_date,
                "departure_time": offer.departure_time,
                "arrival_time": offer.arrival_time,
                "duration": offer.duration,
                "stop_airports": offer.stop_airports,
                "price_history": price_history,
            }
        )

    return results


@app.get("/get-flights")
def get_flights(origin: str, destination: str, date: str):
    params = {
        "engine": "google_flights",
        "departure_id": origin,
        "arrival_id": destination,
        "outbound_date": date,
        "currency": "PLN",
        "hl": "en",
        "api_key": os.getenv("SERPAPI_KEY"),
        "type": "2",
        "sort_by": "1",
    }

    try:
        search = GoogleSearch(params)

        results = search.get_dict()

        if "error" in results:
            raise HTTPException(status_code=400, detail=results["error"])

        best = results.get("best_flights", [])
        others = results.get("other_flights", [])

        all_flights = best + others

        if not all_flights:
            return {"message": "Brak wyników"}

        top_result = all_flights[0]

        return process_flight_data(top_result)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/update-tracked-flights")
async def update_prices(db: Session = Depends(get_db)):
    flights = (
        db.query(
            Offer.origin_code,
            Offer.origin_airport,
            Offer.destination_code,
            Offer.destination_airport,
            Offer.departure_date,
        )
        .distinct(Offer.destination_code, Offer.departure_date)
        .all()
    )

    counter = 0

    for f in flights:
        try:
            new_data = get_flights(
                origin=str(f.origin_code),
                destination=str(f.destination_code),
                date=str(f.departure_date),
            )
            if new_data:
                new_price_entry = Offer(
                    origin_code=f.origin_code,
                    origin_airport=f.origin_airport,
                    destination_code=f.destination_code,
                    destination_airport=f.destination_airport,
                    price=new_data["price"],
                    departure_date=f.departure_date,
                    departure_time=new_data["departure_time"],
                    arrival_time=new_data["arrival_time"],
                    duration=new_data["duration"],
                )
                db.add(new_price_entry)
                counter += 1

        except Exception as e:
            print(f"Error updating {f.destination_code}: {e}")

    db.commit()

    return {"status": "success", "added": counter}


@app.post("/add-flight")
async def add_flight(flight: FlightEntry, db: Session = Depends(get_db)):
    try:
        stops = ", ".join(flight.stop_airports) if flight.stop_airports else ""
        new_flight = Offer(
            origin_code=flight.origin_code,
            origin_airport=flight.origin_airport,
            destination_code=flight.destination_code,
            destination_airport=flight.destination_airport,
            price=flight.price,
            departure_date=flight.departure_date,
            departure_time=flight.departure_time,
            arrival_time=flight.arrival_time,
            duration=flight.duration,
            stop_airports=stops,
        )

        db.add(new_flight)
        db.commit()
        db.refresh(new_flight)

        return {
            "status": "success",
            "message": f"Flight to {flight.destination_code} tracked!",
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/delete-flight")
async def delete_flight(
    flight_dest: str, departure_date: str, db: Session = Depends(get_db)
):
    try:
        query = db.query(Offer).filter(
            Offer.destination_code == flight_dest,
            Offer.departure_date == departure_date,
        )
        if query.count() == 0:
            raise HTTPException(
                status_code=404, detail="Nie znaleziono lotów do usunięcia"
            )

        query.delete(synchronize_session=False)

        db.commit()

        return {"status": "success", "message": "Flight deleted successfully"}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

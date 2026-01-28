from pydantic import BaseModel, ConfigDict
from typing import Optional


class FlightEntry(BaseModel):
    origin_code: str
    origin_airport: str
    destination_code: str
    destination_airport: str
    price: int
    departure_date: str
    departure_time: str
    arrival_time: str
    duration: int
    stop_airports: Optional[list[str]] = None
    model_config = ConfigDict(from_attributes=True)

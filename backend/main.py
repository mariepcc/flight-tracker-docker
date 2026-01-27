from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/results")
async def results():
    return {"message": "Flight results"}


@app.get("/get-flights")
async def get_flights():
    return {"message": "Flight details"}


@app.post("/add-flight")
async def add_flight():
    return {"message": "Flight added successfully"}


@app.delete("/delete-flight")
async def delete_flight():
    return {"message": "Flight deleted successfully"}

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class ValueRequest(BaseModel):
    item: str
    quantity: float
    location: str

@app.get("/")
def home():
    return {
        "message": "Welcome to ValueVerse Backend!"
    }


@app.get("/health")
def health():
    return {
        "status": "Backend is running"
    }

@app.post("/api/value")
def calculate_value(data: ValueRequest):
    return {
        "message": "Data received successfully",
        "item": data.item,
        "quantity": data.quantity,
        "location": data.location
    }
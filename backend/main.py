from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
def get_value(data: ValueRequest):
    return {
        "message": "Data received successfully",
        "item": data.item,
        "quantity": data.quantity,
        "location": data.location
    }
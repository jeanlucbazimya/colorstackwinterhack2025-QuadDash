from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import auth, rides
from .database import Base, engine

app = FastAPI(title="Campus Ride Backend", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
        "http://127.0.0.1:5173",],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(rides.router)


@app.get("/")
def root():
    return {"message": "Backend is running", "docs": "/docs"}
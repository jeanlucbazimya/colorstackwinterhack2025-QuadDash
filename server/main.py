from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import auth
from .database import Base, engine

app = FastAPI(title="Campus Ride Backend", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)


@app.get("/")
def root():
    return {"message": "Backend is running", "docs": "/docs"}
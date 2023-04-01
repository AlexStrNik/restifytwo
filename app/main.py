from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import auth, restaurants, admin, archilogic, reservations
from .database import Base, engine

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(archilogic.router)
app.include_router(restaurants.router)
app.include_router(reservations.router)

Base.metadata.create_all(bind=engine)

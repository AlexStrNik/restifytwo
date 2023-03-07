from datetime import date
from pydantic import BaseModel

from .restaurant import Restaurant

class ReservationBase(BaseModel):
    guests_count: int
    date: date


class APIReservationCreate(ReservationBase):
    pass


class ReservationCreate(APIReservationCreate):
    guest_id: int
    table_id: str
    restaurant_id: int


class Reservation(ReservationBase):
    id: int
    guest_id: int
    restaurant: Restaurant

    class Config:
        orm_mode = True

class APIReservation(Reservation):
    pass
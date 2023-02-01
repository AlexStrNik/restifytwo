from typing import List
from pydantic import BaseModel

from .reservation import Reservation
from .restaurant import Restaurant


class UserBase(BaseModel):
    email: str


class APIUserSign(UserBase):
    password: str


class APIUserRegister(APIUserSign):
    name: str


class UserCreate(APIUserRegister):
    pass


class APIUser(UserBase):
    id: str
    name: str
    is_admin: bool
    reservations: List[Reservation] = []
    owned_restaurants: List[Restaurant] = []

    class Config:
        orm_mode = True


class User(APIUser):
    hashed_password: str

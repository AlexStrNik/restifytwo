from typing import List, Optional
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
    phone: Optional[str]
    archilogic_secret_token: Optional[str]
    archilogic_public_token: Optional[str]
    reservations: List[Reservation] = []
    owned_restaurants: List[Restaurant] = []

    class Config:
        orm_mode = True


class APIUserUpdate(BaseModel):
    name: Optional[str]
    phone: Optional[str]
    archilogic_secret_token: Optional[str]
    archilogic_public_token: Optional[str]


class UserUpdate(APIUserUpdate):
    pass


class User(APIUser):
    hashed_password: str

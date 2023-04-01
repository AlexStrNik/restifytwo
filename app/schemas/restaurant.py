from datetime import date
from pydantic import BaseModel


class RestaurantBase(BaseModel):
    name: str
    about: str
    floor_id: str


class APIRestaurantCreate(RestaurantBase):
    pass


class RestaurantCreate(APIRestaurantCreate):
    owner_id: int
    archilogic_token: str
    pass


class APIRestaurant(RestaurantBase):
    id: int
    archilogic_token: str

    class Config:
        orm_mode = True


class Restaurant(APIRestaurant):
    owner_id: int

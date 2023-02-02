from datetime import date
from pydantic import BaseModel


class RestaurantBase(BaseModel):
    name: str
    about: str


class APIRestaurantCreate(RestaurantBase):
    pass


class RestaurantCreate(APIRestaurantCreate):
    owner_id: int
    pass


class APIRestaurant(RestaurantBase):
    id: int

    class Config:
        orm_mode = True


class Restaurant(APIRestaurant):
    owner_id: int

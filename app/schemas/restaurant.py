from typing import List
from pydantic import BaseModel

from .image import Image
from .review import APIReviewLight, Review


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


class APIRestaurantFull(APIRestaurant):
    images: List[Image]
    reviews: List[APIReviewLight]


class RestaurantFull(APIRestaurant):
    owner_id: int

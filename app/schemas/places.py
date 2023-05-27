from pydantic import BaseModel


class PlacesItem(BaseModel):
    id: str
    name: str
    description: str


class APIPlacesItem(PlacesItem):
    pass

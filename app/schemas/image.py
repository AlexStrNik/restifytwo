from pydantic import BaseModel

class RestaurantImage(BaseModel):
    id: int
    path: str

    class Config:
        orm_mode = True

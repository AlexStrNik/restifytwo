from pydantic import BaseModel


class TableBase(BaseModel):
    id: int


class APITable(TableBase):
    is_occupied: bool


class Table(APITable):
    restaurant_id: int

    class Config:
        orm_mode = True

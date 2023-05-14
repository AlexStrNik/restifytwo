from pydantic import BaseModel

class Image(BaseModel):
    id: int
    path: str

    class Config:
        orm_mode = True

from pydantic import BaseModel

class APIOk(BaseModel):
    status: str

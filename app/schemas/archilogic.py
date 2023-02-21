from typing import List, Optional
from pydantic import BaseModel

class APIFloor(BaseModel):
    id: str
    name: str

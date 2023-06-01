import enum
from pydantic import BaseModel


class DayOfWeek(enum.Enum):
    monday = 1
    tuesday = 2
    wednesday = 3
    thursday = 4
    friday = 5
    saturday = 6
    sunday = 0


class Schedule(BaseModel):
    day_of_week: DayOfWeek
    opens_at: int
    closes_at: int

    class Config:
        orm_mode = True

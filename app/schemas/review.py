from pydantic import BaseModel


class ReviewAuthor(BaseModel):
    name: str

    class Config:
        orm_mode = True


class ReviewBase(BaseModel):
    review: str
    rating: float


class APIReviewCreate(ReviewBase):
    pass


class ReviewCreate(APIReviewCreate):
    restaurant_id: int
    author_id: int


class Review(ReviewBase):
    id: int
    author: ReviewAuthor

    class Config:
        orm_mode = True


class APIReview(Review):
    pass


class APIReviewLight(BaseModel):
    rating: float

    class Config:
        orm_mode = True

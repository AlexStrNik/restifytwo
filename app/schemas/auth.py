from pydantic import BaseModel


class APIAuth(BaseModel):
    jwt: str


class JWTUser(BaseModel):
    id: str
    is_admin: bool

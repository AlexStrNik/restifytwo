import jwt
from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from .database import SessionLocal
from .schemas.auth import JWTUser
from .constants import JWT_SECRET

security = HTTPBearer()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_user_from_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> JWTUser:
    token = credentials.credentials

    try:
        user = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        return JWTUser(**user, hashed_password='none')
    except Exception as e:

        raise HTTPException(403, 'Bad authorization')

import jwt
import bcrypt
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..dependencies import get_db, get_user_from_token
from ..schemas.auth import APIAuth, JWTUser
from ..schemas.user import APIUser, APIUserSign, APIUserRegister, APIUserUpdate
from ..crud.users import get_user, create_user, update_user
from ..constants import JWT_SECRET

router = APIRouter(prefix='/api/auth')

@router.post('/login', response_model=APIAuth)
def login(creds: APIUserSign, db: Session = Depends(get_db)):
    user = get_user(db, by_email=creds.email)
    if not user:
        raise HTTPException(404, 'User does not exists')
    if not bcrypt.checkpw(creds.password.encode('utf-8'), user.hashed_password.encode('utf-8')):
        raise HTTPException(401, 'Wrong password')

    encoded = jwt.encode({'id': user.id, 'is_admin': user.is_admin}, JWT_SECRET, algorithm='HS256')

    return { 'jwt': encoded }

@router.post('/register', response_model=APIAuth)
def register(creds: APIUserRegister, db: Session = Depends(get_db)):
    user = get_user(db, by_email=creds.email)
    if user:
        raise HTTPException(400, 'User already exists')

    user = create_user(db, creds)

    encoded = jwt.encode({'id': user.id, 'is_admin': user.is_admin}, JWT_SECRET, algorithm='HS256')

    return { 'jwt': encoded }

@router.get('/me', response_model=APIUser)
def me(user: JWTUser = Depends(get_user_from_token), db: Session = Depends(get_db)):

    return get_user(db, by_id=user.id)

@router.post('/me', response_model=APIUser)
def me(data: APIUserUpdate, user: JWTUser = Depends(get_user_from_token), db: Session = Depends(get_db)):
    return update_user(db, id=user.id, data=data)

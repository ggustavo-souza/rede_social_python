from fastapi import Response
from models.user import UserLoginModel, UserRegisterModel
from fastapi import APIRouter, Depends
from controllers.userController import handleLogin, handleRegistro
from sqlalchemy.orm import Session
from database import get_db

router = APIRouter()

@router.post("/login")
def postLogin(request: UserLoginModel, db: Session = Depends(get_db), response: Response = Response):
    return handleLogin(request, db, response)

@router.post("/registrar")
def postRegistrar(request: UserRegisterModel, db: Session = Depends(get_db)):
    return handleRegistro(request, db)
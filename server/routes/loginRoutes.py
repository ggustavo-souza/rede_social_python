from models.user import UserLoginModel, UserRegisterModel
from fastapi import APIRouter, Depends
from controllers.loginController import handleLogin, handleRegistro
from sqlalchemy.orm import Session
from database import get_db

router = APIRouter()

@router.post("/login")
def postLogin(request: UserLoginModel, db: Session = Depends(get_db)):
    return handleLogin(request, db)

@router.post("/registrar")
def postRegistrar(request: UserRegisterModel, db: Session = Depends(get_db)):
    return handleRegistro(request, db)
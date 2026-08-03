from fastapi import Response
from models.user import UserLoginModel, UserRegisterModel, UserPatchModel
from fastapi import APIRouter, Depends
from controllers.userController import handleLogin, handleRegistro, handleGetUser, handlePatchUserName
from sqlalchemy.orm import Session
from database import get_db

router = APIRouter()

@router.post("/login")
def postLogin(request: UserLoginModel, db: Session = Depends(get_db), response: Response = Response):
    return handleLogin(request, db, response)

@router.post("/registrar")
def postRegistrar(request: UserRegisterModel, db: Session = Depends(get_db)):
    return handleRegistro(request, db)

@router.get("/user")
def getUser(db: Session = Depends(get_db), usuario_id: int = 0):
    return handleGetUser(db, usuario_id)

@router.patch("/user")
def patchUserName(db: Session = Depends(get_db), request: UserPatchModel = None ):
    return handlePatchUserName(db, request)
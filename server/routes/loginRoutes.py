from models.user import UserModel
from fastapi import APIRouter
from controllers.loginController import loginController

router = APIRouter()

@router.post("/login")
def postLogin(request: UserModel):
    loginController.handleLogin(request)

@router.post("/registrar")
def postRegistrar(request: UserModel):
    loginController.handleRegistro(request)
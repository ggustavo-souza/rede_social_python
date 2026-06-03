from models.user import UserModel
from fastapi import FastAPI
from controllers.loginController import loginController

app = FastAPI()

@app.post("/login")
def postLogin(request: UserModel):
    loginController.handleLogin(request)

app.post("/registrar")
def postRegistrar(request: UserModel):
    loginController.handleRegistro(request)
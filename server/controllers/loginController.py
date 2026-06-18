from models.user import UserRegisterModel, UserLoginModel
from services.senhaServices import encriptarSenha, verificarSenha
from sqlalchemy.orm import Session
from database import User
from fastapi import HTTPException

def handleLogin(request: UserLoginModel, session: Session):
    usuarioBanco = session.query(User).where(User.email == request.email).first()
    if usuarioBanco is not None:
        senhaBanco = usuarioBanco.senha
        if(verificarSenha(request.senha, senhaBanco)): 
            return {"message": "Login Efetuado com sucesso"}
            raise HTTPException(status_code=200, detail="Login efetuado")
    raise HTTPException(status_code=400, detail="Dados Inválidos")

def handleRegistro(request: UserRegisterModel, session: Session):
    senhaEncriptada = encriptarSenha(request.senha)
    novoUsuario = User(nome=request.nome, email=request.email, senha=senhaEncriptada)
    session.add(novoUsuario)
    session.commit()
    return {"message": "Conta criada com sucesso!"}
    raise HTTPException(status_code=200, detail="Registro efetuado")




            






from auth.token import decodeToken
from auth.token import createToken
from models.user import UserRegisterModel, UserLoginModel
from services.senhaServices import encriptarSenha, verificarSenha
from sqlalchemy.orm import Session
from database import User
from fastapi import HTTPException, Response, Request
import jwt

def handleLogin(request: UserLoginModel, session: Session, response: Response):
    usuarioBanco = session.query(User).where(User.email == request.email).first()
    if usuarioBanco is not None:
        senhaBanco = usuarioBanco.senha
        if(verificarSenha(request.senha, senhaBanco)): 
            token = createToken(usuarioBanco.id, usuarioBanco.email)
            response.set_cookie(
                key="token",
                value=token,
                httponly=True,
                secure=True,
                samesite="lax",
                max_age=3600,
                path="/"
            )
            return {"message": "Login Efetuado com sucesso", "success": True, "usuario_id": usuarioBanco.id}
    raise HTTPException(status_code=400, detail="Dados Inválidos")

def checarSessao(request: Request):
    token = request.cookies.get("token")

    if not token:
        raise HTTPException(
            status_code=401,
            detail="Requisição ausente de token."
        )

    try:
        payload = decodeToken(token) 
        userData = payload.get("user")
        return {"message": "Sessão validada com sucesso!", "success": True, "usuario": userData}

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=401,
            detail="Sessão expirada."
        )
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=401,
            detail="Token inválido"
        )

# TODO: Rota de LOGOUT

def handleRegistro(request: UserRegisterModel, session: Session):
    senhaEncriptada = encriptarSenha(request.senha)
    novoUsuario = User(nome=request.nome, email=request.email, senha=senhaEncriptada)
    session.add(novoUsuario)
    session.commit()
    return {"message": "Conta criada com sucesso!", "success": True}




            






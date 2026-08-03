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

def logOut(request: Request, response: Response): 
    token = request.cookies.get("token")

    if not token:
        raise HTTPException(
            status_code=401,
            detail="Não é possível fazer logout pois o token nem existe."
        )

    if token:
        response.delete_cookie(key="token")
        return {"message": "O usuário foi deslogado com sucesso!", "success": True}


def handleRegistro(request: UserRegisterModel, session: Session):
    senhaEncriptada = encriptarSenha(request.senha)
    novoUsuario = User(nome=request.nome, email=request.email, senha=senhaEncriptada)
    session.add(novoUsuario)
    session.commit()
    return {"message": "Conta criada com sucesso!", "success": True}

def handleGetUser(db: Session, usuario_id: int):
    infoUser = db.query(User.id, User.email, User.nome).where(usuario_id == User.id).first()

    if infoUser:
        return {"id": infoUser.id, "nome": infoUser.nome, "email": infoUser.email}

    return None

def handlePatchUserName(db: Session, request):
    usuario = db.query(User).filter(User.id == request.id).first()

    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")

    usuario.nome = request.nome
    db.commit()
    db.refresh(usuario)

    return {"message": "Nome de usuário atualizado com sucesso!", "success": True, "usuario": {"id": usuario.id, "nome": usuario.nome, "email": usuario.email}}





            






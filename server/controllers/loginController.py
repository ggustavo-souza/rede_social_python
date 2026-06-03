from sqlalchemy.sql.functions import session_user
from models.user import UserModel
from services.senhaServices import encriptarSenha, verificarSenha
from sqlalchemy.orm import Session
from database import BD, User
from middlewares.validarLogin import validarlogin, validarRegistro

bd = BD.getEngine()

class loginController(UserModel): 
    def handleLogin(request: UserModel):
        if(validarlogin(request)):
            senhaEncriptada = encriptarSenha(request.senha)
            with Session(bd) as session:
                usuarioBanco = session.query(User.nome).where(User.nome == request.nome)
                if(usuarioBanco != None):
                    senhaBanco = session.query(User.senha).where(User.nome == request.nome)
                    if(verificarSenha(senhaEncriptada, senhaBanco)): 
                        return {"message": "Login Efetuado com sucesso"}
    def handleRegistro(request: UserModel):
        if(validarRegistro(request)):
            senhaEncriptada = encriptarSenha(request.senha)
            with Session(bd) as session:
                novoUsuario = User(nome=request.nome,email=request.email,senha=senhaEncriptada)
                session.add(novoUsuario)
                session.commit()
                return {"message": "Conta criada com sucesso!"}




            






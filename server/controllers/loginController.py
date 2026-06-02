from models.user import UserModel
from services.senhaServices import encriptarSenha
from sqlalchemy.orm import sessionmaker, Session
from database import BD, User
from middlewares.validarLogin import validarlogin

bd = BD.getEngine()

class loginController(UserModel): 
    def handleLogin(request: UserModel):
        if(validarlogin(request)):
            senhaEncriptada = encriptarSenha(request.senha)
            with Session(bd) as session:
                query = session.query(User).filter(User.nome == request.nome).first()
                if(query != None):
                    query = session.query(User).filter(User.senha == senhaEncriptada).first()
                    if(query != None):
                        return {"message": "O login foi efetuado com sucesso!"}



            






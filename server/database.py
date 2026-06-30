from sqlalchemy import create_engine, Column, Integer, String, DateTime, ForeignKey, func
from sqlalchemy.orm import DeclarativeBase, sessionmaker

# classe da base declarativa (utilizada pra manipular tabelas)
class Base(DeclarativeBase):
    pass

# tabela do usuário
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(20), nullable=False)
    email = Column(String(50), nullable=False)
    senha = Column(String(255), nullable=False)

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, autoincrement=True)
    titulo = Column(String(50), nullable=False)
    conteudo = Column(String(255), nullable=False)
    foto = Column(String(255), nullable=True)
    usuario_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    data = Column(DateTime(timezone=True), server_default=func.now())

class BD: 
    bd = create_engine("sqlite:///banco.db", echo=False)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=bd) #variavel pra criar a sessão
    
    @classmethod
    def createBD(cls):
        Base.metadata.create_all(cls.bd)

    @classmethod
    def getEngine(cls):
        return cls.bd

def get_db():
    db = BD.SessionLocal() #pega a sessão e joga na variável db
    try:
        yield db #joga a sessão pra quem chamou a função porém sem finalizar a função
    finally:
        db.close() #finaliza a função





from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import DeclarativeBase

# classe da base declarativa (utilizada pra manipular tabelas)
class Base(DeclarativeBase):
    pass

# tabela do usuário
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(20), nullable=False)
    email = Column(String(50), nullable=False)
    senha = Column(String(50), nullable=False)

class BD: 
    bd = create_engine("sqlite:///banco.db", echo=False)
    
    @classmethod
    def createBD(cls):
        Base.metadata.create_all(cls.bd)

    @classmethod
    def getEngine(cls):
        return cls.bd





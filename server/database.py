from sqlalchemy import create_engine, Column, Integer, String
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

class BD: 
    bd = create_engine("sqlite:///banco.db", echo=False)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=bd)
    
    @classmethod
    def createBD(cls):
        Base.metadata.create_all(cls.bd)

    @classmethod
    def getEngine(cls):
        return cls.bd

def get_db():
    db = BD.SessionLocal()
    try:
        yield db
    finally:
        db.close()





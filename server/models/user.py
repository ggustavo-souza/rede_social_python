from pydantic import BaseModel

class UserModel(BaseModel):
    nome: str
    email: str
    senha: str
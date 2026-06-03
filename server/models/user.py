from pydantic import BaseModel

class UserModel(BaseModel):
    nome: str
    email: str | None
    senha: str
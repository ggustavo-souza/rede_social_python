from pydantic import BaseModel, Field

class UserLoginModel(BaseModel):
    email: str = Field(..., min_length=5)
    senha: str = Field(..., min_length=1)

class UserRegisterModel(BaseModel):
    nome: str = Field(..., min_length=1, max_length=20)
    email: str = Field(..., min_length=5, max_length=50)
    senha: str = Field(..., min_length=1)

class UserPatchNameModel(BaseModel):
    id: int = Field(..., gt=0)
    nome: str = Field(..., min_length=1, max_length=20)

class UserPatchSenhaModel(BaseModel):
    id: int = Field(..., gt=0)
    senha: str = Field(..., min_length=1)
from pydantic import BaseModel, Field

class PostModel(BaseModel):
    titulo: str = Field(..., min_length=1)
    conteudo: str = Field(..., min_length=1)
    foto: str = Field(..., min_length=1)
    usuario_id: int = Field(..., min_length=1)
    autor: str = Field(..., min_length=1)
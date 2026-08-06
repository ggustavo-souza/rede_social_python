from fastapi import UploadFile
from controllers.postController import getAllPosts, getUserPosts , postPosts, editPostContent, deletePost
from fastapi import APIRouter, Depends, Body, Path, Form, File
from database import get_db
from models.post import PostUpdateModel
from sqlalchemy.orm import Session

router = APIRouter()

@router.get("/posts")
def getPosts(db: Session = Depends(get_db), offset: int = 0, limit: int = 3, usuario_id: int = 0):
    if usuario_id != 0:
        return getUserPosts(db, offset, limit, usuario_id)
    return getAllPosts(db, offset, limit)

@router.post("/posts")
def createPosts(db: Session = Depends(get_db), titulo: str = Form(...), conteudo: str = Form(...), usuario_id: str = Form(...), foto: UploadFile = File(...)):
    return postPosts(db, titulo, conteudo, usuario_id, foto)

@router.patch("/posts/{id}")
def editPost(db: Session = Depends(get_db), post: PostUpdateModel = Body(...), id: int = Path(...)):
    return editPostContent(db, post, id)

@router.delete("/posts/{id}")
def deletePost(db: Session = Depends(get_db), id: int = Path(...)):
    return deletePost(db, id)






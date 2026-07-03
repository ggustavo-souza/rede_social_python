from fastapi import UploadFile
from controllers.postController import getAllPosts, postPosts, editPost, deletePost
from fastapi import APIRouter, Depends, Body, Path, Form, File
from database import get_db
from models.post import PostModel
from sqlalchemy.orm import Session

router = APIRouter()

@router.get("/posts")
def getPosts(db: Session = Depends(get_db)):
    return getAllPosts(db)

@router.post("/posts")
def createPosts(db: Session = Depends(get_db), titulo: str = Form(...), conteudo: str = Form(...), usuario_id: int = Form(...), foto: UploadFile = File(...)):
    return postPosts(db, titulo, conteudo, usuario_id, foto)

@router.put("/posts/{id}")
def editPost(db: Session = Depends(get_db), post: PostModel = Body(...), id: int = Path(...)):
    return editPost(db, post, id)

@router.delete("/posts/{id}")
def deletePost(db: Session = Depends(get_db), id: int = Path(...)):
    return deletePost(db, id)






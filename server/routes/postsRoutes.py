from controllers.postController import getAllPosts, postPosts, editPost, deletePost
from fastapi import APIRouter, Depends, Body, Path
from database import get_db
from models.post import PostModel
from sqlalchemy.orm import Session

router = APIRouter()

@router.get("/posts")
def getPosts(db: Session = Depends(get_db)):
    return getAllPosts(db)

@router.post("/posts")
def postPosts(db: Session = Depends(get_db), post: PostModel = Body(...)):
    return postPosts(db, post)

@router.put("/posts/{id}")
def editPost(db: Session = Depends(get_db), post: PostModel = Body(...), id: int = Path(...)):
    return editPost(db, post, id)

@router.delete("/posts/{id}")
def deletePost(db: Session = Depends(get_db), id: int = Path(...)):
    return deletePost(db, id)






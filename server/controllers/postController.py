from fastapi import UploadFile
from models.post import PostModel, PostUpdateModel
from sqlalchemy.orm import Session, joinedload
from database import Post, User
from services.uploadService import handleUpload

def getAllPosts(db: Session, offset: int, limit: int):
    posts = db.query(Post).options(joinedload(Post.autor)).order_by(Post.data.desc()).offset(offset).limit(limit).all()
    return posts

def getUserPosts(db: Session, offset: int, limit: int, usuario_id: int):
    posts = db.query(Post).options(joinedload(Post.autor)).order_by(Post.data.desc())

    if (usuario_id != 0):
        posts = posts.filter(Post.usuario_id == usuario_id)

    posts = posts.offset(offset).limit(limit)

    return posts.all()

def postPosts(db: Session, titulo: str, conteudo: str, usuario_id: str, foto: UploadFile):
    int(usuario_id)
    fotoEnviada = handleUpload(foto)

    newPost = Post(
        titulo=titulo,
        conteudo=conteudo,
        foto=fotoEnviada,
        usuario_id=usuario_id
    )

    db.add(newPost)
    db.commit()
    db.refresh(newPost)
    return {"message": "Post criado com sucesso", "post": newPost, "success": True}

def editPost(db: Session, post: PostUpdateModel, id: int):
    postToEdit = db.query(Post).filter(Post.id == id).first()
    if not postToEdit:
        return {"message": "Post não encontrado"}
    if post.titulo is not None:
        postToEdit.titulo = post.titulo
    if post.conteudo is not None:
        postToEdit.conteudo = post.conteudo
    db.commit()
    db.refresh(postToEdit)
    return {"message": "Post editado com sucesso", "post": postToEdit, "success": True}

def deletePost(db: Session, id: int):
    postToDelete = db.query(Post).filter(Post.id == id).first()
    if not postToDelete:
        return {"message": "Post não encontrado"}
    db.delete(postToDelete)
    db.commit()
    return {"message": "Post deletado com sucesso", "success": True}
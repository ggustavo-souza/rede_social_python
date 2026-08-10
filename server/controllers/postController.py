from fastapi import UploadFile
from models.post import PostUpdateModel
from sqlalchemy.orm import Session, joinedload
from database import Curtidas, Post, User
from services.uploadService import handleUpload

def getAllPosts(db: Session, offset: int, limit: int):
    posts = db.query(Post).options(joinedload(Post.autor), joinedload(Post.curtidas)).order_by(Post.data.desc()).offset(offset).limit(limit).all()
    return posts

def getUserPosts(db: Session, offset: int, limit: int, usuario_id: int):
    posts = db.query(Post).options(joinedload(Post.autor), joinedload(len(Post.curtidas))).order_by(Post.data.desc())
    
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

def editPostContent(db: Session, post: PostUpdateModel, id: int):
    postToEdit = db.query(Post).options(joinedload(Post.autor)).filter(Post.id == id).first()
    if not postToEdit:
        return {"message": "Post não encontrado"}
    if post.titulo is not None:
        postToEdit.titulo = post.titulo
    if post.conteudo is not None:
        postToEdit.conteudo = post.conteudo
    db.commit()
    db.refresh(postToEdit)
    
    return {"message": "Post editado com sucesso", "post": postToEdit, "success": True}

def deletePostDB(db: Session, id: int):
    postToDelete = db.query(Post).filter(Post.id == id).first()
    if not postToDelete:
        return {"message": "Post não encontrado"}
    db.delete(postToDelete)
    db.commit()
    return {"message": "Post deletado com sucesso", "success": True, "post": id}

def likePost(db: Session, post_id: int, userId: int):
    post = db.query(Post).options(joinedload(Post.curtidas)).filter(Post.id == post_id).first()
    if not post:
        return {"message": "Post não encontrado", "success": False}
    
    if userId in [user.id for user in post.curtidas]:
        post.curtidas = [user for user in post.curtidas if user.id != userId]
        post = db.delete(Curtidas).where(Curtidas.usuario_id == userId, Curtidas.post_id == post_id)
        db.commit()
        db.refresh(post)
        return {"message": "Post descurtido com sucesso", "post": post, "success": True, "curtiu": False}
    else:
        user = db.query(User.id).filter(User.id == userId).first()
        if not user:
            return {"message": "Usuário não encontrado", "success": False}
        post = db.add(Curtidas(usuario_id=userId, post_id=post_id))
        db.commit()
        db.refresh(post)
        return {"message": "Post curtido com sucesso", "post": post, "success": True, "curtiu": True}
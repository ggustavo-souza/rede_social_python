from fastapi import UploadFile
from models.post import PostModel
from sqlalchemy.orm import Session
from database import Post
from fastapi import HTTPException, Form
from services.uploadService import handleUpload

def getAllPosts(db: Session):
    posts = db.query(Post).all()
    if(posts != ""):
        raise HTTPException(status_code=200, detail="Posts capturados com sucesso!")
        return posts
    else:
        raise HTTPException(status_code=404, detail="Não foi possível capturar os posts")
        return 

def postPosts(db: Session, titulo: str, conteudo: str, usuario_id: int, foto: UploadFile):
    #TODO: Fazer lógica para processar a foto

    fotoEnviada = handleUpload(foto)

    if(fotoEnviada is not str):
        raise HTTPException(status_code=404, detail="Não foi possível processar a foto.")

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

def editPost(db: Session, post: PostModel, id: int):
    postToEdit = db.query(Post).filter(Post.id == id).first()
    if not postToEdit:
        return {"message": "Post não encontrado"}
    postToEdit.titulo = post.titulo
    postToEdit.conteudo = post.conteudo
    postToEdit.foto = post.foto
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
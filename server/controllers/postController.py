from models.post import PostModel
from sqlalchemy.orm import Session
from database import Post

def getAllPosts(db: Session):
    return db.query(Post).all()

def postPosts(db: Session, post: PostModel):
    newPost = Post(titulo=post.titulo, conteudo=post.conteudo, foto=post.foto, usuario_id=post.usuario_id)
    #TODO: Fazer lógica para processar a foto

    db.add(newPost)
    db.commit()
    db.refresh(newPost)
    return {"message": "Post criado com sucesso", "post": newPost}

def editPost(db: Session, post: PostModel, id: int):
    postToEdit = db.query(Post).filter(Post.id == id).first()
    if not postToEdit:
        return {"message": "Post não encontrado"}
    postToEdit.titulo = post.titulo
    postToEdit.conteudo = post.conteudo
    postToEdit.foto = post.foto
    db.commit()
    db.refresh(postToEdit)
    return {"message": "Post editado com sucesso", "post": postToEdit}

def deletePost(db: Session, id: int):
    postToDelete = db.query(Post).filter(Post.id == id).first()
    if not postToDelete:
        return {"message": "Post não encontrado"}
    db.delete(postToDelete)
    db.commit()
    return {"message": "Post deletado com sucesso"}
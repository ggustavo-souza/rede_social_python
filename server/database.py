from sqlalchemy import UniqueConstraint, create_engine, Column, Integer, String, DateTime, ForeignKey, func
from sqlalchemy.orm import DeclarativeBase, relationship, sessionmaker

# classe da base declarativa (utilizada pra manipular tabelas)
class Base(DeclarativeBase):
    pass

# tabela do usuário
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(20), nullable=False)
    email = Column(String(50), nullable=False)
    senha = Column(String(255), nullable=False)
    posts = relationship("Post", back_populates="autor")

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, autoincrement=True)
    titulo = Column(String(50), nullable=False)
    conteudo = Column(String(255), nullable=False)
    foto = Column(String(255), nullable=True)
    usuario_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    data = Column(DateTime(timezone=True), server_default=func.now())
    autor = relationship("User", back_populates="posts")
    curtidas = relationship("Curtidas", backref="post", cascade="all, delete-orphan")

    @property
    def autor_nome(self):
        return self.autor.nome if self.autor else ""
    
class Curtidas(Base):
    __tablename__ = "curtidas"
    __table_args__ = (
        UniqueConstraint("usuario_id", "post_id", name="uq_usuario_post_curtida"),
    )

    id = Column(Integer, primary_key=True, autoincrement=True)
    usuario_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    post_id = Column(Integer, ForeignKey("posts.id"), nullable=False)

class Comentarios(Base):
    __tablename__ = "comentarios"

    id = Column(Integer, primary_key=True, autoincrement=True)
    usuario_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    post_id = Column(Integer, ForeignKey("posts.id"), nullable=False)
    comentario = Column(String(255), nullable=False)
    data = Column(DateTime(timezone=True), server_default=func.now())

class BD: 
    bd = create_engine("sqlite:///banco.db", echo=False)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=bd) #variavel pra criar a sessão
    
    @classmethod
    def createBD(cls):
        Base.metadata.create_all(cls.bd)

    @classmethod
    def getEngine(cls):
        return cls.bd
    
    @classmethod
    def seedDB(cls):
        session = cls.SessionLocal()
        try:
            existing_users = session.query(User).first()
            if existing_users:
                print("Usuários já existem na tabela. Nenhum usuário será adicionado.")
                return
            
            user1 = User(nome="catatau", email="foxcontryman8@gmail.com", senha="$2b$12$TD.uoiHyFEuQEg0ehWQAjubk9zzaImMIlLvj6mwxq5jQcXiXN5GDq")
            session.add(user1)
            session.commit()
            print("Usuário de exemplo adicionado com sucesso.")

            # Verifica se já existem posts na tabela
            existing_posts = session.query(Post).first()
            if existing_posts:
                print("Posts já existem na tabela. Nenhum post será adicionado.")
                return

            # Adiciona posts de exemplo
            post1 = Post(titulo="Post 1", conteudo="Conteúdo do post 1", foto="imagem1.jpg", usuario_id=1)
            post2 = Post(titulo="Post 2", conteudo="Conteúdo do post 2", foto="imagem2.jpg", usuario_id=1)
            post3 = Post(titulo="Post 3", conteudo="Conteúdo do post 3", foto="imagem4.jpeg", usuario_id=1)
            post4 = Post(titulo="Post 4", conteudo="Conteúdo do post 4", foto="imagem5.jpeg", usuario_id=1)
            session.add_all([post1, post2, post3, post4])

            curtidas = [
                Curtidas(usuario_id=1, post_id=1),
                Curtidas(usuario_id=1, post_id=2),
                Curtidas(usuario_id=1, post_id=3),
                Curtidas(usuario_id=1, post_id=4)]
            session.add_all(curtidas)

            session.commit()
            print("Posts de exemplo adicionados com sucesso.")
        except Exception as e:
            session.rollback()
            print(f"Erro ao adicionar posts de exemplo: {e}")


def get_db():
    db = BD.SessionLocal() #pega a sessão e joga na variável db
    try:
        yield db #joga a sessão pra quem chamou a função porém sem finalizar a função
    finally:
        db.close() #finaliza a função





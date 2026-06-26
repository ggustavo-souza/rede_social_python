from fastapi import Depends
from fastapi import FastAPI
from database import BD
from routes.loginRoutes import router as login_router
from fastapi.middleware.cors import CORSMiddleware
from controllers.userController import checarSessao
app = FastAPI()
origins = ["http://localhost:3000", "http://localhost:5173"]

# configuracoes de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  #permite as origens de requisição baseando-se no array acima         
    allow_credentials=True,           
    allow_methods=["*"],             
    allow_headers=["*"],            
)

app.include_router(login_router)

@app.get("/")
def boasVindas(user_id: int = (Depends(checarSessao))):
    return {"mensagem": "Acesso autorizado!", "id_usuario": user_id}

BD.createBD()

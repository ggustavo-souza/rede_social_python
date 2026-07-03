from fastapi import Depends, FastAPI, Cookie
from fastapi.staticfiles import StaticFiles
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

#incluindo a pasta "public" de uploads para que o cliente consiga alcançá-la
app.mount("/public", StaticFiles(directory="public"), name="public")

@app.get("/auth")
def boasVindas(token: str | None = Cookie(None)):
    return checarSessao(token)

BD.createBD()

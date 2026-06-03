from fastapi import FastAPI
from database import BD
from routes.loginRoutes import router as login_router

app = FastAPI()

app.include_router(login_router)

BD.createBD()

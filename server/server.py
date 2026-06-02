from fastapi import FastAPI
from database import BD

app = FastAPI()

BD.createBD()


from dotenv import load_dotenv
import os 

load_dotenv()

def getJwtKey():
    return os.getenv("CHAVE_JWT")
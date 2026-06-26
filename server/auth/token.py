import jwt
import datetime
from services.envService import getJwtKey

jwtKey = getJwtKey()
jwtAlg = "HS256"

def createToken(id: int):
    validade = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)

    payload = {
        "exp": validade,
        "sub": id
    }

    token = jwt.encode(payload, jwtKey, algorithm=jwtAlg)

    return token

def decodeToken(token):
    return jwt.decode(token, jwtKey, algorithms=jwtAlg)


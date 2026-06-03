import bcrypt

def encriptarSenha(senha):
    hashSenha = bcrypt.hashpw(senha, bcrypt.gensalt())
    return hashSenha

def verificarSenha(senha, senhaBanco):
    if(bcrypt.checkpw(senha, senhaBanco)):
        return True
    return False    


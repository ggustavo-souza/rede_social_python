import bcrypt

def encriptarSenha(senha: str):
    hash_bytes = bcrypt.hashpw(senha.encode('utf-8'), bcrypt.gensalt())
    return hash_bytes.decode('utf-8')

def verificarSenha(senha: str, senhaBanco: str):
    return bcrypt.checkpw(senha.encode('utf-8'), senhaBanco.encode('utf-8')) 


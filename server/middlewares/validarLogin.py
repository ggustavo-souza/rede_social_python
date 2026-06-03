def validarlogin(request):
    if ((request.nome != "" and len(request.nome) <= 20) and (request.senha != "")):
        return True
    return False

def validarRegistro(request):
    if ((request.nome != "" and len(request.nome) <= 20) and (request.senha != "") and (request.email != "")):
        return True
    return False
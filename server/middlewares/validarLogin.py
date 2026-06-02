def validarlogin(request):
    if ((request.nome != "" and len(request.nome) <= 20) and (request.senha != "")):
        return True
    return False
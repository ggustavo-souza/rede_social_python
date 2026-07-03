from pydantic import functional_validators
from fastapi import UploadFile, HTTPException
import os, uuid

def handleUpload(foto: UploadFile):
    pastaUploads = "public"

    if not os.path.exists(pastaUploads):
        os.makedirs(pastaUploads)

    extensao = os.path.splitext(foto.filename)[1]
    nomeArquivo = f"{uuid.uuid4()}{extensao}"

    caminhoPasta = os.path.join(pastaUploads,nomeArquivo)

    try:
        with open(caminhoPasta, "wb") as arquivo:
            conteudoImagem = foto.file.read()
            arquivo.write(conteudoImagem)
            return caminhoPasta
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erro ao salvar a imagem no servidor.")
    finally:
        foto.file.close()

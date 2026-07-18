import { useState } from "react";
import Botao from "../components/elements/BotaoSubmit";

export default function CreatePost() {

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
    };

    const [nomeArquivo, setNomeArquivo] = useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setNomeArquivo(e.target.files[0].name);
        } else {
            setNomeArquivo("Nenhum arquivo selecionado");
        }
    };

    return (
        <>
            <main className="p-8">
                <form onSubmit={handleSubmit} className="max-w-xl bg-(--color-tertiary) text-(--color-primary) flex flex-col p-6 gap-4 rounded-lg shadow-md">
                    <label htmlFor="titulo">Título do post:</label>
                    <input type="text" className="rounded-lg p-3" name="titulo" placeholder="Ex: Hoje colhi batatas" />
                    <label htmlFor="conteudo">Conteúdo do post:</label>
                    <textarea name="conteudo" className="rounded-lg p-3" placeholder="Descreva seu post..."></textarea>

                    { /* TODO: Fazer o botão de upload customizado */ }
                    <div className="flex flex-col gap-2 border rounded-lg p-3 text-center">
                        <i className="bi bi-cloud text-2xl"></i>
                        <label htmlFor="foto">Escolha a imagem do post</label>
                        <input type="file" name="foto" accept="image/*" onChange={handleFileChange} />
                        <span className="" id="nomeArquivo">{nomeArquivo ? nomeArquivo : "Nenhum arquivo selecionado"}</span>
                    </div>

                    <Botao type="submit" texto="Criar post" tamanho="lg" estilo="solid" />
                </form>
            </main>
        </>
    )
}
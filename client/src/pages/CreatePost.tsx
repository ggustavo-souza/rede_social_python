import { useState } from "react";
import { useNavigate } from "react-router";
import Botao from "../components/elements/BotaoSubmit";
import { type PostFormData } from "../types/PostType";
import Modal from "../components/elements/Modal";

export default function CreatePost() {
    const [modal, setModal] = useState<boolean>(false);
    const [formData, setFormData] = useState<PostFormData>({
        titulo: "",
        conteudo: "",
        usuario_id: localStorage.getItem("usuario_id"),
        foto: null
    });
    const [selectedImage, setSelectedImage] = useState<string>();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFormData(prevState => ({
            ...prevState,
            foto: file
        }));

        const reader = new FileReader();
        reader.onload = () => {
            setSelectedImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        try {
            const res = await fetch("http://localhost:8000/posts", {
                method: "POST",
                body: data
            });

            if (res.ok) {
                navigate("/");
            } else {
                setModal(true);
            }
        } catch (err) {
            console.error("Erro ao criar post", err);
            setModal(true);
        }
    };

    return (
        <main className="flex flex-col">
            <header className="w-full text-center items-center justify-center p-6 flex flex-row">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-6 flex items-center bg-(--color-secondary) animationBotao p-2 px-4 cursor-pointer text-(--color-primary) rounded-md"
                >
                    <i className="bi bi-arrow-bar-left me-2"></i>Voltar
                </button>
                <h1 className="text-2xl font-semibold text-center">Crie seu Post</h1>
            </header>
            <div className="flex flex-row gap-50 p-6 items-center justify-center">
                <form onSubmit={handleSubmit} className="flex flex-col border border-gray-300 rounded mb-4 gap-4 p-4 text-center items-center">
                    <input name="titulo" id="titulo" className="p-2 w-100" onChange={handleChange} type="text" placeholder="Digite o título do post"></input>
                    <div className="flex flex-col gap-2 p-4 rounded-lg bg-(--color-primary) mb-4">
                        <label htmlFor="foto">Escolha a imagem do post</label>
                        <input
                            onChange={handleFileChange}
                            type="file"
                            name="foto"
                            accept="image/*"
                            className="rounded-lg border"
                        />
                    </div>
                    <input name="usuario_id" id="usuario_id" type="hidden" value={formData.usuario_id ?? ""} />
                    {selectedImage ? <img src={selectedImage} alt="Imagem do post" className="max-w-full h-auto rounded-md" width="303" height="303" /> : <img src="/semImagem.png" alt="Imagem do post" className="max-w-full h-auto rounded-md" width="303" height="303" />}
                    <textarea name="conteudo" id='conteudo' onChange={handleChange} placeholder="Escreva a legenda do post" className="w-md wrap-break-word p-2"></textarea>
                    <Botao type="submit" tamanho="md" texto="Postar" />
                </form>
            </div>
            {modal && <Modal titulo="Erro ao criar post" texto="Ocorreu um erro ao criar o post. Por favor, tente novamente." tema="negative" destino="" funcaoFechar={() => setModal(false)} />}
        </main>
    );
}
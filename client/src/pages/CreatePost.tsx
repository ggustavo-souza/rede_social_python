import { useState } from "react";
import {useNavigate} from "react-router"
import Botao from "../components/elements/BotaoSubmit";
import { type PostFormData } from "../types/PostType";
import { useAuth } from "../auth/AuthContext";
import Modal from "../components/elements/Modal";

export default function CreatePost() {

    const { user } = useAuth();
    const [modal, setModal] = useState<boolean>(false);
    const [formData, setFormData] = useState<PostFormData>({
        titulo: "",
        conteudo: "",
        usuario_id: user?.id,
        foto: null
    });

    const [selectedImage, setSelectedImage] = useState<string>();
    const navigate = useNavigate();

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData.usuario_id)
        const data = new FormData(e.currentTarget);

        const response = fetch("http://localhost:8000/posts", {
            method: "POST",
            body: data
        })

        response.then(res => {
            if (res.ok) {
                navigate("/posts")
            } else {
                console.error("Erro ao criar post")
                setModal(true)
            }
        }).catch(err => {
            console.error("Erro ao criar post", err)
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }


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
            <div className="flex flex-row gap-50 p-6 items-center">
                <section className="text-center border border-gray-300 shadow-md rounded p-2">
                    <form onSubmit={handleSubmit} className="max-w-xl text-(--color-primary) flex flex-col p-6 gap-4">
                        <div className="flex flex-col gap-2 bg-(--color-tertiary) p-4 rounded-lg">
                            <label htmlFor="titulo">Título do post:</label>
                            <input onChange={handleChange} type="text" className="rounded-lg p-3" name="titulo" placeholder="Ex: Hoje colhi batatas" />
                        </div>
                        <input type="hidden" name="usuario_id" value={formData.usuario_id} />
                        <div className="flex flex-col gap-2 p-4 rounded-lg bg-(--color-tertiary)">
                            <label htmlFor="conteudo">Conteúdo do post:</label>
                            <textarea onChange={handleChange} name="conteudo" className="rounded-lg p-3" placeholder="Descreva seu post..."></textarea>
                        </div>

                        { /* TODO: Fazer o botão de upload customizado */}
                        <div className="flex flex-col gap-2 p-4 rounded-lg bg-(--color-tertiary) mb-4">
                            <label htmlFor="foto">Escolha a imagem do post</label>
                            <input onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        setSelectedImage(reader.result as string);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }} type="file" className="rounded-lg  border" name="foto" accept="image/*" />
                        </div>

                        <Botao type="submit" texto="Criar post" tamanho="lg" estilo="solid" />
                    </form>
                </section>

                <aside className="flex flex-col border border-gray-300 rounded mb-4 gap-4 p-4 text-center items-center">
                    <h1>{formData.titulo ? formData.titulo : "Nenhum título definido"}</h1>
                    {selectedImage ? <img src={selectedImage} alt="Imagem do post" className="max-w-full h-auto rounded-md" width="303" height="303" /> : <img src="/semImagem.png" alt="Imagem do post" className="max-w-full h-auto rounded-md" width="303" height="303" />}
                    <p className="w-md wrap-break-word">{formData.conteudo ? formData.conteudo : "Nenhum conteúdo definido"}</p>
                </aside>
            </div>
            {modal && <Modal titulo="Erro ao criar post" texto="Ocorreu um erro ao criar o post. Por favor, tente novamente." tema="negative" destino="" funcaoFechar={() => setModal(false)} />   }
        </main>
    )
}
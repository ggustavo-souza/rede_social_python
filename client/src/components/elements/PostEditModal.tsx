import { useState } from "react";
import { editPost } from "../../services/postsCall";
import type { Post } from "../../types/PostType";

interface PostEditModalProps {
    field: "titulo" | "conteudo";
    currentValue: string;
    postId: number;
    typeModal: "edit" | "delete";
    closeModal: () => void;
    handlePostUpdated: (updatedPost: Post) => void;
}

export default function PostEditModal({ field, currentValue, postId, typeModal, closeModal, handlePostUpdated }: PostEditModalProps) {
    const [newValue, setNewValue] = useState(currentValue);
    const [error, setError] = useState<boolean>(false);

    const handleSave = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            [field]: newValue,
        };

        const updatedPost = await editPost(postId, data);

        if (updatedPost != null) {
            handlePostUpdated(updatedPost);
            closeModal();
        } else {
            setError(true);
        }
    }
    if (typeModal === "edit") {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm">
                <main className="bg-(--color-primary) py-10 px-16 rounded">
                    <header className="flex flex-col mb-4 mx-10 text-center">
                        <h1 className="text-3xl font-bold my-2">Editar {field === "titulo" ? "Título" : "Conteúdo"}</h1>
                    </header>
                    <form onSubmit={handleSave}>
                        {error && <p className="text-red-500 text-sm mb-2">Ocorreu um erro ao salvar as alterações. Tente novamente.</p>}
                        <div className="flex justify-center">
                            <input
                                type="text"
                                name={field}
                                value={newValue}
                                onChange={(e) => setNewValue(e.target.value)}
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                        </div>
                        <div className="mt-6 flex justify-center">
                            <button type="button" onClick={closeModal} className="">Cancelar</button>
                            <button type="submit" className="">Salvar</button>
                        </div>
                    </form>
                </main>
            </div>
        )
    } else {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm">
                <main className="bg-(--color-primary) py-10 px-16 rounded">
                    <header className="flex flex-col mb-4 mx-10 text-center">
                        <h1 className="text-3xl font-bold my-2">Excluir Post</h1>
                    </header>
                    <form onSubmit={handleSave}>
                        <p>Deseja mesmo excluir este post?</p>
                        <div className="mt-6 flex justify-center">
                            <button type="button" onClick={closeModal} className="">Cancelar</button>
                            <button type="submit" className="">Confirmar</button>
                        </div>
                    </form>
                </main>
            </div>
        )
    }
}
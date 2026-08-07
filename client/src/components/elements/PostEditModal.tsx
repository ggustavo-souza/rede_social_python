import { useState } from "react";
import { deletePost, editPost } from "../../services/postsCall";
import type { Post } from "../../types/PostType";

interface PostEditModalProps {
    field: "titulo" | "conteudo" | null;
    currentValue: string;
    postId: number;
    typeModal: "edit" | "delete";
    closeModal: () => void;
    handlePostUpdated: (updatedPost: Post, deleteResponse: boolean) => void;
}

export default function PostEditModal({ field, currentValue, postId, typeModal, closeModal, handlePostUpdated }: PostEditModalProps) {
    const [newValue, setNewValue] = useState(currentValue);
    const [error, setError] = useState<boolean>(false);

    const handleSave = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            [field || ""]: newValue,
        };

        const updatedPost = await editPost(postId, data);

        if (updatedPost != null) {
            handlePostUpdated(updatedPost, false);
            closeModal();
        } else {
            setError(true);
        }
    }

    const handleDelete = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const deleteResponse = await deletePost(postId);

        if (deleteResponse) {
            handlePostUpdated({ id: deleteResponse.post } as Post, deleteResponse.success);
            closeModal();
        } else {
            setError(true);
        }
    }

    if (typeModal === "edit") {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm">
                <main className="bg-(--color-primary) py-10 px-16 rounded w-1/3">
                    <header className="flex flex-col mb-4 mx-10 text-center">
                        <h1 className="text-3xl font-bold my-2">Editar {field === "titulo" ? "Título" : "Conteúdo"}</h1>
                    </header>
                    <form onSubmit={handleSave}>
                        {error && <p className="text-red-500 text-sm mb-2">Ocorreu um erro ao salvar as alterações. Tente novamente.</p>}
                        <div className="flex justify-center">
                            {field === "titulo" ? (
                                <input
                                    type="text"
                                    name={field || ""}
                                    value={newValue}
                                    onChange={(e) => setNewValue(e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-2 w-full"
                                />
                            ) : (
                                <textarea
                                    name={field || ""}
                                    value={newValue}
                                    onChange={(e) => setNewValue(e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-2 w-full"
                                />
                            )}
                        </div>
                        <div className="mt-6 flex justify-between">
                            <button type="button" className="cursor-pointer mr-2 px-4 py-2 text-(--color-secondary) animationBotao outline-2 outline-(--color-secondary) rounded hover:bg-(--color-secondary) hover:text-(--color-primary)" onClick={() => { closeModal(); setNewValue("") }}>Cancelar</button>
                            <button type="submit" className="cursor-pointer mr-2 px-4 py-2 text-(--color-primary) animationBotao rounded bg-(--color-secondary)">Salvar</button>
                        </div>
                    </form>
                </main>
            </div>
        )
    } else {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm">
                <main className="bg-(--color-primary) py-10 px-16 rounded w-1/3">
                    <header className="flex flex-col mb-4 mx-10 text-center">
                        <h1 className="text-3xl font-bold my-2">Excluir Post</h1>
                    </header>
                    <form onSubmit={handleDelete}>
                        <p className="text-center">Deseja mesmo excluir este post?</p>
                        {error && <p className="text-red-500 text-sm mb-2">Ocorreu um erro ao excluir o post. Tente novamente.</p>}
                        <div className="mt-6 flex justify-between">
                            <button type="button" onClick={() => { closeModal(); setNewValue("") }} className="cursor-pointer mr-2 px-4 py-2 text-(--color-secondary) animationBotao outline-2 outline-(--color-secondary) rounded hover:bg-(--color-secondary) hover:text-(--color-primary)">Cancelar</button>
                            <button type="submit" className="cursor-pointer mr-2 px-4 py-2 text-(--color-primary) animationBotao rounded bg-(--color-secondary)">Confirmar</button>
                        </div>
                    </form>
                </main>
            </div>
        )
    }
}
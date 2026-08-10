import { type Post } from "../../types/PostType";
import { useState, startTransition } from "react"
import PostEditModal from "../elements/PostEditModal";
import { useNavigate } from "react-router";
import { likePost } from "../../services/postsCall";

interface PostsScrollProps {
    posts: Post[];
    screen: "home" | "profile";
    handlePostUpdated: (updatedPost: Post) => void;
}

export default function PostsScroll({ posts, screen, handlePostUpdated }: PostsScrollProps) {
    const imagesUrl: string = "http://localhost:8000/public/images/"
    const userId: number = Number(localStorage.getItem("usuario_id"))
    const [modal, setModal] = useState<boolean>(false)
    const [selectedPostId, setSelectedPostId] = useState<number>(0)
    const [field, setField] = useState<"titulo" | "conteudo">("titulo")
    const [typeModal, setTypeModal] = useState<"edit" | "delete">("edit")
    const navigate = useNavigate()

    /* TODO: Implementar a função de curtir post e Optmistic UI para curtidas */

    const [optimisticLikes, setOptimisticLikes] = useState<{ [key: number]: number }>({});

    const handleLike = async (postId: number) => {
        setOptimisticLikes(prev => ({
            ...prev,
            [postId]: (prev[postId] || posts.find(p => p.id === postId)?.curtidas.length || 0) + 1
        }));

        const response = await likePost(postId, userId);

        if (response != null) {
            startTransition(() => {
                handlePostUpdated(response.post);
            });
        } else {
            setOptimisticLikes(prev => ({
                ...prev,
                [postId]: (prev[postId] || posts.find(p => p.id === postId)?.curtidas.length || 0) - 1
            }));
        }
    }

    return (
        posts.length === 0 ? (
            <>
                <p>Nenhum post foi encontrado.</p>
            </>
        ) : (
            <>
                {posts.map((post: Post) => (
                    <div key={post.id} className="flex flex-col gap-2 border border-gray-300 rounded p-4 mb-4 text-center items-center">
                        {screen === "profile" && (
                            <button onClick={() => { setModal(true); setSelectedPostId(post.id); setField("titulo"); setTypeModal("delete") }} className="border border-gray-300 rounded px-3 py-2 animationBotao cursor-pointer hover:bg-(--color-secondary) text-sm self-end hover:text-(--color-primary) text-gray-500"><i className="bi bi-trash text-xl"></i></button>
                        )}
                        <p className="font-bold w-full">{post.titulo}{screen === "profile" && (
                            <button onClick={() => { setModal(true); setSelectedPostId(post.id); setField("titulo"); setTypeModal("edit") }} className="ms-2 border border-gray-300 rounded px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer text-gray-500"><i className="bi bi-pencil text-sm text-gray-600"></i></button>
                        )}</p>
                        <img src={`${imagesUrl}${post.foto}`} alt={post.titulo} className="w-1/2 object-cover rounded-lg" />
                        <p className="text-sm w-1/2 text-gray-500">{new Date(post.data).toLocaleDateString()} - {new Date(post.data).toLocaleTimeString()}</p>
                        <p className="hidden">{post.usuario_id}</p>
                        <p className="text-gray-700 wrap-break-word w-1/2"><b>@{post.autor.nome}: </b>{post.conteudo} {screen === "profile" && (
                            <button onClick={() => { setModal(true); setSelectedPostId(post.id); setField("conteudo"); setTypeModal("edit") }} className="ms-2 border border-gray-300 rounded px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer text-gray-500"><i className="bi bi-pencil text-sm text-gray-600"></i></button>
                        )}</p>
                        {screen === "home" && (
                            <div className="flex flex-row">
                                <button
                                    onClick={() => {
                                        handleLike(post.id);
                                    }}
                                    className="flex items-center bg-(--color-secondary) animationBotao p-2 px-4 cursor-pointer text-(--color-primary) rounded-md"
                                >
                                    <i className="bi bi-heart me-2"></i>
                                    <p className="text-(--color-primary) font-bold me-2">{optimisticLikes[post.id] || post.curtidas.length}</p>
                                    Curtir
                                </button>
                            </div>
                        )}
                    </div>
                ))}
                {modal &&
                    <PostEditModal
                        field={field}
                        currentValue={posts.find(p => p.id === selectedPostId)?.[field] || ""}
                        postId={selectedPostId}
                        typeModal="edit"
                        closeModal={() => { setModal(false); navigate("/myprofile") }}
                        handlePostUpdated={handlePostUpdated}
                    />
                }
                {typeModal === "delete" && modal &&
                    <PostEditModal
                        field={field}
                        currentValue={posts.find(p => p.id === selectedPostId)?.[field] || ""}
                        postId={selectedPostId}
                        typeModal="delete"
                        closeModal={() => { setModal(false); navigate("/myprofile") }}
                        handlePostUpdated={handlePostUpdated}
                    />
                }
            </>
        )
    )
}      

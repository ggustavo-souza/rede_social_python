import { type Post } from "../../types/PostType";

interface PostsScrollProps {
    posts: Post[];
    screen: "home" | "profile";
}

export default function PostsScroll({ posts, screen }: PostsScrollProps) {
    const imagesUrl: string = "http://localhost:8000/public/images/"

    return (
        posts.length === 0 ? (
            <>
                <p>Nenhum post foi encontrado.</p>
            </>
        ) : (
            posts.map((post: Post) => (
                <div key={post.id} className="flex flex-col gap-2 border border-gray-300 rounded p-4 mb-4 text-center items-center">
                    {screen === "profile" && (
                        <button className="border border-gray-300 rounded px-3 py-2 animationBotao hover:bg-(--color-secondary) text-sm self-end hover:text-(--color-primary) text-gray-500"><i className="bi bi-trash text-xl"></i></button>
                    )}
                    <p className="font-bold w-full">{post.titulo}{screen === "profile" && (
                        <button className="ms-2"><i className="bi bi-pencil text-sm text-gray-600"></i></button>
                    )}</p>
                    <img src={`${imagesUrl}${post.foto}`} alt={post.titulo} className="w-1/2 object-cover rounded-lg" />
                    <p className="text-sm w-1/2 text-gray-500">{new Date(post.data).toLocaleDateString()} - {new Date(post.data).toLocaleTimeString()}</p>
                    <p className="hidden">{post.usuario_id}</p>
                    <p className="text-gray-700 wrap-break-word w-1/2"><b>@{post.autor.nome}: </b>{post.conteudo} {screen === "profile" && (
                        <button className="ms-2"><i className="bi bi-pencil text-sm text-gray-600"></i></button>
                    )}</p>
                </div>
            )))
    )
}
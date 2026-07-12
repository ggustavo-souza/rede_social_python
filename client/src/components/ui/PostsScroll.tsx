import { type Post } from "../../types/PostType";

export default function PostsScroll({ posts }: { posts: Post[] }) {
    const imagesUrl: string = "http://localhost:8000/public/images/"

    return (
        posts.length === 0 ? (
            <>
                <p>Nenhum post foi encontrado.</p>
            </>
        ) : (
            posts.map((post: Post) => (
                <div key={post.id} className="flex flex-col gap-2 border border-gray-300 rounded p-4 mb-4">
                    <p className="font-bold w-1/2">{post.titulo}</p>
                    <img src={`${imagesUrl}${post.foto}`} alt={post.titulo} className="w-1/2 object-cover rounded-lg" />
                    <p className="text-sm w-1/2 text-gray-500">{post.data}</p>
                    <p className="text-gray-700 w-1/2">{post.conteudo}</p>
                </div>
            )))
    )
}
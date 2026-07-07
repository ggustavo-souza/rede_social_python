import { type Post } from "../../types/PostType";

export default function PostsScroll({ posts }: { posts: Post[] }) {
    const imagesUrl: string = "http://localhost:8000/public/images/"

    return (
        <>
            {posts.length === 0 ? (
                <>
                    <p>Nenhum post foi encontrado.</p>
                </>
            ) : (
                posts.map((post: Post) => (
                    <div key={post.id}>
                        <p>{post.titulo}</p>
                        <p>{post.conteudo}</p>
                        <p>{post.data}</p>
                        <img src={`${imagesUrl}${post.foto}`} />
                    </div>
                )))
            }
        </>
    )
}
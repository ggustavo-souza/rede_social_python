import { useEffect, useState } from "react"
import { getAllPosts } from "../services/postsCall"
import Loading from "../components/elements/Loading";
import { type Post } from "../types/PostType"

export default function Home() {

    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState<Post[]>([])
    const imagesUrl: string = "http://localhost:8000/public/"

    async function catchPosts() {
        try {
            const getPosts = await getAllPosts();
            setPosts(getPosts)
        } catch (e) {
            if (e instanceof Error) {
                console.error(e.message)
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        catchPosts();
    }, [])

    return (
        <>
            {loading && <Loading />}

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
                )))}
        </>
    )
}

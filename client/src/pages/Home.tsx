import { useEffect, useMemo, useState } from "react"
import { getAllPosts } from "../services/postsCall"
import Loading from "../components/elements/Loading";
import { type Post } from "../types/PostType"

export default function Home() {

    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState<Post[]>([])
    const[offset, setOffset] = useState(0)
    const limit = 3
    const imagesUrl: string = "http://localhost:8000/"


    useEffect(() => {
        async function catchPosts() {
            try {
                const getPosts = await getAllPosts(offset, limit);
                setPosts(getPosts)
            } catch (e) {
                if (e instanceof Error) {
                    console.error(e.message)
                }
            } finally {
                setLoading(false)
            }
        }
        catchPosts()
    }, [offset])

    const memoizedObserver = useMemo(() => {
        return new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                console.log("Elemento visível na tela!")
                setOffset(prevOffset => prevOffset + limit)
            }
        })
    }, [])

    useEffect(() => {
        const target = document.querySelector("#target")
        if (target) {
            memoizedObserver.observe(target)
        }

        return () => {
            if (target) {
                memoizedObserver.unobserve(target)
            }
        }
    }, [memoizedObserver])

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
                )))
            }
            <div id="target"></div>
        </>
    )
}

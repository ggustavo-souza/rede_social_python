import { useEffect, useMemo, useState } from "react"
import { getAllPosts } from "../services/postsCall"
import Loading from "../components/elements/Loading";
import { type Post } from "../types/PostType"
import PostsScroll from "../components/ui/PostsScroll";

export default function Home() {

    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState<Post[]>([])
    const [offset, setOffset] = useState(0)
    const limit = 3


    useEffect(() => {
        async function catchPosts() {
            try {
                const getPosts = await getAllPosts(offset, limit);
                if (offset > 0) {
                    setPosts(prevPosts => [...prevPosts, ...getPosts])
                }
                else
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
            {/*TODO: Estilizar a lista de posts e de preferência transformá-lo em um componente separado*/}
            {loading && <Loading />}

            <PostsScroll posts={posts} />
        
            <div id="target"></div>
        </>
    )
}

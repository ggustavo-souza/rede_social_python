import { useEffect, useMemo, useState, useRef } from "react"
import { getAllPosts } from "../services/postsCall"
import Loading from "../components/elements/Loading";
import { type Post } from "../types/PostType"
import PostsScroll from "../components/ui/PostsScroll";
import MenuSidebar from "../components/ui/MenuSidebar";

export default function Home() {

    const [loading, setLoading] = useState(true)
    const [initialLoading, setInitialLoading] = useState(true)
    const [hasMore, setHasMore] = useState(true)
    const [posts, setPosts] = useState<Post[]>([])
    const [offset, setOffset] = useState(0)
    const limit = 3


    useEffect(() => {
        async function catchPosts() {
            if (!hasMore) return

            if (offset > 0) setLoading(true)
            try {
                const getPosts = await getAllPosts(offset, limit);

                if (getPosts.length < limit) {
                    setHasMore(false)
                }

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
                setInitialLoading(false)
            }
        }
        catchPosts()
    }, [offset, hasMore])

    const memoizedObserver = useMemo(() => {
        return new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading && !initialLoading && hasMore) {
                console.log("Elemento visível na tela!")
                setOffset(prevOffset => prevOffset + limit)
            }
        })
    }, [loading, initialLoading, hasMore])

    const targetRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const target = targetRef.current
        if (target) {
            memoizedObserver.observe(target)
        }

        return () => {
            if (target) {
                memoizedObserver.unobserve(target)
            }
        }
    }, [memoizedObserver, posts])

    return (
        <>
            <main className="flex flex-row gap-20">
                <section className="flex flex-col w-full max-w-2xl mx-auto p-4">
                    {initialLoading && <Loading />}

                    <h2 className="text-center my-6 text-xl">Feed</h2>
                    <PostsScroll posts={posts} />

                    {hasMore && <div ref={targetRef} className="d-none"></div>}
                    {!hasMore && <p className="text-center">Não há mais posts para carregar.</p>}
                </section>

                <MenuSidebar />
            </main>
        </>
    )
}

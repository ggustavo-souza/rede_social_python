import { useEffect, useMemo, useState, useRef } from "react"
import { useNavigate } from "react-router"
import { getAllPosts } from "../services/postsCall"
import Loading from "../components/elements/Loading";
import { type Post } from "../types/PostType"
import PostsScroll from "../components/ui/PostsScroll";
import { logOutUser } from "../services/userCall";

export default function Home() {

    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [initialLoading, setInitialLoading] = useState(true)
    const [hasMore, setHasMore] = useState(true)
    const [posts, setPosts] = useState<Post[]>([])
    const [offset, setOffset] = useState(0)
    const [modal, setModal] = useState<boolean>(false)
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

                    <h2 className="text-center my-6 text-xl">Posts</h2>
                    <PostsScroll posts={posts} />

                    {hasMore && <div ref={targetRef} className="d-none"></div>}
                    {!hasMore && <p className="text-center">Não há mais posts para carregar.</p>}
                </section>

                <aside className="flex flex-col bg-(--color-secondary) p-4 items-center gap-8 fixed right-0 h-screen ">
                    <img src="/image.png" width="50" height="50" />
                    <button className="cursor-pointer hover:transform hover:scale-115">
                        <i className=" bi bi-search text-2xl text-white font-bold"></i>
                    </button>
                    <button className="cursor-pointer hover:transform hover:scale-115">
                        <i className="bi bi-person text-2xl text-white font-bold"></i>
                    </button>
                    <button className="cursor-pointer hover:transform hover:scale-115" onClick={() => navigate("/create-post")}>
                        <i className="bi bi-plus-square text-2xl text-white font-bold"></i>
                    </button>
                    <button className="cursor-pointer hover:transform hover:scale-115">
                        <i className="bi bi-gear-wide text-2xl text-white font-bold"></i>
                    </button>
                    <button className="cursor-pointer hover:transform hover:scale-115">
                        <i className="bi bi-box-arrow-left text-2xl text-white font-bold" onClick={() => setModal(true)}></i>
                    </button>
                </aside>
            </main>
            {modal &&
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm">
                    <main className="bg-(--color-primary) py-10 px-16 rounded">
                        <header className="flex flex-col mb-4 mx-10 text-center">
                            <h1 className="text-3xl font-bold my-2">Log Out</h1>
                            <div className="flex justify-center my-2">
                                <img src='x.svg' />
                            </div>
                        </header>
                        <main className="flex justify-center">
                            <p>Deseja mesmo sair da sua conta?</p>
                        </main>
                        <div className="mt-6 flex justify-center">
                            <button className="animationBotao bg-(--color-secondary) text-(--color-primary) px-6 font-semibold py-2 text-md w-sm rounded-sm cursor-pointer" onClick={() => {logOutUser();navigate("/login")}}>Sim, quero sair</button> 
                        </div>
                    </main>
                </div>}
        </>
    )
}

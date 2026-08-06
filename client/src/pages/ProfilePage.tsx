import { useEffect, useState, useMemo, useRef } from "react";
import MenuSidebar from "../components/ui/MenuSidebar";
import { fetchUser } from "../services/userCall";
import { type User } from "../types/UserTypes"
import { type Post } from "../types/PostType"
import { getUserPosts } from "../services/postsCall";
import PostsScroll from "../components/ui/PostsScroll";

export default function ProfilePage() {
    const usuario_id = Number(localStorage.getItem("usuario_id"))
    const [loading, setLoading] = useState(true)
    const [initialLoading, setInitialLoading] = useState(true)
    const [hasMore, setHasMore] = useState(true)
    const [userData, setUserData] = useState<User>()
    const [posts, setPosts] = useState<Post[]>([])
    const [offset, setOffset] = useState(0)
    const limit = 3

    useEffect(() => {
        async function catchUser() {
            const user = await fetchUser(usuario_id)

            if (user !== null)
                setUserData(user)

            return null
        }
        async function catchUserPosts() {
            if (!hasMore) return

            if (offset > 0) setLoading(true)
            try {
                const posts = await getUserPosts(usuario_id, limit, offset)

                if (posts.length < limit) {
                    setHasMore(false)
                }

                if (offset > 0) {
                    setPosts(prevPosts => [...prevPosts, ...posts])
                }

                else
                    setPosts(posts)

            } catch (e) {
                if (e instanceof Error) {
                    console.error(e.message)
                }
            } finally {
                setLoading(false)
                setInitialLoading(false)
            }
        }
        catchUser()
        catchUserPosts()
    }, [usuario_id, hasMore, offset, posts.length])

    const memoizedObserver = useMemo(() => {
        return new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading && !initialLoading && hasMore) {
                setOffset(prevOffset => prevOffset + limit)
            }
        })
    }, [loading, initialLoading, hasMore])

    const targetRef = useRef<HTMLDivElement>(null)

    const handlePostUpdated = (updatedPost: Post) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
        );
    };

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
            <main className="flex flex-row justify-between">
                <div className="my-6 mx-auto w-3xl p-10">
                    <header className="flex flex-row w-full mb-6">
                        <div className="border-3 py-2 px-3 rounded-full border-gray-300 w-fit">
                            <img src="/image.png" width={50} height={50} />
                        </div>
                        <div className="self-center mx-4">
                            <h1 className="text-xl">@{userData?.nome}</h1>
                            <p className="text-sm w-1/2 text-gray-500">{userData?.email}</p>
                        </div>
                    </header>
                    <section>
                        <PostsScroll posts={posts} screen="profile" handlePostUpdated={handlePostUpdated} />

                        {hasMore && <div ref={targetRef} className="d-none"></div>}
                        {(!hasMore && posts.length > 0) && <p className="text-center">Não há mais posts para carregar.</p>}
                    </section>
                </div>
                <MenuSidebar />
            </main>
        </>
    )
}
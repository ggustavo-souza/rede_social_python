import { useEffect, useState } from "react";
import MenuSidebar from "../components/elements/MenuSidebar";
import { fetchUser } from "../services/userCall";
import { type User } from "../types/UserTypes"
import { type Post } from "../types/PostType"
import { getUserPosts } from "../services/postsCall";
import PostsScroll from "../components/ui/PostsScroll";

export default function ProfilePage() {
    const usuario_id = Number(localStorage.getItem("usuario_id"))
    const [userData, setUserData] = useState<User>()
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        async function catchUser() {
            const user = await fetchUser(usuario_id)

            if (user !== null)
                setUserData(user)

            return null
        }
        async function catchUserPosts() {
            const posts = await getUserPosts(usuario_id)

            if (posts !== null) {
                setPosts(posts)
            }

            return null
        }
        catchUser()
        catchUserPosts()
    }, [usuario_id])

    return (
        <>
            <main className="flex flex-row justify-between">
                <div className="my-10 mx-auto w-3xl p-10 border">
                    <header className="flex flex-row w-full">
                        <div className="border-3 py-2 px-3 rounded-full border-gray-300 w-fit">
                            <img src="/image.png" width={50} height={50} />
                        </div>
                        <div className="self-center mx-4">
                            <h1 className="text-xl">@{userData?.nome}</h1>
                            <p className="text-sm w-1/2 text-gray-500">{userData?.email}</p>
                        </div>
                    </header>
                    <section>
                        <PostsScroll posts={posts} />
                    </section>
                </div>
                <MenuSidebar />
            </main>
        </>
    )
}
import { useEffect, useState } from "react";
import MenuSidebar from "../components/elements/MenuSidebar";
import { fetchUser } from "../services/userCall";
import { type User } from "../types/UserTypes"

export default function ProfilePage() {
    const usuario_id = Number(localStorage.getItem("usuario_id"))
    const [userData, setUserData] = useState<User>()

    useEffect(() => {
        async function catchUser() {
            const user = await fetchUser(usuario_id)

            if (user !== null)
                setUserData(user)

            return null
        }
        catchUser()
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

                    </section>
                </div>
                <MenuSidebar />
            </main>
        </>
    )
}
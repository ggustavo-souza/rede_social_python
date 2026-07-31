import MenuSidebar from "../components/elements/MenuSidebar";
import { type User } from "../types/UserTypes";
import { useState, useEffect } from "react";
import { fetchUser } from "../services/userCall";

export default function Config() {
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
            <div className="flex flex-row justify-start">
                <main className="p-8 my-10 mx-30 w-5xl bg-(--color-secondary) rounded-sm text-(--color-primary)">
                    <h1 className="text-2xl my-2 border-b-2 pb-4 ">Credenciais do usuário</h1>
                    <div className="mt-4 gap-6 flex flex-col rounded-sm p-4">
                        <div className="flex flex-row justify-between">
                            <div>
                                <p className="text-sm">Nome do usuário cadastrado: </p>
                                <h1 className="text-xl">{userData?.nome} </h1>
                            </div>
                            <button className="hover:bg-(--color-primary) outline-2 outline-(--color-primary) py-2 px-4 rounded-lg" type="button"><i className="bi text-lg bi-pencil hover:text-black "></i></button>
                        </div>
                        <div className="flex flex-row justify-between">
                            <div>
                                <p className="text-sm">Email cadastrado: </p>
                                <h1 className="text-xl">{userData?.email} </h1>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-2xl my-2 border-t-2 pt-4">Configurações de senha</h1>
                    <div className="flex flex-row items-center p-4">
                        <p className="text-xl">Esqueceu sua senha?</p>
                        <button className="cursor-pointer animationBotao mx-4 px-6 py-2 bg-(--color-primary) rounded-sm text-black">Redefinir Senha</button>
                    </div>
                </main>
                <MenuSidebar />
            </div>
        </>
    )
}
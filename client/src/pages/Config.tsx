import MenuSidebar from "../components/elements/MenuSidebar";
import { type User } from "../types/UserTypes";
import { useState, useEffect } from "react";
import { fetchUser, updateUser } from "../services/userCall";

export default function Config() {
    const usuario_id = Number(localStorage.getItem("usuario_id"))
    const [modal, setModal] = useState(false)
    const [userData, setUserData] = useState<User>()
    const [userName, setUserName] = useState("")

    useEffect(() => {
        async function catchUser() {
            const user = await fetchUser(usuario_id)

            if (user !== null)
                setUserData(user)

            return null
        }
        catchUser()
    }, [usuario_id])

    const handleChangeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value)
    }

    const handleSubmitUserName = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updatedUserData = { id: usuario_id, nome: userName };

        const response = await updateUser(updatedUserData);

        if (response !== null) {
            setUserData({ ...userData, nome: userName } as User);
            setModal(false);
        }

    }

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
                            <button onClick={() => setModal(true)} className="hover:bg-(--color-primary) cursor-pointer outline-2 outline-(--color-primary) py-2 px-4 rounded-lg" type="button"><i className="bi text-lg bi-pencil hover:text-black "></i></button>
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
                {modal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm">
                        <form onSubmit={handleSubmitUserName} className="bg-(--color-primary) p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-bold mb-4">Editar Nome de usuário</h2>
                            <input
                                type="text"
                                placeholder={`Ex: josesilva123`}
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                                value={userName}
                                onChange={handleChangeUserName}
                            />
                            <div className="flex justify-end">
                                <button
                                    onClick={() => setModal(false)}
                                    className="cursor-pointer mr-2 px-4 py-2 text-(--color-secondary) animationBotao outline-2 outline-(--color-secondary) rounded hover:bg-(--color-secondary) hover:text-(--color-primary)"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="cursor-pointer px-4 py-2 bg-(--color-secondary) text-white rounded animationBotao"
                                >
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    )
}
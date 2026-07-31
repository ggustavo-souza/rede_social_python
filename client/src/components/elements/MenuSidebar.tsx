import { useNavigate } from "react-router"
import { useState } from "react";
import { logOutUser } from "../../services/userCall";

export default function MenuSidebar() {
    const navigate = useNavigate();
    const [modal, setModal] = useState<boolean>(false)
    return (
        <>
            <aside className="flex flex-col bg-(--color-secondary) p-4 items-center gap-8 fixed right-0 h-screen ">
                <img src="/image.png" width="50" height="50" />
                <button className="cursor-pointer hover:transform hover:scale-115" onClick={() => navigate("/")} >
                    <i className="bi bi-house text-2xl text-white font-bold"></i>
                </button>
                <button className="cursor-pointer hover:transform hover:scale-115" onClick={() => navigate("/myprofile")}>
                    <i className="bi bi-person text-2xl text-white font-bold"></i>
                </button>
                <button className="cursor-pointer hover:transform hover:scale-115" onClick={() => navigate("/create-post")}>
                    <i className="bi bi-plus-square text-2xl text-white font-bold"></i>
                </button>
                <button className="cursor-pointer hover:transform hover:scale-115" onClick={() => navigate("/config")}>
                    <i className="bi bi-gear-wide text-2xl text-white font-bold"></i>
                </button>
                <button className="cursor-pointer hover:transform hover:scale-115">
                    <i className="bi bi-box-arrow-left text-2xl text-white font-bold" onClick={() => setModal(true)}></i>
                </button>
            </aside>
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
                        <div className="mt-6 flex mx-auto w-sm gap-2 justify-between">
                            <button className="animationBotao outline-2 outline-(--color-secondary) text-(--color-secondary) px-6 font-semibold py-2 text-md rounded-sm cursor-pointer" onClick={() => setModal(false)}>Cancelar</button>
                            <button className="animationBotao bg-(--color-secondary) text-(--color-primary) px-6 font-semibold py-2 w-full text-md rounded-sm cursor-pointer" onClick={() => { logOutUser(); navigate("/login") }}>Sim, quero sair</button>
                        </div>
                    </main>
                </div>
            }
        </>
    )
} 
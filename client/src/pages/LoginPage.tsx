import Botao from "../components/elements/BotaoSubmit"
import LoginRegisterForm from "../components/ui/LoginRegisterForm"

export default function LoginPage() {
    return (
        <>
            <main className="flex flex-row border-3 min-h-screen">
                <LoginRegisterForm type="Login" />
                <aside className="bg-[var(--color-tertiary)] flex flex-col min-h-screen p-10 py-5">
                    <img className="mx-auto" src="/image.png" height="70" width="70"></img>
                    <header className="text-[var(--color-primary)] font-semibold text-3xl text-center my-5">
                        <h1>Ainda não possui conta?</h1>
                    </header>
                    <main className="justify-center flex flex-col my-20 p-2 gap-2">
                        <Botao texto="Entrar com Google" type="button" tamanho="lg" />
                        <div className="my-5 flex gap-5 text-white">
                            <span className="border-t-2 border-white w-full self-center"></span>
                            <span className="font-bold">OU</span>
                            <span className="border-t-2 border-white w-full self-center"></span>
                        </div>
                        <Botao texto="Criar minha conta" destino="/registrar" type="button" tamanho="lg" />
                    </main>
                </aside>
            </main>
        </>
    )
}
import Botao from "../components/elements/BotaoSubmit"
import LoginForm from "../components/ui/LoginForm"

export default function LoginPage() {
    return (
        <>
            <main className="flex flex-row border-3 min-h-screen">
                <LoginForm />
                <aside className="bg-(--color-tertiary) flex flex-col min-h-screen p-10 py-20">
                    <img className="mx-auto" src="/image.png" height="70" width="70"></img>
                    <header className="text-(--color-primary) font-semibold text-3xl text-center my-5">
                        <h1>Ainda não possui conta?</h1>
                    </header>
                    <main className="justify-center flex flex-col p-2 gap-2">
                        <Botao texto="Criar minha conta" destino="/registrar" type="button" tamanho="lg" />
                    </main>
                </aside>
            </main>
        </>
    )
}
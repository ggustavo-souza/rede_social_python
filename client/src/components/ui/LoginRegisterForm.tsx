import Botao from "../elements/BotaoSubmit"

interface LoginRegisterFormProps {
    type: "Login" | "Registrar"
}

export default function LoginRegisterForm({ type }: LoginRegisterFormProps) {
    // futura logica de fetch validacao e autenticacao 

    return (
        <>
            {type == "Login" && (
                <section className="border-2 w-100 p-5 h-full self-center mx-auto">
                    <header className="font-semibold text-3xl text-center my-10">
                        <h1>Entre com a sua conta!</h1>
                    </header>
                    <form className="flex flex-col">
                        <div className="flex flex-col my-2">
                            <label htmlFor="email">E-mail</label>
                            <input className="ring-2 ring-gray-300 my-2 p-3 rounded-sm" name="email" type="text" placeholder="Example@example.com" />
                        </div>
                        <div className="flex flex-col my-2">
                            <label htmlFor="senha">Senha</label>
                            <input className="ring-2 ring-gray-300 my-2 p-3 rounded-sm" name="senha" type="password" placeholder="••••••••••" />
                        </div>
                        <div className="flex justify-center my-10">
                            <Botao texto="ENTRAR" type="submit" tamanho="lg" />
                        </div>
                    </form>
                </section>
            )}
            {type == "Registrar" && (
                <section>
                    <header>
                        <h1>Crie sua conta em um instante!</h1>
                    </header>
                    <main>
                        <form>
                            <label htmlFor="email">E-mail</label>
                            <input name="email" type="text" placeholder="Example@example.com" />

                            <label htmlFor="senha">Senha</label>
                            <input name="senha" type="password" placeholder="••••••••••" />

                            <button type="submit">ENTRAR</button>
                        </form>
                    </main>
                </section>
            )}
        </>
    )
}
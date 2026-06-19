import { useState, type ChangeEvent } from "react";
import Botao from "../elements/BotaoSubmit"
import { type LoginFormData, type RegistrarFormData } from "../../types/FormTypes";
import { loginCall, registerCall } from "../../services/formsCall";

interface LoginRegisterFormProps {
    type: "Login" | "Registrar"
}

export default function LoginRegisterForm({ type }: LoginRegisterFormProps) {
    const [loginData, setLoginData] = useState<LoginFormData>({
        email: "",
        senha: ""
    })

    const [registerData, setRegisterData] = useState<RegistrarFormData>({
        email: "",
        nome: "",
        senha: ""
    })

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>, type: "login" | "registrar") => {
        event.preventDefault();
        type == "login" ? loginCall(loginData) : registerCall(registerData);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    return (
        <>
            {type == "Login" && (
                <section className="w-100 p-5 h-full self-center mx-auto">
                    <header className="font-semibold text-3xl text-center my-10">
                        <h1>Entre com a sua conta!</h1>
                    </header>
                    <form className="flex flex-col" onSubmit={(e) => handleSubmit(e, "login")}>
                        <div className="flex flex-col my-2">
                            <label htmlFor="email">E-mail</label>
                            <input value={loginData.email} onChange={handleChange} className="ring-2 active:ring-3 focus:outline-[var(--color-tertiary)] focus: ring-gray-300 my-2 p-3 rounded-sm" name="email" id="email" type="text" placeholder="Example@email.com" />
                        </div>
                        <div className="flex flex-col my-2">
                            <label htmlFor="senha">Senha</label>
                            <input value={loginData.senha} onChange={handleChange} className="ring-2 active:ring-3 focus:outline-[var(--color-tertiary)] ring-gray-300 my-2 p-3 rounded-sm" name="senha" id="senha" type="password" placeholder="••••••••••" />
                        </div>
                        <div className="flex justify-center my-10">
                            <Botao texto="ENTRAR" type="submit" tamanho="lg" />
                        </div>
                    </form>
                </section>
            )}
            {type == "Registrar" && (
                <section>
                    {/*Para fazer: Seção de registrar conta */}
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
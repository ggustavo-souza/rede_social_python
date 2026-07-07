import { useState, type ChangeEvent } from "react";
import Botao from "../elements/BotaoSubmit"
import { type LoginFormData } from "../../types/FormTypes";
import { loginCall } from "../../services/formsCall";
import { useAuth } from "../../auth/AuthContext";
import Modal from "../elements/Modal";

export default function LoginForm() {
    const [loginData, setLoginData] = useState<LoginFormData>({
        email: "",
        senha: ""
    })
    const [modal, setModal] = useState({ abrir: false, erro: false })

    const { verificarAuth } = useAuth();

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const success = await loginCall(loginData);

        if (success) {
            await verificarAuth();
            setModal({ abrir: true, erro: false });
        } else {
            setModal({ abrir: true, erro: true });
        }
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
            <section className="w-100 p-5 h-full self-center mx-auto">
                <header className="font-semibold text-3xl text-center my-10">
                    <h1>Entre com a sua conta!</h1>
                </header>
                <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
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
            {(modal.abrir === true && modal.erro === true) && (
                <Modal titulo="Houve um erro no login!" texto="Tente novamente mais tarde!" tema="negative" funcaoFechar={() => setModal({ abrir: false, erro: false })} />
            )}
            {(modal.abrir === true && modal.erro === false) && (
                <Modal titulo="Login efetuado com sucesso!" texto="Clique para continuar" tema="positive" destino=" " />
            )}
        </>
    )
}
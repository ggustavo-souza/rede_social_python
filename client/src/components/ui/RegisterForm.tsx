import { useState, type ChangeEvent } from "react"
import Botao from "../elements/BotaoSubmit"
import { type RegistrarFormData } from "../../types/FormTypes"
import { registerCall } from "../../services/userCall"
import ProgressBar from "../elements/ProgressBar"
import Modal from "../elements/Modal"


export default function RegisterForm() {
    const [registerData, setRegisterData] = useState<RegistrarFormData>({ email: "", nome: "", senha: "", confirmarSenha: "" })
    const [alertForm, setAlertForm] = useState(false)
    const [step, setStep] = useState(0)
    const [modal, setModal] = useState({ abrir: false, erro: false, mensagem: "" })

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (step !== 3) return;
        const success = await registerCall(registerData)

        if (success.success === true) {
            setModal({ abrir: true, erro: false, mensagem: "O registro foi feito com sucesso!" });
        } else if (success.message) {
            setModal({ abrir: true, erro: true, mensagem: success.message })
        }
        else {
            setModal({ abrir: true, erro: true, mensagem: "Algo ocorreu de forma errada!" });
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setRegisterData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === "confirmarSenha") {
            setAlertForm(value !== registerData.senha);
        } else if (name === "senha") {
            if (registerData.confirmarSenha.length > 0) {
                setAlertForm(value !== registerData.confirmarSenha);
            }
        } else if (name === "email") {
            setAlertForm(value.length === 0)
        }
    }

    const nextStep = () => {
        if (step < 3) {
            setStep(step + 1)
        }
    }
    const prevStep = () => {
        if (step > 0) {
            setStep(step - 1)
        }
    }

    return (
        <>
            <header className="flex justify-center mt-15 mb-5">
                <h1 className="text-3xl">Realize seu registro!</h1>
            </header>
            <section className="flex justify-center">
                <ProgressBar point={step} />
            </section>
            <section className="mt-8 flex flex-col ">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center">
                    {step === 0 && (
                        <div className="flex flex-col gap-2 w-1/3">
                            <label htmlFor="email" className="font-semibold">Email</label>
                            {registerData.email.length === 0 && (<p className="text-red-600 text-sm">Forneça um email!</p>)}
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={registerData.email}
                                onChange={handleChange}
                                placeholder="Digite seu email"
                                className={`${registerData.email.length === 0 ? ("outline-red-600 ring-3 ring-red-600") : ("ring-2 active:ring-3 focus:outline-(--color-tertiary)")} ring-gray-300 my-2 p-3 rounded-sm`}
                                maxLength={50}
                                required
                            />
                        </div>
                    )}
                    {step === 1 && (
                        <div className="flex flex-col gap-2 w-1/3">
                            <label htmlFor="nome" className="font-semibold">Nome de usuário</label>
                            {registerData.nome.length === 0 && (<p className="text-red-600 text-sm">Forneça um nome!</p>)}
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                value={registerData.nome}
                                onChange={handleChange}
                                placeholder="Digite seu nome de usuário"
                                className={`${registerData.nome.length === 0 ? ("outline-red-600 ring-3 ring-red-600") : ("ring-2 active:ring-3 focus:outline-(--color-tertiary)")} ring-gray-300 my-2 p-3 rounded-sm`}
                                maxLength={20}
                                required
                            />
                        </div>
                    )}
                    {step === 2 && (
                        <div className="flex flex-col gap-2 w-1/3">
                            <label htmlFor="senha" className="font-semibold">Senha</label>
                            <input
                                type="password"
                                id="senha"
                                name="senha"
                                value={registerData.senha}
                                onChange={handleChange}
                                placeholder="Crie uma senha"
                                className={`ring-2 active:ring-3 focus:outline-(--color-tertiary) ring-gray-300 my-2 p-3 rounded-sm`}
                                required
                            />
                            <label htmlFor="confirmarSenha" className="font-semibold">Confirmar Senha</label>
                            {alertForm && (<p className="text-red-600 text-sm">As senhas estão diferentes!</p>)}
                            <input
                                type="password"
                                id="confirmarSenha"
                                name="confirmarSenha"
                                value={registerData.confirmarSenha}
                                onChange={handleChange}
                                placeholder="Confirme sua senha"
                                className={`${alertForm ? ("outline-red-600 ring-3 ring-red-600") : ("ring-2 active:ring-3 focus:outline-(--color-tertiary)")}  ring-gray-300 my-2 p-3 rounded-sm`}
                                required
                            />
                        </div>
                    )}
                    {step === 3 && (
                        <div className="flex flex-col gap-4 p-8 rounded ring-2 ring-gray-300 w-1/2">
                            <h3 className="font-semibold text-lg">Confirme suas informações:</h3>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">{registerData.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Nome de usuário</p>
                                <p className="font-medium">{registerData.nome}</p>
                            </div>
                        </div>
                    )}

                    {step > 0 && step < 3 ? (
                        <>
                            {step === 2 ? (
                                <div className="flex gap-10 mt-4 justify-between">
                                    <Botao texto="Voltar" tamanho="md" type="button" funcao={prevStep} />
                                    {alertForm || registerData.confirmarSenha.length === 0 ? (
                                        <Botao texto="Próximo" tamanho="md" type="button" estilo="inative" />
                                    ) : (
                                        <Botao texto="Próximo" tamanho="md" type="button" funcao={nextStep} />
                                    )}
                                </div>
                            ) : (
                                <div className="flex gap-10 mt-4 justify-between">
                                    <Botao texto="Voltar" tamanho="md" type="button" funcao={prevStep} />
                                    {alertForm || registerData.email.length === 0 || registerData.nome.length === 0 ? (
                                        <Botao texto="Próximo" tamanho="md" type="button" estilo="inative" />
                                    ) : (
                                        <Botao texto="Próximo" tamanho="md" type="button" funcao={nextStep} />
                                    )}
                                </div>
                            )}

                        </>
                    ) : (
                        <>
                            <div className="flex gap-10 mt-4 justify-between">
                                {step == 3 ? (
                                    <>
                                        <Botao texto="Voltar" tamanho="md" type="button" funcao={prevStep} />
                                        <Botao texto="Registrar" tamanho="md" type="submit" />
                                    </>
                                ) : (
                                    <>
                                        <Botao texto="Voltar" tamanho="md" type="button" destino="/login" />
                                        {alertForm || registerData.email.length === 0 ? (
                                            <Botao texto="Próximo" tamanho="md" type="button" estilo="inative" />
                                        ) : (
                                            <Botao texto="Próximo" tamanho="md" type="button" funcao={nextStep} />
                                        )}
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </form>
                {(modal.abrir === true && modal.erro === true) && (
                    <Modal titulo="Houve um erro no registro!" texto={modal.mensagem} tema="negative" funcaoFechar={() => setModal({ abrir: false, erro: false, mensagem: "" })} />
                )}
                {(modal.abrir === true && modal.erro === false) && (
                    <Modal titulo="Registro efetuado com sucesso!" texto={modal.mensagem} tema="positive" destino="login" />
                )}
            </section>
        </>
    )
}
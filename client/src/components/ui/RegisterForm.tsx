import { useState, type ChangeEvent } from "react"
import Botao from "../elements/BotaoSubmit"
import { type RegistrarFormData } from "../../types/FormTypes"
import { registerCall } from "../../services/formsCall"
import ProgressBar from "../elements/ProgressBar"


export default function RegisterForm() {
    const [registerData, setRegisterData] = useState<RegistrarFormData>({ email: "", nome: "", senha: "", confirmarSenha: "" })
    const [alertForm, setAlertForm] = useState(false)
    const [step, setStep] = useState(0)

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (step !== 3) return;
        registerCall(registerData)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setRegisterData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        {/* TODO: Corrigir o funcionamento da confirmação de senha */ }
        if (registerData.senha !== registerData.confirmarSenha)
            setAlertForm(false)
        else if (registerData.senha === registerData.confirmarSenha)
            setAlertForm(true)
        else
            setAlertForm(true)
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
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={registerData.email}
                                onChange={handleChange}
                                placeholder="Digite seu email"
                                className="ring-2 active:ring-3 focus:outline-[var(--color-tertiary)] ring-gray-300 my-2 p-3 rounded-sm"
                                required
                            />
                        </div>
                    )}
                    {step === 1 && (
                        <div className="flex flex-col gap-2 w-1/3">
                            <label htmlFor="nome" className="font-semibold">Nome de usuário</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                value={registerData.nome}
                                onChange={handleChange}
                                placeholder="Digite seu nome de usuário"
                                className="ring-2 active:ring-3 focus:outline-[var(--color-tertiary)] ring-gray-300 my-2 p-3 rounded-sm"
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
                                className="ring-2 active:ring-3 focus:outline-[var(--color-tertiary)] ring-gray-300 my-2 p-3 rounded-sm"
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
                                className={`${alertForm ? ("outline-red-600 ring-3 ring-red-600") : ("ring-2 active:ring-3 focus:outline-[var(--color-tertiary)]")}  ring-gray-300 my-2 p-3 rounded-sm`}
                                required
                            />
                        </div>
                    )}
                    {step === 3 && (
                        <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded border w-1/3">
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
                            <div className="flex gap-10 mt-4 justify-between">
                                <Botao texto="Voltar" tamanho="md" type="button" funcao={prevStep} />
                                <Botao texto="Próximo" tamanho="md" type="button" funcao={nextStep} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex gap-10 mt-4 justify-between">
                                <Botao texto="Voltar" tamanho="md" type="button" funcao={prevStep} />
                                {step == 3 ? (
                                    <Botao texto="Registrar" tamanho="md" type="submit" />
                                ) : (
                                    <Botao texto="Próximo" tamanho="md" type="button" funcao={nextStep} />
                                )}
                            </div>
                        </>
                    )}
                </form>
                {/*TODO: Implementar a imagem da logo */}
            </section>
        </>
    )
}
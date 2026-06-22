import { useState, type ChangeEvent } from "react"
import Botao from "../elements/BotaoSubmit"
import { type RegistrarFormData } from "../../types/FormTypes"
import { registerCall } from "../../services/formsCall"
import ProgressBar from "../elements/ProgressBar"


export default function RegisterForm() {
    const [registerData, setRegisterData] = useState<RegistrarFormData>({ email: "", nome: "", senha: "" })
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
            <header>
                <h1>Realize seu registro!</h1>
            </header>
            <section className="flex justify-center">
                <ProgressBar point={step} />
            </section>
            <section className="mt-8">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {step === 0 && (
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="font-semibold">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={registerData.email}
                                onChange={handleChange}
                                placeholder="Digite seu email"
                                className="p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                    )}
                    {step === 1 && (
                        <div className="flex flex-col gap-2">
                            <label htmlFor="nome" className="font-semibold">Nome de usuário</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                value={registerData.nome}
                                onChange={handleChange}
                                placeholder="Digite seu nome de usuário"
                                className="p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                    )}
                    {step === 2 && (
                        <div className="flex flex-col gap-2">
                            <label htmlFor="senha" className="font-semibold">Senha</label>
                            <input
                                type="password"
                                id="senha"
                                name="senha"
                                value={registerData.senha}
                                onChange={handleChange}
                                placeholder="Crie uma senha"
                                className="p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                    )}
                    {step === 3 && (
                        <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded border">
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

                    <div className="flex gap-4 mt-4 justify-between">
                        {step > 0 ? (
                            <Botao texto="Voltar" tamanho="md" type="button" funcao={prevStep} />
                        ) : (
                            <div className="w-[120px]"></div> // Placeholder to keep Next button aligned
                        )}

                        {step < 3 ? (
                            <Botao texto="Próximo" tamanho="md" type="button" funcao={nextStep} />
                        ) : (
                            <Botao texto="Registrar" tamanho="md" type="submit" />
                        )}
                    </div>
                </form>
            </section>
        </>
    )
}
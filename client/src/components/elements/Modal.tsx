import Botao from "./BotaoSubmit"

interface ModalProps {
    titulo: string,
    texto: string,
    tema: "positive" | "negative"
    destino?: string,
    funcaoFechar?: () => void
}

export default function Modal({ titulo, texto, tema, destino, funcaoFechar }: ModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm">
            <main className="bg-[var(--color-primary)] p-8 rounded">
                <header className="flex flex-col mb-4 mx-10 text-center">
                    <h1 className="text-3xl font-bold my-2">{titulo}</h1>
                    <div className="flex justify-center my-2">
                        <img src={tema === "positive" ? (`check.svg`) : ('x.svg')} />
                    </div>
                </header>
                <main className="flex justify-center">
                    <p>{texto}</p>
                </main>
                <div className="mt-6 flex justify-center">
                    {destino ? (
                        <Botao texto="Entendido" type="button" tamanho="xl" destino={`/${destino}`} />
                    ) : (
                        <Botao texto="Voltar" type="button" tamanho="xl" funcao={funcaoFechar} />
                    )}
                </div>
            </main>
        </div>
    )
}
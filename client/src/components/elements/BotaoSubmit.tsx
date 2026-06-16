import { useNavigate } from "react-router"

interface BotaoProps {
    texto: string
    tamanho: "sm" | "md" | "lg" | "xl"
    destino?: string
    type: "button" | "submit"
}

export default function Botao({ texto, type, destino, tamanho }: BotaoProps) {
    const navigate = useNavigate();

    return (
        <button
            type={type}
            className={`animationBotao px-6 font-semibold py-2 bg-[var(--color-secondary)] text-[var(--color-primary)] text-${tamanho} w-${tamanho} rounded-sm cursor-pointer`}
            onClick={() => { (destino !== "" && type == "button") ? (navigate(destino)) : null }}
        >
            {texto}
        </button>
    )
}
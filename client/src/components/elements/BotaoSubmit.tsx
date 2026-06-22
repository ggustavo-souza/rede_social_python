import { useNavigate } from "react-router"

interface BotaoProps {
    texto: string
    tamanho: "sm" | "md" | "lg" | "xl"
    destino?: string
    type: "button" | "submit"
    funcao?: () => void;
}

export default function Botao({ texto, type, destino, tamanho, funcao }: BotaoProps) {
    const navigate = useNavigate();

    return (
        <button
            type={type}
            className={`animationBotao px-6 font-semibold py-2 bg-[var(--color-secondary)] text-[var(--color-primary)] text-${tamanho} w-${tamanho} rounded-sm cursor-pointer`}
            onClick={() => {
                if (destino && type === "button") {
                    navigate(destino);
                } else if (funcao) {
                    funcao();
                }
            }}
        >
            {texto}
        </button>
    )
}
import { useNavigate } from "react-router"

interface BotaoProps {
    texto: string
    tamanho: "sm" | "md" | "lg" | "xl"
    destino?: string
    type: "button" | "submit"
    funcao?: () => void;
    estilo?: "solid" | "inative"
}

export default function Botao({ texto, type, destino, tamanho, funcao, estilo }: BotaoProps) {
    const navigate = useNavigate();

    return (
        <button
            type={type}
            className={`${estilo === "inative" ? ("bg-gray-400") : ("animationBotao bg-(--color-secondary) text-(--color-primary)")} px-6 font-semibold py-2 text-${tamanho} w-full rounded-sm cursor-pointer`}
            onClick={(e) => {
                if (type === "button") {
                    e.preventDefault();
                }
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
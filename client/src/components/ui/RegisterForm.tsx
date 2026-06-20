import { useState, type ChangeEvent } from "react"
import Botao from "../elements/BotaoSubmit"
import { type RegistrarFormData } from "../../types/FormTypes"
import { registerCall } from "../../services/formsCall"


export default function RegisterForm() {
    const [registerData, useRegisterData] = useState({ email: "", nome: "", senha: "" })

    return (
        <>
        </>
    )
}
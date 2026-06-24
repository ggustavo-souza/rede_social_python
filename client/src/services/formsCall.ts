import { type LoginFormData, type RegistrarFormData } from "../types/FormTypes";

export async function loginCall(dadosLogin: LoginFormData) {
    const urlAPI = "http://localhost:8000"

    try {
        const response = await fetch(`${urlAPI}/login`, {
            method: "POST",
            body: JSON.stringify(dadosLogin),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json();

        if (data.success)
            return true

        return false
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message)
            return false
        }
    }
}

export async function registerCall(dadosRegistro: RegistrarFormData) {
    const urlAPI = "http://localhost:8000"
    const { email, nome, senha } = dadosRegistro
    const dadosParaEnvio = {
        email: email,
        nome: nome,
        senha: senha
    }

    try {
        const response = await fetch(`${urlAPI}/registrar`, {
            method: "POST",
            body: JSON.stringify(dadosParaEnvio),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json();

        if (data.success)
            return true

        return false
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message)
            return false
        }
    }
}
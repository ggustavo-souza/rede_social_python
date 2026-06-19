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

        return await response.json();
    } catch (error) {
        if (error instanceof Error)
            console.error(error.message)
    }
}

export async function registerCall(dadosRegistro: RegistrarFormData) {
    const urlAPI = "http://localhost:8000"

    try {
        const response = await fetch(`${urlAPI}/register`, {
            method: "POST",
            body: JSON.stringify(dadosRegistro),
            headers: {
                "Content-Type": "application/json"
            }
        })

        return await response.json();
    } catch (error) {
        if (error instanceof Error)
            console.error(error.message)
    }
}
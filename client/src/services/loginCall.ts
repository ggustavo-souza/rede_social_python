import { type LoginFormData } from "../types/FormTypes";

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
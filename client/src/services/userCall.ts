import { type LoginFormData, type RegistrarFormData } from "../types/FormTypes";

const urlAPI = "http://localhost:8000"

export async function loginCall(dadosLogin: LoginFormData) {

    try {
        const response = await fetch(`${urlAPI}/login`, {
            method: "POST",
            body: JSON.stringify(dadosLogin),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        const data = await response.json();

        if (data.success) {
            localStorage.setItem("usuario_id", data.usuario_id)
            return true
        }

        return false
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message)
            return false
        }
    }
}

export async function registerCall(dadosRegistro: RegistrarFormData) {
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

        if (data.success === false)
            return data
        else {
            return true
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message)
            return false
        }
    }
}

export async function logOutUser() {
    const userId = localStorage.getItem("usuario_id")

    if (userId !== "")
        localStorage.removeItem("usuario_id")
    try {
        const response = await fetch(`${urlAPI}/logout`, {
            method: "GET",
            credentials: "include"
        })

        const data = await response.json()

        if (data.success)
            return true

    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message)
            return false
        }
    }
}

export async function fetchUser(usuario_id: number) {
    try {
        if (usuario_id === undefined)
            return null

        const response = await fetch(`${urlAPI}/user?usuario_id=${usuario_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json()

        if (data !== null)
            return data

        return null
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message)
            return null
        }
    }
}

export async function updateUser(updatedUserData: { id: number, nome: string }) {
    try {
        const response = await fetch(`${urlAPI}/user`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedUserData)
        })

        const data = await response.json()

        if (data.success)
            return data

        return null
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message)
            return null
        }
    }
}

export async function updateUserSenha(updatedUserData: { id: number, senha: string }) {
    try {
        const response = await fetch(`${urlAPI}/user/senha`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedUserData)
        })

        const data = await response.json()

        if (data.success)
            return data

        return null
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message)
            return null
        }
    }
}
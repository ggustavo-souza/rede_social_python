import { createContext, useState, useEffect, useContext, type ReactNode } from "react";

export interface Usuario {
    id: number,
    email: string
}

interface AuthContextType {
    user: Usuario | null;
    authenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<Usuario | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const apiUrl = "http://localhost:8000"

    async function verificarAuth() {
        try {
            const response = await fetch(`${apiUrl}/auth`, {
                method: "GET",
                credentials: "include"
            })

            if (response.ok) {
                const data = await response.json()
                setUser(data)
            } else {
                setUser(null)
            }
        } catch (e) {
            if (e instanceof Error) {
                console.error(e.message)
                setUser(null)
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        verificarAuth()
    }, [])

    return (
        <AuthContext.Provider value={{ user, authenticated: !!user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)

    if (!context)
        throw new Error("useAuth deve ser usado dentro de um AuthProvider")

    return context
}




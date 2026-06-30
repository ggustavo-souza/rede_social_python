import { type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from './AuthContext'

interface ProtectedRouteProps {
    children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { authenticated, loading } = useAuth()
    const navigate = useNavigate()

    if (loading) {
        return <div>Carregando...</div>
    }

    if (!authenticated)
        navigate("/login")

    return <>{children}</>
}
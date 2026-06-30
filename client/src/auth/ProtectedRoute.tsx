import { type ReactNode } from 'react'
import { useAuth } from './AuthContext'
import Modal from '../components/elements/Modal'

interface ProtectedRouteProps {
    children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { authenticated, loading } = useAuth()

    if (loading) {
        return <div>Carregando...</div>
    }

    if (!authenticated)
        return <Modal titulo='Não autorizado' texto='Você não possui autorização para entrar nesta página.' tema='negative' destino='login' />

    return <>{children}</>
}
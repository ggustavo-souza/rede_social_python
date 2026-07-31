import { type ReactNode } from 'react'
import { useAuth } from './AuthContext'
import Modal from '../components/elements/Modal'

interface ProtectedRouteProps {
    children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { authenticated, loading } = useAuth()

    if (loading) {
        return <div></div>
    }

    if (!authenticated)
        return <Modal titulo='Atenção!' texto='Você precisa estar logado para acessar a Home!' tema='negative' destino='login' />

    return <>{children}</>
}
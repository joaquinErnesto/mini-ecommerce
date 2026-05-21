import { Navigate } from "react-router-dom"
import type { ReactNode } from "react"

import { useAuth } from "../context/useAuth"

interface Props {
    children: ReactNode
}

export const ProtectedRoute = ({
    children
}: Props) => {

    const {
        isAuthenticated,
        loading
    } = useAuth()

    // Optional loading state
    if (loading) {
        return <p>Loading...</p>
    }

    // Not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    // Authenticated
    return children
}
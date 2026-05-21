import { Navigate } from "react-router-dom"
import type { ReactNode } from "react"

import { useAuth } from "../context/useAuth"

interface Props {
    children: ReactNode
}

export const GuestRoute = ({
    children
}: Props) => {

    const {
        isAuthenticated,
        loading
    } = useAuth()

    // Optional loading state
    if (loading) {
        return (
            <div
                style={{
                    minHeight: "60vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <p>Loading profile...</p>
            </div>
        )
    }

    // Already authenticated
    if (isAuthenticated) {
        return <Navigate to="/profile" replace />
    }

    // Not authenticated
    return children
}
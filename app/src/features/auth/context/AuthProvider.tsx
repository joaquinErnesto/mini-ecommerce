import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import type {
    LoginCredentials,
    AuthUser
} from "../types/auth.types"

import { loginRequest } from "../services/auth.service"

import {
    getAuthUser,
    saveAuthUser,
    removeAuthUser
} from "../utils/authStorage"

interface Props {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: Props) => {

    const [user, setUser] = useState<AuthUser | null>(null)

    const [loading, setLoading] = useState(true)

    // Restore session
    useEffect(() => {
        const storedUser = getAuthUser()

        if (storedUser) {
            setUser(storedUser)
        }

        setLoading(false)
    }, [])

    // LOGIN
    const login = async (
        credentials: LoginCredentials
    ) => {

        const loggedUser = await loginRequest(credentials)

        saveAuthUser(loggedUser)

        setUser(loggedUser)
    }

    // LOGOUT
    const logout = () => {
        removeAuthUser()
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                logout,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
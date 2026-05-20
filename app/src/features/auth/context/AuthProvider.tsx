import { useState } from "react"
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

    const [user, setUser] = useState<AuthUser | null>(
        () => getAuthUser()
    )

    const loading = false

    // Restore session
    

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

    const isAuthenticated = Boolean(user)

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
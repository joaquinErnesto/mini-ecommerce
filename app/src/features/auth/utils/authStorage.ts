import type { AuthUser } from "../types/auth.types"

const AUTH_STORAGE_KEY = "auth_user"

export const saveAuthUser = (user: AuthUser) => {
  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify(user)
  )
}

export const getAuthUser = (): AuthUser | null => {
  const storedUser = localStorage.getItem(AUTH_STORAGE_KEY)

  if (!storedUser) return null

  return JSON.parse(storedUser)
}

export const removeAuthUser = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}
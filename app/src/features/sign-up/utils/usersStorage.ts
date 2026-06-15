import type { AuthUser } from "../../auth/types/auth.types"

const USERS_STORAGE_KEY =
  "registered_users"

export interface RegisteredUser
  extends AuthUser {

  password: string
}

export const getUsers = () => {

  const stored =
    localStorage.getItem(
      USERS_STORAGE_KEY
    )

  return stored
    ? JSON.parse(stored)
    : []
}

export const saveUsers = (
  users: RegisteredUser[]
) => {

  localStorage.setItem(
    USERS_STORAGE_KEY,
    JSON.stringify(users)
  )
}
import type {
  AuthSession
} from "../types/auth.types"

import {
  AUTH_STORAGE_KEY
} from "../constants/auth.constants"

/**
 * SAVE SESSION
 */
export const saveSession = (
  session: AuthSession
) => {
  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify(session)
  )
}

/**
 * GET SESSION
 */
export const getSession =
  (): AuthSession | null => {

    const storedSession =
      localStorage.getItem(
        AUTH_STORAGE_KEY
      )

    if (!storedSession) {
      return null
    }

    try {
      return JSON.parse(storedSession)
    } catch {
      return null
    }
}

/**
 * REMOVE SESSION
 */
export const removeSession = () => {
  localStorage.removeItem(
    AUTH_STORAGE_KEY
  )
}
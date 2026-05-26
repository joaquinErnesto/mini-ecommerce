import {
  useEffect,
  useMemo,
  useState,
  useCallback
} from "react"

import { AuthContext } from "./AuthContext"

import type {
  AuthUser,
  LoginCredentials,
  AuthStatus,
  AuthSession
} from "../types/auth.types"

import {
  loginRequest,
  getCurrentUser,
  refreshTokenRequest
} from "../services/auth.service"

import {
  getSession,
  saveSession,
  removeSession
} from "../utils/authStorage"

interface Props {
  children: React.ReactNode
}

export const AuthProvider = ({
  children
}: Props) => {

  const [user, setUser] =
    useState<AuthUser | null>(null)

  const [status, setStatus] =
    useState<AuthStatus>("checking")

  /**
   * RESTORE SESSION
   */
  const restoreSession =
    useCallback(async () => {

      try {

        const storedSession =
          getSession()

        /**
         * No session
         */
        if (!storedSession) {

          setUser(null)

          setStatus(
            "unauthenticated"
          )

          return
        }

        /**
         * Inject token
         */
        await injectToken(
          storedSession.tokens.accessToken
        )

        /**
         * Validate token
         */
        const currentUser =
          await getCurrentUser()

        /**
         * Rebuild session
         */
        const validSession:
          AuthSession = {

          user: currentUser,

          tokens:
            storedSession.tokens
        }

        saveSession(validSession)

        setUser(currentUser)

        setStatus(
          "authenticated"
        )

      } catch (error) {

        console.error(
          "Session restore failed:",
          error
        )

        /**
         * Silent logout
         */
        removeSession()

        setUser(null)

        setStatus(
          "unauthenticated"
        )
      }

    }, [])
  
  /**
 * REFRESH ACCESS TOKEN
 */

  const refreshAccessToken =
    useCallback(async () => {

      try {

        const storedSession =
          getSession()

        if (!storedSession) {
          throw new Error(
            "No stored session"
          )
        }

        const response =
          await refreshTokenRequest(
            storedSession.tokens.refreshToken
          )

        /**
         * Update tokens
         */
        const updatedSession:
          AuthSession = {

          user: storedSession.user,

          tokens: {
            accessToken:
              response.accessToken,

            refreshToken:
              response.refreshToken ||
              storedSession.tokens.refreshToken
          }
        }

        /**
         * Persist
         */
        saveSession(updatedSession)

        /**
         * Inject new token
         */

        return updatedSession

      } catch (error) {

        console.error(
          "Refresh token failed:",
          error
        )

        logout()

        throw error
      }

    }, [])

  /**
   * INITIAL SESSION CHECK
   */
  useEffect(() => {
    restoreSession()
  }, [restoreSession])

  /**
   * LOGIN
   */
  const login = async (
    credentials: LoginCredentials
  ) => {

    try {

      setStatus("checking")

      /**
       * Get tokens
       */
      const tokens =
        await loginRequest(
          credentials
        )

      /**
       * Inject token
       */
      await injectToken(
        tokens.accessToken
      )

      /**
       * Fetch authenticated user
       */
      const currentUser =
        await getCurrentUser()

      /**
       * Create session
       */
      const session:
        AuthSession = {

        user: currentUser,

        tokens
      }

      saveSession(session)

      setUser(currentUser)

      setStatus(
        "authenticated"
      )

    } catch (error) {

      console.error(
        "Login failed:",
        error
      )

      removeSession()

      setUser(null)

      setStatus(
        "unauthenticated"
      )

      throw error
    }
  }

  /**
   * LOGOUT
   */
  const logout = () => {

    removeSession()

    setUser(null)

    setStatus(
      "unauthenticated"
    )

    import(
      "../../../services/apiClient"
    ).then(({ apiClient }) => {

      delete apiClient.defaults.headers.common.Authorization
    })
  }

  /**
   * DERIVED STATE
   */
  const isAuthenticated =
    status === "authenticated"

  const loading =
    status === "checking"

  /**
   * CONTEXT VALUE
   */
  const value = useMemo(
    () => ({
      user,

      status,

      isAuthenticated,

      loading,

      login,

      logout,

      restoreSession,

      refreshAccessToken
    }),
    [
      user,
      status,
      isAuthenticated,
      loading,
      restoreSession,
      refreshAccessToken
    ]
  )

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  )
}

const injectToken = async (
  token: string
) => {

  const { apiClient } =
    await import(
      "../../../services/apiClient"
    )

  apiClient.defaults.headers.common.Authorization =
    `Bearer ${token}`
}
import axios, {
  AxiosError,
} from "axios"

import type { InternalAxiosRequestConfig } from "axios"

import {
  getSession,
  saveSession,
  removeSession
} from "../features/auth/utils/authStorage"

import {
  refreshTokenRequest
} from "../features/auth/services/auth.service"

import type {
  AuthSession
} from "../features/auth/types/auth.types"

/**
 * AXIOS INSTANCE
 */
export const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type":
      "application/json"
  },
  timeout: 15000
})

/**
 * REQUEST INTERCEPTOR
 */
apiClient.interceptors.request.use(
  (
    config:
      InternalAxiosRequestConfig
  ) => {

    const session =
      getSession()

    /**
     * Inject token
     */
    if (
      session?.tokens.accessToken
    ) {

      config.headers.Authorization =
        `Bearer ${session.tokens.accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * TOKEN REFRESH STATE
 */
let isRefreshing = false

let failedQueue: Array<{
  resolve: (
    token: string
  ) => void

  reject: (
    error: AxiosError
  ) => void
}> = []

/**
 * PROCESS FAILED QUEUE
 */
const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {

  failedQueue.forEach(
    (promise) => {

      if (error) {

        promise.reject(error)

      } else if (token) {

        promise.resolve(token)
      }
    }
  )

  failedQueue = []
}

/**
 * RESPONSE INTERCEPTOR
 */
apiClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {

    const originalRequest =
      error.config as
      InternalAxiosRequestConfig & {
        _retry?: boolean
      }

    /**
     * Ignore if not 401
     */
    if (
      error.response?.status !== 401
    ) {

      return Promise.reject(error)
    }

    /**
     * Prevent infinite retry loop
     */
    if (originalRequest._retry) {

      removeSession()

      return Promise.reject(error)
    }

    originalRequest._retry = true

    /**
     * Queue requests while refreshing
     */
    if (isRefreshing) {

      return new Promise(
        (resolve, reject) => {

          failedQueue.push({
            resolve: (
              token: string
            ) => {

              originalRequest.headers.Authorization =
                `Bearer ${token}`

              resolve(
                apiClient(originalRequest)
              )
            },

            reject
          })
        }
      )
    }

    isRefreshing = true

    try {

      const session =
        getSession()

      if (!session) {
        throw error
      }

      /**
       * Refresh token request
       */
      const refreshResponse =
        await refreshTokenRequest(
          session.tokens.refreshToken
        )

      /**
       * Build updated session
       */
      const updatedSession:
        AuthSession = {

        user: session.user,

        tokens: {
          accessToken:
            refreshResponse.accessToken,

          refreshToken:
            refreshResponse.refreshToken ||
            session.tokens.refreshToken
        }
      }

      /**
       * Persist new session
       */
      saveSession(updatedSession)

      /**
       * Update axios default token
       */
      apiClient.defaults.headers.common.Authorization =
        `Bearer ${updatedSession.tokens.accessToken}`

      /**
       * Resolve queued requests
       */
      processQueue(
        null,
        updatedSession.tokens.accessToken
      )

      /**
       * Retry original request
       */
      originalRequest.headers.Authorization =
        `Bearer ${updatedSession.tokens.accessToken}`

      return apiClient(
        originalRequest
      )

    } catch (refreshError) {

      processQueue(
        refreshError as AxiosError,
        null
      )

      removeSession()

      return Promise.reject(
        refreshError
      )

    } finally {

      isRefreshing = false
    }
  }
)
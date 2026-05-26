import { apiClient } from "../../../services/apiClient"

import {
  AUTH_API, TOKEN_EXPIRATION_MINUTES
} from "../constants/auth.constants"

import type {
  LoginCredentials,
  LoginResponse,
  RefreshTokenResponse,
  AuthUser
} from "../types/auth.types"

/**
 * LOGIN
 */
export const loginRequest = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const response =
      await apiClient.post<LoginResponse>(
        AUTH_API.LOGIN,
        {
          ...credentials,
          expiresInMins: TOKEN_EXPIRATION_MINUTES
        }
      )

    return {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken
    }

  } catch (error) {
    console.error("Login error:", error)
    throw error
  }
}

/**
 * REFRESH TOKEN
 */
export const refreshTokenRequest =
  async (
    refreshToken: string
  ): Promise<RefreshTokenResponse> => {

    try {

      const response =
        await apiClient.post<RefreshTokenResponse>(
          "/auth/refresh",
          {
            refreshToken,
            expiresInMins: 30
          }
        )

      return response.data

    } catch (error) {

      console.error(
        "Refresh token error:",
        error
      )

      throw error
    }
}

/**
 * GET CURRENT AUTHENTICATED USER
 */
export const getCurrentUser =
  async (): Promise<AuthUser> => {

    try {

      const response =
        await apiClient.get<AuthUser>(
          AUTH_API.CURRENT_USER
        )

      return response.data

    } catch (error) {

      console.error(
        "Get current user error:",
        error
      )

      throw error
    }
}
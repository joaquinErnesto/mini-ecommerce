import { apiClient } from "../../../services/apiClient"
import type {
  AuthUser,
  LoginCredentials
} from "../types/auth.types"

export const loginRequest = async (
  credentials: LoginCredentials
): Promise<AuthUser> => {
  try {
    const response = await apiClient.post<AuthUser>(
      "/auth/login",
      {
        ...credentials,
        expiresInMins: 30
      }
    )

    return response.data
  } catch (error) {
    console.error("Login error:", error)
    throw error
  }
}
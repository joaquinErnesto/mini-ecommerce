export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface AuthUser {
  id: number

  username: string

  email: string

  firstName: string
  lastName: string

  image: string

  role?: string
}

export interface AuthSession {
  user: AuthUser
  tokens: AuthTokens
}

export interface LoginCredentials {
  username: string
  password: string
}

export type AuthStatus =
  | "checking"
  | "authenticated"
  | "unauthenticated"

export interface LoginResponse {
  accessToken: string
  refreshToken: string
}

export interface RefreshTokenResponse {
  accessToken: string
  refreshToken?: string
}

export interface AuthContextType {
  user: AuthUser | null

  status: AuthStatus

  isAuthenticated: boolean

  loading: boolean

  login: (
    credentials: LoginCredentials
  ) => Promise<void>

  register: (
    credentials: RegisterCredentials
  ) => Promise<void>

  logout: () => void

  restoreSession: () => Promise<void>

  refreshAccessToken: () => Promise<AuthSession>
}

export interface RegisterCredentials {
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
}
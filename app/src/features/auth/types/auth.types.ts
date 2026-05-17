export interface AuthUser {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  image: string
  accessToken: string
  refreshToken: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  loading: boolean

  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
}
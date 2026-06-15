export const AUTH_STORAGE_KEY = "auth_session"

export const AUTH_ROUTES = {
  LOGIN: "/login",
  PROFILE: "/profile",
  HOME: "/"
} as const

export const AUTH_API = {
  LOGIN: "/auth/login",
  CURRENT_USER: "/auth/me",
  REFRESH: "/auth/refresh",
  REGISTER: "/users/add"
} as const

export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: "Welcome back!",
  LOGIN_ERROR: "Invalid credentials",
  LOGOUT_SUCCESS: "Session closed successfully",
  SESSION_EXPIRED: "Session expired"
} as const

export const TOKEN_EXPIRATION_MINUTES = 30
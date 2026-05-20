export interface UserAddress {
  address: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface UserCompany {
  name: string
  department: string
  title: string
}

export interface AuthUser {
  id: number

  firstName: string
  lastName: string
  maidenName?: string

  age: number
  gender: string

  email: string
  phone: string

  username: string

  birthDate: string

  image: string
  
  role: string

  address: UserAddress

  company: UserCompany

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
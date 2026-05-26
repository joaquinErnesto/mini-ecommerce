import { useAuth } from "../useAuth"

export const useAuthStatus = () => {

  const {
    status,
    loading
  } = useAuth()

  return {
    status,
    loading
  }
}
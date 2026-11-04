import { useAuth } from "../useAuth"

export const useAuthUser = () => {

  const { user } = useAuth()

  return user
}
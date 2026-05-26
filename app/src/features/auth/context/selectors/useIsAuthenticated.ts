import { useAuth } from "../useAuth"

export const useIsAuthenticated =
  () => {

    const {
      isAuthenticated
    } = useAuth()

    return isAuthenticated
}
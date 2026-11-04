import { 
  Navigate,
  useLocation 
} from "react-router-dom"

import type { ReactNode } from "react"

import { useAuth } from "../context/useAuth"
import { AuthLoader } from
  "../components/AuthLoader/AuthLoader"

import { AUTH_ROUTES } from "../constants/auth.constants"

interface Props {
  children: ReactNode
}

export const GuestRoute = ({
  children
}: Props) => {

  const {
    isAuthenticated,
    loading
  } = useAuth()

  const location = useLocation()

  /**
   * Checking session
   */
  if (loading) {

    return (
      <AuthLoader
        text="Checking authentication..."
      />
    )
  }

  /**
   * Already authenticated
   */
  if (isAuthenticated) {
    
    const redirectTo =
      location.state?.from ||
      AUTH_ROUTES.PROFILE

    return (
      <Navigate
        to={redirectTo}
        replace
      />
    )
  }

  /**
   * Guest only
   */
  return children
}
import { Navigate } from "react-router-dom"
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

    return (
      <Navigate
        to={AUTH_ROUTES.PROFILE}
        replace
      />
    )
  }

  /**
   * Guest only
   */
  return children
}
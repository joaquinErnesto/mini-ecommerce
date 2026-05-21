import { useCallback, useEffect, useState } from "react"

import { getProfile } from "../services/profile.service"

import type { ProfileData } from "../types/profile.types"

export const useProfile = () => {

  const [profile, setProfile] = useState<ProfileData | null>(null)

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState<string | null>(null)

  const fetchProfile = useCallback(async () => {

    try {

      setLoading(true)

      const data = await getProfile()

      setProfile(data)

      setError(null)

    } catch (err: any) {

      console.error("Profile fetch error:", err)

      setError(
        err?.message || "Failed to load profile"
      )

    } finally {

      setLoading(false)

    }

  }, [])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile
  }
}
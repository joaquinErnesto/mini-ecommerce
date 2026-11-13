import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import { useAuth } from "../../../auth/context/useAuth"

import {
  AUTH_MESSAGES,
  AUTH_ROUTES
} from "../../../auth/constants/auth.constants"

import type { ProfileData } from "../../types/profile.types"

import "./ProfileSidebar.css"

const SECTIONS = [
  { id: "account-info", label: "Account info", icon: "person" },
  { id: "orders", label: "Orders", icon: "receipt_long" },
  { id: "security", label: "Security", icon: "shield" },
  { id: "preferences", label: "Preferences", icon: "tune" }
] as const

interface Props {
  profile: ProfileData
}

const capitalize = (value: string) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1) : "Customer"

export const ProfileSidebar = ({
  profile
}: Props) => {

  const navigate = useNavigate()

  const { logout } = useAuth()

  const [activeSection, setActiveSection] = useState<string>(
    SECTIONS[0].id
  )

  /**
   * Keep the navigation in sync with whichever panel owns the viewport.
   */
  useEffect(() => {

    const elements = SECTIONS
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element))

    if (!elements.length) return

    const visible = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            visible.add(entry.target.id)
          } else {
            visible.delete(entry.target.id)
          }
        })

        const firstVisible = SECTIONS.find(
          (section) => visible.has(section.id)
        )

        if (firstVisible) {
          setActiveSection(firstVisible.id)
        }
      },
      {
        rootMargin: "-120px 0px -55% 0px",
        threshold: 0
      }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()

  }, [])

  const scrollToSection = (sectionId: string) => {

    const element = document.getElementById(sectionId)

    if (!element) return

    setActiveSection(sectionId)

    element.scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  }

  const handleLogout = () => {

    logout()

    toast.success(AUTH_MESSAGES.LOGOUT_SUCCESS)

    navigate(AUTH_ROUTES.LOGIN, {
      replace: true
    })
  }

  const initials = profile.fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("")

  return (
    <div className="profile-sidebar">

      <div className="profile-sidebar-identity">

        <div className="profile-sidebar-avatar">
          {profile.image ? (
            <img
              src={profile.image}
              alt=""
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span aria-hidden="true">
              {initials || "M"}
            </span>
          )}
        </div>

        <div className="profile-sidebar-name">
          <h2>
            {profile.fullName}
          </h2>

          <p>
            {profile.email}
          </p>

          <span className="profile-sidebar-role">
            {capitalize(profile.role)}
          </span>
        </div>

      </div>

      <nav
        className="profile-sidebar-nav"
        aria-label="Profile sections"
      >
        {SECTIONS.map((section) => {

          const isActive = activeSection === section.id

          return (
            <button
              key={section.id}
              type="button"
              className={
                isActive
                  ? "profile-sidebar-link is-active"
                  : "profile-sidebar-link"
              }
              aria-current={isActive ? "true" : undefined}
              onClick={() => scrollToSection(section.id)}
            >
              <span
                className="material-symbols-outlined"
                aria-hidden="true"
              >
                {section.icon}
              </span>

              {section.label}
            </button>
          )
        })}
      </nav>

      <button
        type="button"
        className="profile-sidebar-logout"
        onClick={handleLogout}
      >
        <span
          className="material-symbols-outlined"
          aria-hidden="true"
        >
          logout
        </span>

        Sign out
      </button>

    </div>
  )
}

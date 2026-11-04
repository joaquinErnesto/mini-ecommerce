import type { ReactNode } from "react"
import "./ProfileSection.css"

interface Props {
  children: ReactNode
}

export const ProfileSection = ({ children }: Props) => {
  return (
    <section className="profile-section-container">
      {children}
    </section>
  )
}
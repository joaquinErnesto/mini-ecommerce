import type { ReactNode } from "react"

import "./ProfileSection.css"

interface Props {
  children: ReactNode
  id?: string
  tone?: "default" | "danger"
  className?: string
}

export const ProfileSection = ({
  children,
  id,
  tone = "default",
  className
}: Props) => {
  const classes = [
    "profile-panel",
    tone === "danger" ? "profile-panel--danger" : "",
    className ?? ""
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <section
      id={id}
      className={classes}
    >
      {children}
    </section>
  )
}

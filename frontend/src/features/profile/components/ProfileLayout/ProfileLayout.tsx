import type { ReactNode } from "react"

interface Props {
  sidebar: ReactNode
  children: ReactNode
}

export const ProfileLayout = ({
  sidebar,
  children
}: Props) => {
  return (
    <div className="profile-grid">
      <aside className="profile-aside">
        {sidebar}
      </aside>

      <div className="profile-main">
        {children}
      </div>
    </div>
  )
}

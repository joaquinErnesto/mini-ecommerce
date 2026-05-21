import type { ReactNode } from "react"
import "./ProfileLayout.css"

interface Props {
  sidebar: ReactNode
  children: ReactNode
}

export const ProfileLayout = ({
  sidebar,
  children
}: Props) => {
  return (
    <main className="profile-layout-container">
      <aside className="profile-layout-sidebar">
        {sidebar}
      </aside>

      <section className="profile-layout-content">
        {children}
      </section>
    </main>
  )
}

import { Link } from "react-router-dom"

import "./ProfileHeader.css"

interface Props {
  badge: string
  title: string
  action?: string
  actionTo?: string
}

export const ProfileHeader = ({
  badge,
  title,
  action,
  actionTo
}: Props) => {
  return (
    <header className="profile-section-head">
      <div>
        <p className="profile-section-kicker">
          {badge}
        </p>

        <h2 className="profile-section-title">
          {title}
        </h2>
      </div>

      {action ? (
        actionTo ? (
          <Link
            className="profile-section-action"
            to={actionTo}
          >
            {action}

            <span
              className="material-symbols-outlined"
              aria-hidden="true"
            >
              arrow_forward
            </span>
          </Link>
        ) : (
          <button
            type="button"
            className="profile-section-action"
          >
            {action}
          </button>
        )
      ) : null}
    </header>
  )
}

import "./ProfileHeader.css"

interface Props {
  badge: string
  title: string
  action?: string
}

export const ProfileHeader = ({
  badge,
  title,
  action
}: Props) => {
  return (
    <div className="profile-header-container">
      <div>
        <span>
          {badge}
        </span>

        <h2>
          {title}
        </h2>
      </div>

      {action && (
        <button>
          {action}
        </button>
      )}
    </div>
  )
}
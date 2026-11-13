import "./PreferenceToggle.css"

interface Props {
  title: string
  description: string
  checked: boolean
}

export const PreferenceToggle = ({
  title,
  description,
  checked
}: Props) => {
  return (
    <div className="profile-preference">
      <div className="profile-preference-copy">
        <h3>
          {title}
        </h3>

        <p>
          {description}
        </p>
      </div>

      <label className="profile-switch">
        <input
          type="checkbox"
          defaultChecked={checked}
          aria-label={title}
        />

        <span
          className="profile-switch-track"
          aria-hidden="true"
        />
      </label>
    </div>
  )
}

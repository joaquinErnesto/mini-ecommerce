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
    <div className="preference-toggle-container">
      <div>
        <h4>
          {title}
        </h4>

        <p>
          {description}
        </p>
      </div>

      <label className="switch">
        <input
          type="checkbox"
          defaultChecked={checked}
        />

        <span className="slider"></span>
      </label>
    </div>
  )
}
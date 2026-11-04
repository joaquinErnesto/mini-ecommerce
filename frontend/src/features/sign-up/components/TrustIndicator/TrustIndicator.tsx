import "./TrustIndicator.css"

interface Props {
  icon: string
  label: string
}

export const TrustIndicator = ({
  icon,
  label
}: Props) => {

  return (
    <div className="trust-indicator">

      <span className="material-symbols-outlined">
        {icon}
      </span>

      <span>
        {label}
      </span>

    </div>
  )
}
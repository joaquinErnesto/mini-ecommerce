import "./InfoCard.css"

interface Props {
  label: string
  value: string
}

export const InfoCard = ({
  label,
  value
}: Props) => {
  return (
    <div className="info-card-container">
      <label>
        {label}
      </label>

      <div>
        {value}
      </div>
    </div>
  )
}
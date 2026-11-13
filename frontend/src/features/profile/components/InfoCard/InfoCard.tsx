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
    <div className="profile-info">
      <dt>
        {label}
      </dt>

      <dd>
        {value}
      </dd>
    </div>
  )
}

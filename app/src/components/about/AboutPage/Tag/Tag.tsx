type Props = {
  label: string
}

export const Tag = ({ label }: Props) => {
  return (
    <span className="tag">
      {label}
    </span>
  )
}
type Props = {
  name: string
  role: string
}

const initialsOf = (name: string) =>
  name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase()

export const TeamMember = ({ name, role }: Props) => {
  return (
    <article className="about-member">
      <div className="about-member-media">
        <span className="about-member-fallback" aria-hidden="true">
          {initialsOf(name)}
        </span>
      </div>

      <h3>{name}</h3>
      <p>{role}</p>
    </article>
  )
}

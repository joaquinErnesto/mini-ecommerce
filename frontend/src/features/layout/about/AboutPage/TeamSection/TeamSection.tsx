import { TeamMember } from "../TeamMember/TeamMember"

const team = [
  {
    name: "Alexis Moreau",
    role: "Founder & curator"
  },
  {
    name: "Sarah Voss",
    role: "Head of curation"
  },
  {
    name: "Daniel Reyes",
    role: "Product lead"
  },
  {
    name: "Naomi Park",
    role: "Client care"
  }
]

export const TeamSection = () => {
  return (
    <section className="about-team" aria-labelledby="about-team-title">
      <header className="about-section-head">
        <div>
          <p className="about-kicker">
            <span className="about-kicker-dot" aria-hidden="true" />
            The people
          </p>

          <h2 id="about-team-title" className="about-section-title">
            Small team,
            <br />
            close attention.
          </h2>
        </div>

        <p className="about-section-lede">
          Four people, one shared standard. If you write to us, you reach
          someone who knows the catalogue by heart.
        </p>
      </header>

      <div className="about-team-grid">
        {team.map((member) => (
          <TeamMember
            key={member.name}
            name={member.name}
            role={member.role}
          />
        ))}
      </div>
    </section>
  )
}

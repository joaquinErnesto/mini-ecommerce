const principles = [
  {
    icon: "filter_alt",
    title: "Edited, not endless",
    text: "Every product earns its place. No filler catalogue, no infinite scroll — just a short list worth your attention."
  },
  {
    icon: "diamond",
    title: "Made to be kept",
    text: "We favour pieces with weight, honesty, and a long life over trend cycles and disposable design."
  },
  {
    icon: "support_agent",
    title: "Quiet service",
    text: "Clear pricing, careful packing, and a real person on the other end when you need one."
  }
]

export const PhilosophyGrid = () => {
  return (
    <section
      className="about-philosophy"
      aria-labelledby="about-philosophy-title"
    >
      <header className="about-section-head">
        <div>
          <p className="about-kicker">
            <span className="about-kicker-dot" aria-hidden="true" />
            Our philosophy
          </p>

          <h2 id="about-philosophy-title" className="about-section-title">
            Fewer things,
            <br />
            chosen well.
          </h2>
        </div>

        <p className="about-section-lede">
          A marketplace can be calm. We built one around restraint: a
          considered edit, honest information, and a shop that respects your
          time instead of competing for it.
        </p>
      </header>

      <div className="about-principles">
        {principles.map((principle) => (
          <article className="about-principle" key={principle.title}>
            <span className="about-principle-icon" aria-hidden="true">
              <span className="material-symbols-outlined">
                {principle.icon}
              </span>
            </span>

            <h3>{principle.title}</h3>
            <p>{principle.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

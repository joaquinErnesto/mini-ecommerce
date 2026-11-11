import { Link } from "react-router-dom"

const points = [
  "A short, hand-picked catalogue",
  "Honest materials and clear pricing",
  "Packed with care, shipped with tracking"
]

export const ProductHighlight = () => {
  return (
    <section
      className="about-highlight"
      aria-labelledby="about-highlight-title"
    >
      <figure className="about-highlight-media">
        <img
          src="https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/1.webp"
          alt="Annibale Colombo sofa in a curated interior"
          loading="lazy"
        />
      </figure>

      <div className="about-highlight-copy">
        <p className="about-kicker">
          <span className="about-kicker-dot" aria-hidden="true" />
          Curated with intent
        </p>

        <h2 id="about-highlight-title" className="about-section-title">
          Precision over
          <br />
          <span className="about-title-accent">plenty</span>.
        </h2>

        <p className="about-highlight-lede">
          Our selection process is deliberately slow. Each piece is reviewed
          for material, construction, and the small details that decide whether
          something lasts a season or a decade.
        </p>

        <ul className="about-checklist">
          {points.map((point) => (
            <li key={point}>
              <span className="material-symbols-outlined" aria-hidden="true">
                check
              </span>
              {point}
            </li>
          ))}
        </ul>

        <Link className="about-button about-button--primary" to="/products">
          Explore the catalogue
          <span className="material-symbols-outlined" aria-hidden="true">
            arrow_forward
          </span>
        </Link>
      </div>
    </section>
  )
}

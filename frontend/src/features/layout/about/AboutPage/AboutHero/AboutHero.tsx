import { Link } from "react-router-dom"

export const AboutHero = () => {
  return (
    <section className="about-hero" aria-labelledby="about-hero-title">
      <div className="about-hero-copy">
        <p className="about-kicker">
          <span className="about-kicker-dot" aria-hidden="true" />
          The studio
        </p>

        <h1 id="about-hero-title" className="about-title">
          Considered
          <br />
          by <span className="about-title-accent">design</span>.
        </h1>

        <p className="about-lede">
          Mini E-Commerce is a small, curated marketplace for fragrance,
          furniture, and everyday objects chosen for how they feel — not how
          loudly they sell.
        </p>

        <div className="about-actions">
          <Link
            className="about-button about-button--primary"
            to="/products"
          >
            Browse the collection
            <span className="material-symbols-outlined" aria-hidden="true">
              arrow_forward
            </span>
          </Link>

          <Link className="about-button about-button--ghost" to="/contact">
            Talk to us
          </Link>
        </div>

        <p className="about-note">
          Curated in small batches, packed and shipped from the studio.
        </p>
      </div>

      <div className="about-hero-visual">
        <figure className="about-hero-frame">
          <div className="about-hero-media">
            <img
              src="https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/1.webp"
              alt="Rolex Cellini Date with a black dial"
              loading="eager"
            />
          </div>

          <figcaption>
            <span>Currently editing</span>
            <strong>Rolex Cellini, black dial</strong>
          </figcaption>
        </figure>

        <div className="about-hero-badge">
          <strong>06</strong>
          <span>categories, carefully kept</span>
        </div>
      </div>
    </section>
  )
}

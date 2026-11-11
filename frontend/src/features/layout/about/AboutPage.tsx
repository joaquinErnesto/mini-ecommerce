import { Link } from "react-router-dom"

import "./about.css"

import { AboutHero } from "./AboutPage/AboutHero/AboutHero"
import { PhilosophyGrid } from "./AboutPage/PhilosophyGrid/PhilosophyGrid"
import { QuoteSection } from "./AboutPage/QuoteSection/QuoteSection"
import { ProductHighlight } from "./AboutPage/ProductHighlight/ProductHighlight"
import { TeamSection } from "./AboutPage/TeamSection/TeamSection"

export const AboutPage = () => {
  return (
    <div className="about-page">
      <AboutHero />
      <PhilosophyGrid />
      <QuoteSection />
      <ProductHighlight />
      <TeamSection />

      <section className="about-cta" aria-labelledby="about-cta-title">
        <div className="about-cta-copy">
          <p className="about-kicker">
            <span className="about-kicker-dot" aria-hidden="true" />
            Ready when you are
          </p>

          <h2 id="about-cta-title">Take a piece home.</h2>

          <p>
            The edit changes weekly. Start with what catches your eye, or ask
            us and we will point you in the right direction.
          </p>
        </div>

        <div className="about-actions">
          <Link className="about-button about-button--primary" to="/products">
            Shop the edit
            <span className="material-symbols-outlined" aria-hidden="true">
              arrow_forward
            </span>
          </Link>

          <Link className="about-button about-button--ghost" to="/contact">
            Contact us
          </Link>
        </div>
      </section>
    </div>
  )
}

import "../../assets/styles/about.css"

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

    </div>
  )
}
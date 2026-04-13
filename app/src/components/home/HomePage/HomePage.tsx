import "../../../assets/styles/home.css"

import { HeroSection } from "../HeroSection/HeroSection"
import { FeaturedSection } from "../FeaturedSection/FeaturedSection"
import { FeaturesStrip } from "../FeaturesStrip/FeaturesStrip"
import { CTASection } from "../CTASection/CTASection"

export const HomePage = () => {
    return (
        <div className="home">
            <HeroSection />
            <FeaturedSection />
            <FeaturesStrip />
            <CTASection />
        </div>
    )
}
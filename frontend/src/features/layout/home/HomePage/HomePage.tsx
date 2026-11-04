import "./home.css"

import { HeroSection } from "../HeroSection/HeroSection"
import { FeaturedSection } from "../FeaturedSection/FeaturedSection"
import { FeaturesStrip } from "../FeaturesStrip/FeaturesStrip"
import { CTASection } from "../CTASection/CTASection"

import { useHomeProducts } from "../hooks/useHomeProducts"

export const HomePage = () => {
    const {
        heroProduct,
        featuredProducts,
        loading,
        failed,
        refetch,
    } = useHomeProducts()

    return (
        <div className="home">
            <HeroSection
                product={heroProduct}
                loading={loading}
                featuredCount={featuredProducts.length}
            />

            <FeaturedSection
                products={featuredProducts}
                loading={loading}
                failed={failed}
                onRetry={refetch}
            />

            <FeaturesStrip />
            <CTASection />
        </div>
    )
}

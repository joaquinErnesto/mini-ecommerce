export const HeroSection = () => {
    return (
        <section className="hero">
            <div className="hero-overlay" />

            <div className="hero-content">
                <span className="hero-subtitle">
                    Excellence
                </span>

                <h1>
                    THE <span className="highlight">PRODUCT</span><br />
                    MARKETPLACE
                </h1>

                <p>
                    Discover premium products curated for performance and style.
                </p>

                <div className="hero-buttons">
                    <button className="primary-btn">
                        Shop Now
                    </button>

                    <button className="secondary-btn">
                        Explore
                    </button>
                </div>
            </div>
        </section>
    )
}
const FEATURES = [
    {
        icon: "lock",
        title: "Secure checkout",
        description: "Every payment is encrypted, start to finish.",
    },
    {
        icon: "local_shipping",
        title: "Fast delivery",
        description: "Tracked shipping, worldwide.",
    },
    {
        icon: "verified",
        title: "Quality guarantee",
        description: "Only pieces we would buy ourselves.",
    },
    {
        icon: "support_agent",
        title: "Real support",
        description: "A person answers, day or night.",
    },
] as const

export const FeaturesStrip = () => {
    return (
        <section className="home-features" aria-labelledby="home-features-title">
            <h2 id="home-features-title" className="home-visually-hidden">
                Why shop with us
            </h2>

            <ul className="home-features-grid">
                {FEATURES.map((feature) => (
                    <li className="home-feature" key={feature.title}>
                        <span className="home-feature-icon" aria-hidden="true">
                            <span className="material-symbols-outlined">
                                {feature.icon}
                            </span>
                        </span>

                        <div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

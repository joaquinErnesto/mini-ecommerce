export const PrivacyHeader = () => {
    return (
        <header className="privacy-hero">
            <p className="privacy-kicker">
                <span className="privacy-kicker-dot" aria-hidden="true" />
                Legal
            </p>

            <div className="privacy-hero-row">
                <h1 className="privacy-title">
                    Privacy policy
                    <span className="privacy-title-accent">.</span>
                </h1>

                <span className="privacy-badge">Last updated May 2024</span>
            </div>

            <p className="privacy-lede">
                At Mini E-Commerce, transparency is our primary currency. We
                believe your data should be protected with the same care we give
                every piece in the catalogue.
            </p>
        </header>
    )
}

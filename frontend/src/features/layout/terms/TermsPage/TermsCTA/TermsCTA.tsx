import { Link } from "react-router-dom"

export const TermsCTA = () => {
    return (
        <div className="terms-cta">
            <div>
                <p className="terms-kicker">
                    <span className="terms-kicker-dot" aria-hidden="true" />
                    Still curious
                </p>

                <h2>Questions about these terms?</h2>

                <p>
                    Our compliance team is happy to clarify anything in plain
                    language.
                </p>
            </div>

            <div className="terms-cta-actions">
                <Link className="terms-button" to="/contact">
                    Contact compliance
                    <span
                        className="material-symbols-outlined"
                        aria-hidden="true"
                    >
                        arrow_forward
                    </span>
                </Link>

                <Link className="terms-button terms-button--ghost" to="/products">
                    Back to the shop
                </Link>
            </div>
        </div>
    )
}

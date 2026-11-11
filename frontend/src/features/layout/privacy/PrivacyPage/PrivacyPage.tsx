import { Link } from "react-router-dom"

import "./privacy.css"

import { PrivacyHeader } from "./PrivacyHeader/PrivacyHeader"
import { SidebarNav } from "./PrivacyLayout/SidebarNav/SidebarNav"
import { PrivacyContent } from "./PrivacyLayout/PrivacyContent/PrivacyContent"

export const PrivacyPage = () => {
    return (
        <div className="privacy-page">
            <div className="privacy-container">

                <PrivacyHeader />

                <div className="privacy-layout">
                    <SidebarNav />
                    <PrivacyContent />
                </div>

                <div className="privacy-cta">
                    <div>
                        <p className="privacy-kicker">
                            <span
                                className="privacy-kicker-dot"
                                aria-hidden="true"
                            />
                            Your data
                        </p>

                        <h2>Questions about your privacy?</h2>

                        <p>
                            Write to our privacy team and we will respond
                            within one business day.
                        </p>
                    </div>

                    <Link className="privacy-button" to="/contact">
                        Contact us
                        <span
                            className="material-symbols-outlined"
                            aria-hidden="true"
                        >
                            arrow_forward
                        </span>
                    </Link>
                </div>

            </div>
        </div>
    )
}

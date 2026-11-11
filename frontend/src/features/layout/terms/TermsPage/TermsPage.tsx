import "./terms.css"

import { TermsHeader } from "./TermsHeader/TermsHeader"
import { TermsSection } from "./TermsSection/TermsSection"
import { TermsCTA } from "./TermsCTA/TermsCTA"

export const TermsPage = () => {
    return (
        <div className="terms">
            <div className="terms-container">

                <TermsHeader />

                <div className="terms-content">

                    <TermsSection
                        id="license"
                        number="01"
                        title="The digital marketplace licence"
                        content={[
                            "Mini E-Commerce grants you a personal, non-transferable licence to browse and buy from this marketplace.",
                            "You may not resell, scrape, or reproduce the catalogue. We reserve the right to revoke access where misuse is detected."
                        ]}
                    />

                    <TermsSection
                        id="intellectual-property"
                        number="02"
                        title="Intellectual property rights"
                        content={[
                            "All designs, photography, code, and written content on this site are protected by copyright.",
                            "You are welcome to share links. Reproducing or redistributing the work without written permission is not allowed."
                        ]}
                    />

                    <TermsSection
                        id="payments"
                        number="03"
                        title="Acquisition and payments"
                        content={[
                            "Prices are shown in USD and include applicable taxes where required.",
                            "Limited-edition and made-to-order sales are final once confirmed. Please review your order carefully before paying."
                        ]}
                    />

                    <TermsSection
                        id="privacy"
                        number="04"
                        title="Privacy and data custodianship"
                        content={[
                            "We do not sell your personal data. It is used to fulfil orders, provide support, and keep the store secure.",
                            "Read the Privacy Policy for the full picture of what we collect and the rights you have over it."
                        ]}
                    />

                    <TermsSection
                        id="liability"
                        number="05"
                        title="Limitation of liability"
                        content={[
                            "We are not liable for indirect or consequential damages arising from use of the store.",
                            "The platform is provided as-is, and we do not warrant uninterrupted availability."
                        ]}
                    />

                </div>

                <TermsCTA />

            </div>
        </div>
    )
}

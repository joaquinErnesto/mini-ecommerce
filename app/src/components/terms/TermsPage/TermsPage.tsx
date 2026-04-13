import "../../../assets/styles/terms.css"

import { TermsHeader } from "./TermsHeader/TermsHeader"
import { TermsSection } from "./TermsSection/TermsSection"
import { TermsCTA } from "./TermsCTA/TermsCTA"

export const TermsPage = () => {
    return (
        <main className="terms">
            <div className="terms-container">

                <TermsHeader />

                <div className="terms-content">

                    <TermsSection
                        number="01"
                        title="The Digital Curator’s License"
                        content={[
                            "Electric Noir grants you a personal, non-transferable license to access our digital boutique.",
                            "We reserve the right to revoke access if misuse is detected."
                        ]}
                    />

                    <TermsSection
                        number="02"
                        title="Intellectual Property Rights"
                        content={[
                            "All designs, code, and assets are protected by copyright laws.",
                            "Unauthorized reproduction is strictly prohibited."
                        ]}
                    />

                    <TermsSection
                        number="03"
                        title="Acquisition and Payments"
                        content={[
                            "Prices include taxes where applicable.",
                            "All limited edition sales are final."
                        ]}
                    />

                    <TermsSection
                        number="04"
                        title="Privacy & Data Custodianship"
                        content={[
                            "We do not sell your personal data.",
                            "Your information is handled securely."
                        ]}
                    />

                    <TermsSection
                        number="05"
                        title="Limitation of Liability"
                        content={[
                            "We are not liable for indirect damages.",
                            "Platform is provided as-is."
                        ]}
                    />

                </div>

                <TermsCTA />

            </div>
        </main>
    )
}
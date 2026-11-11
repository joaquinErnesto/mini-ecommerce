import { SectionBlock } from "./SectionBlock/SectionBlock"
import { InfoCard } from "./InfoCard/InfoCard"
import { FeatureItem } from "./FeatureItem/FeatureItem"
import { RightsList } from "./RightsList/RightsList"

export const PrivacyContent = () => {
    return (
        <div className="privacy-content">

            {/* SECTION 1 */}
            <SectionBlock id="introduction" title="01. Introduction">
                <p>
                    This policy explains what Mini E-Commerce collects, why we
                    collect it, and the choices you have. It applies to the
                    storefront, your account, and any conversation you have
                    with our support team.
                </p>
                <p>
                    We keep this document short on purpose. If something is
                    unclear, write to us and we will explain it plainly.
                </p>
            </SectionBlock>

            {/* SECTION 2 */}
            <SectionBlock id="collection" title="02. Information we collect">
                <div className="privacy-info-grid">
                    <InfoCard
                        title="Device information"
                        text="Browser type, IP address, timezone, and the pages you visit while you shop."
                    />
                    <InfoCard
                        title="Order information"
                        text="Your name, delivery address, and a confirmation of payment from our payment provider."
                    />
                </div>
            </SectionBlock>

            {/* SECTION 3 */}
            <SectionBlock id="usage" title="03. How we use your data">
                <FeatureItem
                    title="Fulfilment of orders"
                    text="Processing payments, preparing your parcel, and keeping you updated on delivery."
                />
                <FeatureItem
                    title="Communication"
                    text="Answering your questions and, only if you opt in, sharing the occasional new edit."
                />
                <FeatureItem
                    title="Security"
                    text="Detecting fraud and keeping the store stable for everyone who uses it."
                />
            </SectionBlock>

            {/* SECTION 4 */}
            <SectionBlock id="security" title="04. Security">
                <div className="privacy-security">
                    “Every connection is encrypted in transit, and payment
                    details are handled by our payment partners. We never store
                    full card numbers on our servers.”
                </div>
            </SectionBlock>

            {/* SECTION 5 */}
            <SectionBlock id="rights" title="05. Your rights">
                <RightsList />
            </SectionBlock>

        </div>
    )
}

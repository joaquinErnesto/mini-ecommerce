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
                    This Privacy Policy describes how your personal information is collected...
                </p>
            </SectionBlock>

            {/* SECTION 2 */}
            <SectionBlock id="collection" title="02. Information We Collect">
                <div className="info-grid">
                    <InfoCard
                        title="Device Information"
                        text="We collect browser, IP, timezone..."
                    />
                    <InfoCard
                        title="Order Information"
                        text="We collect name, address, payment..."
                    />
                </div>
            </SectionBlock>

            {/* SECTION 3 */}
            <SectionBlock id="usage" title="03. How We Use Your Data">
                <FeatureItem
                    title="Fulfillment of Orders"
                    text="Processing payments and shipping"
                />
                <FeatureItem
                    title="Communication"
                    text="Providing updates and offers"
                />
                <FeatureItem
                    title="Security"
                    text="Fraud prevention and monitoring"
                />
            </SectionBlock>

            {/* SECTION 4 */}
            <SectionBlock id="security" title="04. Security">
                <div className="security-box">
                    "We use strong encryption to protect your data."
                </div>
            </SectionBlock>

            {/* SECTION 5 */}
            <SectionBlock id="rights" title="05. Your Rights">
                <RightsList />
            </SectionBlock>

        </div>
    )
}
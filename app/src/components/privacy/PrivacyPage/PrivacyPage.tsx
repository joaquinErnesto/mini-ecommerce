import "../../../assets/styles/privacy.css"

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

            </div>
        </div>
    )
}
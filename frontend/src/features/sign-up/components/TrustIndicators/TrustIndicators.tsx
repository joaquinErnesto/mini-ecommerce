import { TrustIndicator } from "../TrustIndicator/TrustIndicator"

import "./TrustIndicators.css"

export const TrustIndicators = () => {
  return (
    <div className="trust-indicators">
      <TrustIndicator icon="security" label="Secure data" />
      <TrustIndicator icon="encrypted" label="Encrypted" />
      <TrustIndicator icon="verified" label="Verified" />
    </div>
  )
}

import { TrustIndicator } from "../TrustIndicator/TrustIndicator"

import "./TrustIndicators.css"

export const TrustIndicators = () => {

  return (
    <div className="trust-indicators">

      <TrustIndicator
        icon="security"
        label="Secure Data"
      />

      <TrustIndicator
        icon="encrypted"
        label="End-to-End"
      />

      <TrustIndicator
        icon="verified"
        label="Certified"
      />

    </div>
  )
}
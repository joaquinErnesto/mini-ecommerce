import { useProfile } from "../hooks/useProfile"
import { useNavigate } from "react-router-dom"

import { ProfileLayout } from "../components/ProfileLayout/ProfileLayout"
import { ProfileSidebar } from "../components/ProfileSidebar/ProfileSidebar"
import { ProfileSection } from "../components/ProfileSection/ProfileSection"
import { ProfileHeader } from "../components/ProfileHeader/ProfileHeader"
import { InfoCard } from "../components/InfoCard/InfoCard"
import { OrderCard } from "../components/OrderCard/OrderCard"
import { PreferenceToggle } from "../components/PreferenceToggle/PreferenceToggle"

import "./ProfilePage.css"

export const ProfilePage = () => {

  const {
    profile,
    loading,
    error,
    refetch
  } = useProfile()

  const navigate = useNavigate()

  if (loading) {
    return (
      <div>
        Loading profile...
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div>
        <p>
          {error || "Profile not found"}
        </p>

        <button onClick={refetch}>
          Retry
        </button>
      </div>
    )
  }

  return (
    <ProfileLayout
      sidebar={<ProfileSidebar />}
    >

      {/* PERSONAL INFO */}
      <div id="account-info">
        <ProfileSection>

          <ProfileHeader
            badge="Identity Details"
            title="Personal Information"
            action="Edit Profile"
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.5rem"
            }}
          >

            <InfoCard
              label="Full Name"
              value={profile.fullName}
            />

            <InfoCard
              label="Email"
              value={profile.email}
            />

            <InfoCard
              label="Phone"
              value={profile.phone}
            />

            <InfoCard
              label="Location"
              value={profile.location}
            />

          </div>

        </ProfileSection>
      </div>    

      {/* ORDERS */}
      <div 
        id="orders"
        className="order-section"
      >

        <ProfileHeader
          badge="Acquisitions"
          title="Recent Orders"
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
          }}
        >

          {profile.orders.length === 0 ? (

            <div
              style={{
                padding: "2rem",
                border: "1px dashed #374151",
                borderRadius: "16px",
                textAlign: "center",
                color: "#9ca3af"
              }}
            >
              No orders yet.
            </div>

          ) : (

            profile.orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
              />
            ))

          )}

        </div>
        
        <div className="view-all-button-container">
          <button
            className="view-all-button"
            onClick={() =>
              navigate("/profile/orders")
            }
          >
            View All
          </button>
        </div>

      </div>

      {/* SECURITY + PREFERENCES */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem"
        }}
      >

        {/* SECURITY */}
        <div id="security">
          <ProfileSection>

            <ProfileHeader
              badge="Protection"
              title="Security"
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem"
              }}
            >

              <PreferenceToggle
                title="2-Factor Authentication"
                description="Enhanced security for your account"
                checked={profile.preferences.twoFactorAuth}
              />

            </div>

          </ProfileSection>
        </div>

        {/* PREFERENCES */}
        <div id="preferences">
          <ProfileSection>

            <ProfileHeader
              badge="Customization"
              title="Preferences"
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem"
              }}
            >

              <PreferenceToggle
                title="Newsletter"
                description="Weekly drops and updates"
                checked={profile.preferences.newsletter}
              />

              <PreferenceToggle
                title="Push Notifications"
                description="Receive realtime updates"
                checked={profile.preferences.pushNotifications}
              />

            </div>

          </ProfileSection>
        </div>

      </div>

      {/* DANGER ZONE */}
      <ProfileSection>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap"
          }}
        >

          <div>

            <h2
              style={{
                color: "#ef4444",
                marginBottom: "0.75rem"
              }}
            >
              Danger Zone
            </h2>

            <p
              style={{
                color: "#9ca3af"
              }}
            >
              Deleting your account is irreversible.
            </p>

          </div>

          <button
            style={{
              background: "rgba(239, 68, 68, 0.1)",
              border:
                "1px solid rgba(239, 68, 68, 0.2)",
              color: "#ef4444",
              padding: "1rem 1.5rem",
              borderRadius: "14px",
              cursor: "pointer"
            }}
          >
            Delete Account
          </button>

        </div>

      </ProfileSection>

    </ProfileLayout>
  )
}
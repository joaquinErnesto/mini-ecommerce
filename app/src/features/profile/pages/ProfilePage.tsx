import { useProfile } from "../hooks/useProfile"

import { ProfileLayout } from "../components/ProfileLayout/ProfileLayout"
import { ProfileSidebar } from "../components/ProfileSidebar/ProfileSidebar"
import { ProfileSection } from "../components/ProfileSection/ProfileSection"
import { ProfileHeader } from "../components/ProfileHeader/ProfileHeader"
import { InfoCard } from "../components/InfoCard/InfoCard"
import { OrderCard } from "../components/OrderCard/OrderCard"
import { PreferenceToggle } from "../components/PreferenceToggle/PreferenceToggle"

export const ProfilePage = () => {

  const {
    profile,
    loading,
    error,
    refetch
  } = useProfile()

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

      {/* ORDERS */}
      <div>

        <ProfileHeader
          badge="Acquisitions"
          title="Recent Orders"
          action="View All"
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
          }}
        >

          {profile.orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
            />
          ))}

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

        {/* PREFERENCES */}
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
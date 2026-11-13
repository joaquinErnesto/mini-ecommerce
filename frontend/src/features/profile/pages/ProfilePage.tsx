import { Link } from "react-router-dom";

import { useProfile } from "../hooks/useProfile";

import { ProfileLayout } from "../components/ProfileLayout/ProfileLayout";
import { ProfileSidebar } from "../components/ProfileSidebar/ProfileSidebar";
import { ProfileSection } from "../components/ProfileSection/ProfileSection";
import { ProfileHeader } from "../components/ProfileHeader/ProfileHeader";
import { InfoCard } from "../components/InfoCard/InfoCard";
import { PreferenceToggle } from "../components/PreferenceToggle/PreferenceToggle";

import { OrderCard } from "../../orders/components/OrderCard/OrderCard";

import "./ProfilePage.css";

const VISIBLE_ORDERS = 3;

const formatRole = (role: string) => {
  if (!role) return "Customer";

  return role.charAt(0).toUpperCase() + role.slice(1);
};

const ProfileHero = () => {
  return (
    <header className="profile-hero">
      <p className="profile-kicker">
        <span className="profile-kicker-dot" aria-hidden="true" />
        The account
      </p>

      <div className="profile-hero-row">
        <div>
          <h1 className="profile-title">
            Profile
            <span className="profile-title-accent">.</span>
          </h1>

          <p className="profile-lede">
            Your details, recent orders and the settings that keep the
            account moving.
          </p>
        </div>

        <Link className="profile-continue" to="/products">
          Continue shopping
          <span
            className="material-symbols-outlined"
            aria-hidden="true"
          >
            arrow_forward
          </span>
        </Link>
      </div>
    </header>
  );
};

const ProfileSkeleton = () => {
  return (
    <div className="profile-grid" aria-hidden="true">
      <div className="profile-aside">
        <div className="profile-panel profile-panel--skeleton">
          <div className="profile-skeleton profile-skeleton--avatar" />

          <div className="profile-skeleton profile-skeleton--line" />
          <div className="profile-skeleton profile-skeleton--line profile-skeleton--short" />

          <div className="profile-skeleton profile-skeleton--row" />
          <div className="profile-skeleton profile-skeleton--row" />
          <div className="profile-skeleton profile-skeleton--row" />
        </div>
      </div>

      <div className="profile-main">
        {[0, 1, 2].map((index) => (
          <div className="profile-panel profile-panel--skeleton" key={index}>
            <div className="profile-skeleton profile-skeleton--kicker" />
            <div className="profile-skeleton profile-skeleton--heading" />

            <div className="profile-skeleton profile-skeleton--block" />
            <div className="profile-skeleton profile-skeleton--block" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProfilePage = () => {
  const {
    profile,
    loading,
    error,
    refetch
  } = useProfile();

  if (loading) {
    return (
      <div className="profile-page">
        <ProfileHero />
        <ProfileSkeleton />

        <p className="profile-visually-hidden" role="status">
          Loading profile
        </p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="profile-page">
        <ProfileHero />

        <div className="profile-state" role="alert">
          <span className="material-symbols-outlined" aria-hidden="true">
            cloud_off
          </span>

          <h2>We couldn't load your profile.</h2>

          <p>
            Something interrupted the request. Your session is still
            active, so try again in a moment.
          </p>

          <div className="profile-state-actions">
            <button
              type="button"
              className="profile-button"
              onClick={refetch}
            >
              Try again
            </button>

            <Link
              className="profile-button profile-button--ghost"
              to="/products"
            >
              Browse the catalogue
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const hasOrders = profile.orders.length > 0;

  return (
    <div className="profile-page">
      <ProfileHero />

      <p className="profile-meta">
        <span className="profile-meta-item">
          <span className="material-symbols-outlined" aria-hidden="true">
            verified_user
          </span>

          {formatRole(profile.role)}
        </span>

        <span className="profile-meta-item">
          <span className="material-symbols-outlined" aria-hidden="true">
            receipt_long
          </span>

          {profile.orders.length}{" "}
          {profile.orders.length === 1 ? "order" : "orders"}
        </span>

        <span className="profile-meta-item">
          <span className="material-symbols-outlined" aria-hidden="true">
            location_on
          </span>

          {profile.location}
        </span>
      </p>

      <ProfileLayout
        sidebar={<ProfileSidebar profile={profile} />}
      >
        {/* PERSONAL INFO */}
        <ProfileSection id="account-info">
          <ProfileHeader
            badge="Identity details"
            title="Personal information"
            action="Edit profile"
          />

          <dl className="profile-info-grid">
            <InfoCard
              label="Full name"
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
          </dl>
        </ProfileSection>

        {/* ORDERS */}
        <ProfileSection id="orders">
          <ProfileHeader
            badge="Order archive"
            title="Recent orders"
            action={hasOrders ? "View all orders" : undefined}
            actionTo={hasOrders ? "/profile/orders" : undefined}
          />

          {!hasOrders ? (
            <div className="profile-empty">
              <span className="material-symbols-outlined" aria-hidden="true">
                receipt_long
              </span>

              <h3>No orders yet.</h3>

              <p>
                Once you complete a checkout, your orders will appear
                here with their status and totals.
              </p>

              <Link className="profile-button" to="/products">
                Browse the catalogue
                <span
                  className="material-symbols-outlined"
                  aria-hidden="true"
                >
                  arrow_forward
                </span>
              </Link>
            </div>
          ) : (
            <>
              <div className="profile-orders">
                {profile.orders
                  .slice(0, VISIBLE_ORDERS)
                  .map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                    />
                  ))}
              </div>

              {profile.orders.length > VISIBLE_ORDERS && (
                <p className="profile-orders-note">
                  Showing {VISIBLE_ORDERS} of {profile.orders.length}{" "}
                  orders
                </p>
              )}
            </>
          )}
        </ProfileSection>

        {/* SECURITY + PREFERENCES */}
        <div className="profile-split">
          <ProfileSection id="security">
            <ProfileHeader
              badge="Protection"
              title="Security"
            />

            <div className="profile-rows">
              <PreferenceToggle
                title="2-factor authentication"
                description="An extra step whenever you sign in."
                checked={profile.preferences.twoFactorAuth}
              />
            </div>
          </ProfileSection>

          <ProfileSection id="preferences">
            <ProfileHeader
              badge="Customization"
              title="Preferences"
            />

            <div className="profile-rows">
              <PreferenceToggle
                title="Newsletter"
                description="Weekly drops and studio notes."
                checked={profile.preferences.newsletter}
              />

              <PreferenceToggle
                title="Push notifications"
                description="Order updates as they happen."
                checked={profile.preferences.pushNotifications}
              />
            </div>
          </ProfileSection>
        </div>

        {/* DANGER ZONE */}
        <ProfileSection id="danger" tone="danger">
          <div className="profile-danger">
            <div>
              <h2>Danger zone</h2>

              <p>
                Deleting your account is permanent and cannot be undone.
              </p>
            </div>

            <button
              type="button"
              className="profile-button profile-button--danger"
            >
              Delete account
            </button>
          </div>
        </ProfileSection>
      </ProfileLayout>
    </div>
  );
};

import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import { useAuth } from "../../../auth/context/useAuth"

import { AUTH_MESSAGES, AUTH_ROUTES } from "../../../auth/constants/auth.constants"

import "./ProfileSIdebar.css"

import userImage from "../../../../assets/images/user/user-1.png"

export const ProfileSidebar = () => {

  const navigate = useNavigate()

  const {
    user,
    logout
  } = useAuth()

  const scrollToSection = (
    sectionId: string
  ) => {

    const element =
      document.getElementById(sectionId)

    if (!element) return

    element.scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  }

  const handleLogout = () => {

    logout()

    toast.success(AUTH_MESSAGES.LOGOUT_SUCCESS)

    navigate(AUTH_ROUTES.LOGIN, {
      replace: true
    })
  }

  return (
    <div className="profile-sidebar-container">

      <div className="profile-sidebar-user">

        <div className="profile-sidebar-avatar-wrapper">

          <img
            src={userImage}
            alt={user?.firstName}
            className="profile-sidebar-avatar"
          />

          <button className="profile-sidebar-edit-btn">
            ✎
          </button>

        </div>

        <div>
          <h2>
            {user?.firstName} {user?.lastName}
          </h2>

          <p>
            Customer
          </p>
        </div>

      </div>

      <nav className="profile-sidebar-nav">

        <button 
          className="active"
          onClick={() => 
            scrollToSection("account-info")
          }
        >
          Account Info
        </button>

        <button
          className="active"
          onClick={() => 
            scrollToSection("orders")
          }
        >
          Orders
        </button>

        <button
          className="active"
          onClick={() => 
            scrollToSection("security")
          }
        >
          Security
        </button>

        <button
          className="active"
          onClick={() => 
            scrollToSection("preferences")
          }
        >
          Preferences
        </button>

      </nav>

      <button
        className="profile-sidebar-logout"
        onClick={handleLogout}
      >
        Logout
      </button>

    </div>
  )
}
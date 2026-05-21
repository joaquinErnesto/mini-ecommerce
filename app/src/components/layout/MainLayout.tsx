import { useEffect, useState } from "react"
import { Outlet, Link } from "react-router-dom"
import { useCart } from "../../features/cart/context/useCart"
import { useNavigate } from "react-router-dom"
import "./MainLayout.css"
import { useAuth } from "../../features/auth/context/useAuth"

import userImage from "../../assets/images/user/user-1.png"

export const MainLayout = () => {
    const { items } = useCart()
    const navigate = useNavigate()
    const { isAuthenticated, user, logout } = useAuth()

    const totalItems = items.reduce(
        (acc, item) => acc + item.quantity, 0
    )

    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    return (
        <div className="container">
            
            {/* Navbar */}
            <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
                <div className="navbar-content">

                    {/* Logo / Brand */}
                    <Link to="/" className="logo">
                        Mini E-Commerce
                    </Link>

                    {/* Navigation */}
                    <nav className="nav-links">
                        <Link 
                            to="/"
                        >
                            Home
                        </Link>
                        
                        <Link 
                            to="/products"
                        >
                            Products
                        </Link>
                        
                        <Link 
                            to="/cart" 
                            className="cart-link"
                        >
                            <span>
                                Cart
                            </span>

                            <div
                                className="cart-icon-container"
                                onClick={() => navigate("/cart")}
                            >
                                <span 
                                    className="material-symbols-outlined"
                                    style={{
                                        height: "100%"
                                    }}
                                >
                                    shopping_cart
                                </span>

                                {totalItems > 0 && (
                                    <span
                                        className="cart-badge"
                                    >
                                        ({totalItems})
                                    </span>
                                )}
                            </div>
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <div className="navbar-user">
                                    <img 
                                        src={
                                            user?.image || userImage
                                        } 
                                        alt={user?.firstName} 
                                        className="navbar-avatar"
                                    />

                                    <Link to="/profile">
                                        {user?.firstName}
                                    </Link>
                                </div>

                                <button
                                    className="logout-button"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>  
                            </>
                        ) : (
                            <Link to="/login">
                                Login
                            </Link>
                        )}
                    </nav>

                </div>
            </header>

            {/* Main */}
            <main>
                <div>
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">

                    <p>
                        © {new Date().getFullYear()} Mini E-Commerce
                    </p>

                    <div className="footer-links">
                        <Link to="/privacy">
                            Privacy
                        </Link>
                        
                        <Link to="/terms">
                            Terms
                        </Link>

                        <Link to="/contact">
                            Contact
                        </Link>

                        <Link to="/about">
                            About
                        </Link>
                    </div>

                </div>
            </footer>

        </div>
    )
}
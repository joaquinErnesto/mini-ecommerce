import { Suspense, useEffect, useRef, useState } from "react"
import {
    Link,
    NavLink,
    Outlet,
    useLocation,
    useNavigate,
} from "react-router-dom"

import { useCart } from "../../cart/context/useCart"
import { useAuth } from "../../auth/context/useAuth"

import { RouteLoader } from "../../../components/RouteLoader/RouteLoader"

import "./MainLayout.css"

const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link${isActive ? " is-active" : ""}`

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-mobile-link${isActive ? " is-active" : ""}`

export const MainLayout = () => {
    const { items } = useCart()
    const { isAuthenticated, user, logout } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()

    const headerRef = useRef<HTMLElement | null>(null)

    const [scrolled, setScrolled] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const totalItems = items.reduce(
        (acc, item) => acc + item.quantity,
        0
    )

    const userInitial = user
        ? (user.firstName || user.username || "A").charAt(0).toUpperCase()
        : ""

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }

        handleScroll()
        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        setUserMenuOpen(false)
        setMobileMenuOpen(false)
    }, [location.pathname])

    useEffect(() => {
        if (!userMenuOpen && !mobileMenuOpen) return

        const handlePointerDown = (event: MouseEvent) => {
            const target = event.target as Node

            if (!headerRef.current?.contains(target)) {
                setUserMenuOpen(false)
                setMobileMenuOpen(false)
            }
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setUserMenuOpen(false)
                setMobileMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", handlePointerDown)
        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("mousedown", handlePointerDown)
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [userMenuOpen, mobileMenuOpen])

    useEffect(() => {
        if (!mobileMenuOpen) return

        const previousOverflow = document.body.style.overflow

        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = previousOverflow
        }
    }, [mobileMenuOpen])

    const handleLogout = () => {
        setUserMenuOpen(false)
        setMobileMenuOpen(false)
        logout()
        navigate("/")
    }

    const scrollToTop = () => {
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches

        window.scrollTo({
            top: 0,
            behavior: reducedMotion ? "auto" : "smooth",
        })
    }

    const closeMenus = () => {
        setUserMenuOpen(false)
        setMobileMenuOpen(false)
    }

    return (
        <div className="container">
            <a className="skip-link" href="#main-content">
                Skip to content
            </a>

            <header
                ref={headerRef}
                className={`navbar ${scrolled ? "scrolled" : ""}`}
            >
                <div className="navbar-content">
                    <Link className="brand" to="/" onClick={closeMenus}>
                        <span className="brand-mark" aria-hidden="true">
                            M
                        </span>
                        <span className="brand-name">Mini E-Commerce</span>
                    </Link>

                    <nav className="nav-primary" aria-label="Primary navigation">
                        <NavLink to="/" end className={desktopLinkClass}>
                            Home
                        </NavLink>
                        <NavLink to="/products" className={desktopLinkClass}>
                            Shop
                        </NavLink>
                        <NavLink to="/about" className={desktopLinkClass}>
                            About
                        </NavLink>
                    </nav>

                    <div className="nav-actions">
                        <Link
                            className="nav-cart"
                            to="/cart"
                            aria-label={`Cart, ${totalItems} ${
                                totalItems === 1 ? "item" : "items"
                            }`}
                            onClick={closeMenus}
                        >
                            <span
                                className="material-symbols-outlined nav-cart-icon"
                                aria-hidden="true"
                            >
                                shopping_bag
                            </span>
                            <span className="nav-cart-label">Cart</span>
                            {totalItems > 0 ? (
                                <span className="nav-cart-count">
                                    {totalItems}
                                </span>
                            ) : null}
                        </Link>

                        {isAuthenticated ? (
                            <div className="nav-user">
                                <button
                                    type="button"
                                    className="nav-user-button"
                                    onClick={() => {
                                        setUserMenuOpen((open) => !open)
                                        setMobileMenuOpen(false)
                                    }}
                                    aria-haspopup="menu"
                                    aria-expanded={userMenuOpen}
                                >
                                    <span className="nav-avatar" aria-hidden="true">
                                        {userInitial}
                                    </span>
                                    <span className="nav-user-name">
                                        {user?.firstName ?? "Account"}
                                    </span>
                                    <span
                                        className="material-symbols-outlined nav-chevron"
                                        aria-hidden="true"
                                    >
                                        expand_more
                                    </span>
                                </button>

                                {userMenuOpen ? (
                                    <div className="nav-user-menu" role="menu">
                                        <div className="nav-user-menu-head">
                                            <span
                                                className="nav-avatar"
                                                aria-hidden="true"
                                            >
                                                {userInitial}
                                            </span>
                                            <div>
                                                <strong>
                                                    {user?.firstName}{" "}
                                                    {user?.lastName}
                                                </strong>
                                                <span>{user?.email}</span>
                                            </div>
                                        </div>

                                        <Link
                                            to="/profile"
                                            role="menuitem"
                                            onClick={closeMenus}
                                        >
                                            <span
                                                className="material-symbols-outlined"
                                                aria-hidden="true"
                                            >
                                                person
                                            </span>
                                            Profile
                                        </Link>

                                        <Link
                                            to="/profile/orders"
                                            role="menuitem"
                                            onClick={closeMenus}
                                        >
                                            <span
                                                className="material-symbols-outlined"
                                                aria-hidden="true"
                                            >
                                                receipt_long
                                            </span>
                                            Orders
                                        </Link>

                                        <span className="nav-user-menu-divider" />

                                        <button
                                            type="button"
                                            role="menuitem"
                                            className="nav-user-menu-logout"
                                            onClick={handleLogout}
                                        >
                                            <span
                                                className="material-symbols-outlined"
                                                aria-hidden="true"
                                            >
                                                logout
                                            </span>
                                            Log out
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        ) : (
                            <Link
                                className="nav-signin"
                                to="/login"
                                onClick={closeMenus}
                            >
                                <span
                                    className="material-symbols-outlined"
                                    aria-hidden="true"
                                >
                                    login
                                </span>
                                Sign in
                            </Link>
                        )}

                        <button
                            type="button"
                            className="nav-menu-button"
                            onClick={() => {
                                setMobileMenuOpen((open) => !open)
                                setUserMenuOpen(false)
                            }}
                            aria-label={
                                mobileMenuOpen ? "Close menu" : "Open menu"
                            }
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-navigation"
                        >
                            <span
                                className="material-symbols-outlined"
                                aria-hidden="true"
                            >
                                {mobileMenuOpen ? "close" : "menu"}
                            </span>
                        </button>
                    </div>
                </div>

                {mobileMenuOpen ? (
                    <div className="nav-mobile" id="mobile-navigation">
                        <nav
                            className="nav-mobile-links"
                            aria-label="Mobile navigation"
                        >
                            <NavLink
                                to="/"
                                end
                                className={mobileLinkClass}
                                onClick={closeMenus}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/products"
                                className={mobileLinkClass}
                                onClick={closeMenus}
                            >
                                Shop
                            </NavLink>
                            <NavLink
                                to="/about"
                                className={mobileLinkClass}
                                onClick={closeMenus}
                            >
                                About
                            </NavLink>
                        </nav>

                        <div className="nav-mobile-actions">
                            <Link
                                className="nav-mobile-cart"
                                to="/cart"
                                onClick={closeMenus}
                            >
                                <span
                                    className="material-symbols-outlined"
                                    aria-hidden="true"
                                >
                                    shopping_bag
                                </span>
                                Your bag
                                {totalItems > 0 ? (
                                    <span className="nav-mobile-cart-count">
                                        {totalItems}
                                    </span>
                                ) : null}
                            </Link>

                            {isAuthenticated ? (
                                <div className="nav-mobile-account">
                                    <div className="nav-mobile-user">
                                        <span
                                            className="nav-avatar"
                                            aria-hidden="true"
                                        >
                                            {userInitial}
                                        </span>
                                        <div>
                                            <strong>
                                                {user?.firstName}{" "}
                                                {user?.lastName}
                                            </strong>
                                            <span>{user?.email}</span>
                                        </div>
                                    </div>

                                    <Link
                                        className="nav-mobile-account-link"
                                        to="/profile"
                                        onClick={closeMenus}
                                    >
                                        <span
                                            className="material-symbols-outlined"
                                            aria-hidden="true"
                                        >
                                            person
                                        </span>
                                        Profile
                                    </Link>

                                    <Link
                                        className="nav-mobile-account-link"
                                        to="/profile/orders"
                                        onClick={closeMenus}
                                    >
                                        <span
                                            className="material-symbols-outlined"
                                            aria-hidden="true"
                                        >
                                            receipt_long
                                        </span>
                                        Orders
                                    </Link>

                                    <button
                                        type="button"
                                        className="nav-mobile-logout"
                                        onClick={handleLogout}
                                    >
                                        <span
                                            className="material-symbols-outlined"
                                            aria-hidden="true"
                                        >
                                            logout
                                        </span>
                                        Log out
                                    </button>
                                </div>
                            ) : (
                                <div className="nav-mobile-auth">
                                    <Link
                                        className="nav-mobile-signin"
                                        to="/login"
                                        onClick={closeMenus}
                                    >
                                        Sign in
                                    </Link>
                                    <Link
                                        className="nav-mobile-signup"
                                        to="/signup"
                                        onClick={closeMenus}
                                    >
                                        Create account
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                ) : null}
            </header>

            {mobileMenuOpen ? (
                <div
                    className="nav-mobile-backdrop"
                    onClick={closeMenus}
                    aria-hidden="true"
                />
            ) : null}

            <main id="main-content">
                <div>
                    <Suspense fallback={<RouteLoader />}>
                        <Outlet />
                    </Suspense>
                </div>
            </main>

            <footer className="site-footer">
                <div className="footer-inner">
                    <div className="footer-brand">
                        <Link
                            className="footer-brand-link"
                            to="/"
                            onClick={scrollToTop}
                        >
                            <span
                                className="footer-mark"
                                aria-hidden="true"
                            >
                                M
                            </span>
                            Mini E-Commerce
                        </Link>

                        <p>
                            A short list of better things. Curated for the
                            considered home.
                        </p>
                    </div>

                    <div className="footer-links">
                        <nav className="footer-column" aria-label="Shop links">
                            <Link to="/products">The catalogue</Link>
                            <Link to="/cart">Your bag</Link>
                        </nav>

                        <nav className="footer-column" aria-label="Company links">
                            <Link to="/about">About</Link>
                            <Link to="/contact">Contact</Link>
                        </nav>

                        <nav className="footer-column" aria-label="Legal links">
                            <Link to="/privacy">Privacy</Link>
                            <Link to="/terms">Terms</Link>
                        </nav>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        © {new Date().getFullYear()} Mini E-Commerce
                    </p>

                    <div className="footer-bottom-actions">
                        <span className="footer-secure">
                            <span
                                className="material-symbols-outlined"
                                aria-hidden="true"
                            >
                                lock
                            </span>
                            Secure checkout
                        </span>

                        <button
                            type="button"
                            className="footer-top"
                            onClick={scrollToTop}
                        >
                            Back to top
                            <span
                                className="material-symbols-outlined"
                                aria-hidden="true"
                            >
                                arrow_upward
                            </span>
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    )
}

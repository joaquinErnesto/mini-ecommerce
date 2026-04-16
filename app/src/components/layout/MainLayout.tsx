import { Outlet, Link } from "react-router-dom"
import { useCart } from "../../features/cart/context/useCart"
import { useNavigate } from "react-router-dom"
import "./MainLayout.css"

export const MainLayout = () => {
    const { items } = useCart()
    const navigate = useNavigate()
    const totalItems = items.reduce(
        (acc, item) => acc + item.quantity, 0
    )

    const borderStyle = {
        border: "1px solid white"
    }

    return (
        <div className="container">
            
            {/* Navbar */}
            <header className="navbar">
                <div className="navbar-content">

                    {/* Logo / Brand */}
                    <Link to="/" className="logo">
                        Mini E-Commerce
                    </Link>

                    {/* Navigation */}
                    <nav className="nav-links">
                        <Link 
                            to="/"
                            style={borderStyle}
                        >
                            Home
                        </Link>
                        
                        <Link 
                            to="/products"
                            style={borderStyle}
                        >
                            Products
                        </Link>
                        
                        <Link 
                            to="/cart" 
                            className="cart-link"
                            style={{
                                border: "1px solid white"
                            }}
                        >
                            <span>
                                Cart
                            </span>

                            <div
                                className="cart-icon-container"
                                onClick={() => navigate("/cart")}
                                style={{
                                    border: "1px solid red"
                                }}
                            >
                                <span 
                                    className="material-symbols-outlined"
                                    style={{
                                        border: "1px solid blue",
                                        height: "100%"
                                    }}
                                >
                                    shopping_cart
                                </span>

                                {totalItems > 0 && (
                                    <span
                                        className="cart-badge"
                                        style={{
                                            border: "1px solid yellow"
                                        }}
                                    >
                                        ({totalItems})
                                    </span>
                                )}
                            </div>
                        </Link>

                        <Link 
                            to="/profile"
                            style={borderStyle}
                        >
                            Profile
                        </Link>
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
                        <a href="/privacy">Privacy</a>
                        <a href="/terms">Terms</a>
                        <a href="/contact">Contact</a>
                        <a href="/about">About</a>
                    </div>

                </div>
            </footer>

        </div>
    )
}
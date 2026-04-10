import { Outlet, Link } from "react-router-dom"
import "./MainLayout.css"

export const MainLayout = () => {
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
                        <Link to="/">
                            Home
                        </Link>
                        
                        <Link to="/products">
                            Products
                        </Link>
                        
                        <Link to="/cart">
                            Cart
                        </Link>

                        <Link to="/profile">
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
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                        <a href="#">Contact</a>
                        <a href="#">About</a>
                    </div>

                </div>
            </footer>

        </div>
    )
}
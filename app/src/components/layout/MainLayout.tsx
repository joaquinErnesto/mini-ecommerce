import { Outlet } from "react-router-dom"
import "./MainLayout.css"

export const MainLayout = () => {
    return (
        <div className="container">
            {/* Navbar */}
            <header>
                {/* Navbar here */}
            </header>

            {/* Main */}
            <main>
                <div>
                    <Outlet /> {/* 👈 THIS is where pages render */}
                </div>
            </main>

            {/* Footer */}
            <footer>
                {/* Footer */}
            </footer>
        </div>
    )
}
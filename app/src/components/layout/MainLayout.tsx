type Props = {
    children: React.ReactNode
}

export const MainLayout = ({ children }: Props) => {
    return (
        <div className="container">
            {/* Navbar*/}

            <header>
                {/* later: Navbar component */}
            </header>

            {/* Main */}
            <main>
                <div>
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer>
                {/* later */}
            </footer>
        </div>
    )
}
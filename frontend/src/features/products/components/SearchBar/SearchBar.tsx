import "./SearchBar.css"

interface Props {
    value: string
    onChange: (value: string) => void
}

export const SearchBar = ({ value, onChange }: Props) => {
    return (
        <div className="search-bar">
            <span
                className="material-symbols-outlined search-bar-icon"
                aria-hidden="true"
            >
                search
            </span>

            <input
                type="search"
                aria-label="Search products"
                placeholder="Search by name or description"
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />

            {value ? (
                <button
                    type="button"
                    className="search-bar-clear"
                    onClick={() => onChange("")}
                    aria-label="Clear search"
                >
                    <span
                        className="material-symbols-outlined"
                        aria-hidden="true"
                    >
                        close
                    </span>
                </button>
            ) : null}
        </div>
    )
}

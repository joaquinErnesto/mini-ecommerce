import "./SearchBar.css"

interface Props {
  value: string
  onChange: (value: string) => void
}

export const SearchBar = ({
  value,
  onChange
}: Props) => {

  return (
    <div className="search-bar">

      <span className="material-symbols-outlined">
        search
      </span>

      <input
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
      />

    </div>
  )
}
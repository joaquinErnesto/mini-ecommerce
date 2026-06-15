import "./AuthButton.css"

interface Props {
  text: string
  loading?: boolean
}

export const AuthButton = ({
  text,
  loading
}: Props) => {

  return (
    <button
      type="submit"
      className="auth-button"
    >
      {loading ? "Loading..." : text}
    </button>
  )
}
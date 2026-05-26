import "./AuthLoader.css"

interface Props {
  text?: string
}

export const AuthLoader = ({
  text = "Authenticating..."
}: Props) => {

  return (
    <div className="auth-loader">

      <div className="auth-loader-content">

        <div className="auth-loader-spinner" />

        <h2>
          ELECTRIC NOIR
        </h2>

        <p>
          {text}
        </p>

      </div>

    </div>
  )
}
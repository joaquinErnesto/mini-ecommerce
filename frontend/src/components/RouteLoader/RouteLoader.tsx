import "./RouteLoader.css"

interface Props {
  text?: string
}

export const RouteLoader = ({
  text = "Loading"
}: Props) => {
  return (
    <div
      className="route-loader"
      role="status"
      aria-live="polite"
    >
      <span
        className="route-loader-spinner"
        aria-hidden="true"
      />

      <span className="route-loader-text">
        {text}
      </span>
    </div>
  )
}

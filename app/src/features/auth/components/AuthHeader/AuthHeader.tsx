import "./AuthHeader.css";

interface Props {
  title: string;
  subtitle: string;
}

export const AuthHeader = ({
  title,
  subtitle
}: Props) => {
  return (
    <div className="auth-header">
      <h1>{title}</h1>

      <p>{subtitle}</p>
    </div>
  );
};
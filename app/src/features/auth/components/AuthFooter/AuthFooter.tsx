import { Link } from "react-router-dom";
import "./AuthFooter.css";

interface Props {
  text: string;
  linkText: string;
  to: string;
}

export const AuthFooter = ({
  text,
  linkText,
  to
}: Props) => {
  return (
    <div className="auth-footer">
      <p>
        {text}

        <Link to={to}>
          {linkText}
        </Link>
      </p>
    </div>
  );
};
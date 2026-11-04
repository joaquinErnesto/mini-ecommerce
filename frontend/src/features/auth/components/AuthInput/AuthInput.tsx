import "./AuthInput.css";

interface Props {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  icon: string;

  value: string;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AuthInput = ({
  label,
  name,
  type = "text",
  placeholder,
  icon,
  value,
  onChange
}: Props) => {
  return (
    <div className="auth-input-wrapper">

      <label>
        {label}
      </label>

      <div className="auth-input-container">

        <span className="material-symbols-outlined auth-input-icon">
          {icon}
        </span>

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
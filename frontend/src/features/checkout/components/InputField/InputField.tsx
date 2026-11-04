import "./InputField.css";

interface Props {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  full?: boolean;
  error?: string;
  inputMode?: React.HtmlHTMLAttributes<HTMLInputElement>["inputMode"]
}

export const InputField = ({ 
  label, 
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  full,
  error,
  inputMode
}: Props) => {
  return (
    <div className={`input-field ${full ? "full" : ""} ${error ? "error" : ""}`}>
      <label htmlFor={name}>{label}</label>
      <input 
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder} 
        inputMode={inputMode}
      />

      {error && <span className="error">{error}</span>}
    </div>
  );
};
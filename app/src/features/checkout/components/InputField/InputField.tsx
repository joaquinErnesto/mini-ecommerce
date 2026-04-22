import "./InputField.css";

interface Props {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  full?: boolean;
  error?: string
}

export const InputField = ({ 
  label, 
  name,
  value,
  onChange,
  placeholder,
  full,
  error
}: Props) => {
  return (
    <div className={`input-field ${full ? "full" : ""} ${error ? "error" : ""}`}>
      <label htmlFor={name}>{label}</label>
      <input 
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder} 
      />

      {error && <span className="error">{error}</span>}
    </div>
  );
};
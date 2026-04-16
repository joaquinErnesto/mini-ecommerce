import "./InputField.css";

interface Props {
  label: string;
  placeholder?: string;
  full?: boolean;
}

export const InputField = ({ label, placeholder, full }: Props) => {
  return (
    <div className={`input-field ${full ? "full" : ""}`}>
      <label>{label}</label>
      <input placeholder={placeholder} />
    </div>
  );
};
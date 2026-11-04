import "./PaymentOption.css";

interface Props {
  label: string;
  selected?: boolean;
  onClick?: () => void
}

export const PaymentOption = ({ label, selected, onClick }: Props) => {
  return (
    <button 
      className={`payment-option ${selected ? "active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
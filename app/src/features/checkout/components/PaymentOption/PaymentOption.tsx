import "./PaymentOption.css";

interface Props {
  label: string;
  selected?: boolean;
}

export const PaymentOption = ({ label, selected }: Props) => {
  return (
    <button className={`payment-option ${selected ? "active" : ""}`}>
      {label}
    </button>
  );
};
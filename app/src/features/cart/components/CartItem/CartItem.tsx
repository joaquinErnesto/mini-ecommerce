import React from "react";
import "./CartItem.css";

interface Props {
  title: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export const CartItem: React.FC<Props> = ({
  title,
  description,
  price,
  quantity,
  image,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <div className="cart-item">
      <img src={image} alt={title} className="cart-item-image" />

      <div className="cart-item-info">
        <h3>{title}</h3>
        <p>{description}</p>

        <div className="cart-item-qty">
          <button onClick={onDecrease}>-</button>
          <span>{quantity}</span>
          <button onClick={onIncrease}>+</button>
        </div>
      </div>

      <div className="cart-item-actions">
        <span className="price">${price.toFixed(2)}</span>
        <button className="remove" onClick={onRemove}>
          Remove
        </button>
      </div>
    </div>
  );
};
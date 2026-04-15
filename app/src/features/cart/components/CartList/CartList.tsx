import React from "react";
import { CartItem } from "../CartItem/CartItem";
import "./CartList.css";

interface Item {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

interface Props {
  items: Item[];
  onUpdate: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

export const CartList: React.FC<Props> = ({ items, onUpdate, onRemove }) => {
  return (
    <div className="cart-list">
      {items.map((item) => (
        <CartItem
          key={item.id}
          {...item}
          onIncrease={() => onUpdate(item.id, 1)}
          onDecrease={() => onUpdate(item.id, -1)}
          onRemove={() => onRemove(item.id)}
        />
      ))}
    </div>
  );
};
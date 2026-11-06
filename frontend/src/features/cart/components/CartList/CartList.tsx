import { CartItem } from "../CartItem/CartItem"

import type { CartItem as CartItemData } from "../../types/cart.types"

import "./CartList.css"

interface Props {
  items: CartItemData[]
  onUpdate: (id: number, delta: number) => void
  onRemove: (id: number) => void
}

export const CartList = ({ items, onUpdate, onRemove }: Props) => {
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
  )
}

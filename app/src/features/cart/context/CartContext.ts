import { createContext } from "react";
import type { CartItem } from "../types/cart.types";

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  updateQuantity: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
}

export const CartContext = createContext<CartContextType | null>(null);
import { createContext } from "react";
import type { CartItem } from "../types/cart.types";
import type { Product } from "../../products/types/products.types";

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
}

export const CartContext = createContext<CartContextType | null>(null);
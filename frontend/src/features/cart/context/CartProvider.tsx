import React, { useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import type { CartItem } from "../types/cart.types";
import type { Product } from "../../products/types/products.types";
import toast from "react-hot-toast";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem("cart")

      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addToCart = (product: Product) => {
    const existing = items.find((item) => item.id === product.id)

    setItems((prev) => {
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          image: product.image,
          quantity: 1
        }
      ]
    })

    toast.success(`${product.title} added to cart`)
  }

  const updateQuantity = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    const removedItem = items.find((item) => item.id === id)

    setItems((prev) => prev.filter((item) => item.id !== id))

    if (removedItem) {
      toast.success(`${removedItem.title} removed from cart`)
    }
  };

  const clearCart = () => {
    setItems([])
    localStorage.removeItem("cart") // ✅ ensure cleanup
    toast.success("Cart cleared")
  }

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      updateQuantity, 
      removeItem, 
      clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
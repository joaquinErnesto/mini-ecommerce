import { useEffect, useState } from "react";
import { getProducts } from "../services/products.api";
import type { Product } from "../types/products.types";

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const gettingProducts = async () => {
        try {
            setLoading(true)

            const data = await getProducts()
            setProducts(data)
            
            setError(null)
        } catch(error) {
            setError("Error getting the products")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        gettingProducts()
    }, [])

    return {
        products,
        loading,
        error,
        refetch: gettingProducts
    }
}
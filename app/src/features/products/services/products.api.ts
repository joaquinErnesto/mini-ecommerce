import { apiClient } from "../../../services/apiClient";
import type { Product } from "../types/products.types";

// Get all products
export const getProducts = async (): Promise<Product[]> => {
    try {
        console.log("Calling API...")

        const response = await apiClient.get("/products")

        console.log("API RESPONSE:", response)

        return response.data
    } catch(error) {
        console.error("Error fetching products: ", error)

        throw error
    }
}

// Get product by ID
export const getProductById = async (id: number) : Promise<Product> => {
    try {
        const response = await apiClient.get(`/products/${id}`)

        return response.data
    } catch(error) {
        console.error(`Error fetching product with id ${id}: `, error)

        throw error
    }
}
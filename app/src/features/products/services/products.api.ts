import { apiClient } from "../../../services/apiClient";
import type { Product } from "../types/products.types";

// Get all products
export const getProducts = async (): Promise<Product[]> => {
    try {
        console.log("Calling API...")

        const response = await apiClient.get("/products")

        console.log("API RESPONSE:", response.data)

        return response.data.products.map((p: any) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            price: p.price,
            image: p.thumbnail
        }))
    } catch(error) {
        console.error("Error fetching products: ", error)

        throw error
    }
}

// Get product by ID
export const getProductById = async (id: number) : Promise<Product> => {
    try {
        const response = await apiClient.get(`/products/${id}`)

        const p = response.data

        return {
            id: p.id,
            title: p.title,
            description: p.description,
            price: p.price,
            image: p.thumbnail,

            discountPercentage: p.discountPercentage,
            rating: p.rating,
            stock: p.stock,
            brand: p.brand,
            weight: p.weight,
            warranty: p.warrantyInformation,
            shippingInformation: p.shippingInformation,
            availabilityStatus: p.availabilityStatus
        }
    } catch(error) {
        console.error(`Error fetching product with id ${id}: `, error)

        throw error
    }
}
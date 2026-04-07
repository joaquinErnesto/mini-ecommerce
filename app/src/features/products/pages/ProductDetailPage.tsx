import "./ProductDetailPage.css"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getProductById } from "../services/products.api"
import type { Product } from "../types/products.types"

export const ProductDetailPage = () => {
    const { id } = useParams()
    
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if(!id) return

                const data = await getProductById(Number(id))
                setProduct(data)
            } catch (err) {
                setError("Error loading product")
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [id])

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    if (!product) return <p>Product not found</p>

    return (
        <div className="product-detail-page">
            <div className="product-detail-card">
                
                {/* Image */}
                <div className="product-detail-image-container">
                    <img src={product.image} alt={product.title} />
                </div>

                {/* Info */}
                <div className="product-detail-info">
                    <h1>{product.title}</h1>

                    <p className="price">${product.price}</p>

                    <p className="description">{product.description}</p>

                    <button>Add to Cart</button>
                </div>

            </div>
        </div>
    )
}
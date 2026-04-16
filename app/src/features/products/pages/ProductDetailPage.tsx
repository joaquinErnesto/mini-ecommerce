import "./ProductDetailPage.css"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getProductById } from "../services/products.api"
import { useCart } from "../../cart/context/useCart"
import { useNavigate } from "react-router-dom"
import type { Product } from "../types/products.types"

export const ProductDetailPage = () => {
    const { id } = useParams()
    const { addToCart } = useCart()
    const navigate = useNavigate()
    
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

    const handleAddToCart = () => {
        addToCart(product)

        navigate("/cart")
    }

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

                    <p className="price"><span className="property-title">Price: </span>${product.price}</p>

                    <p className="property"><span>Description:</span> {product.description}</p>

                    <p className="property"><span>Discount Percentage:</span> {product.discountPercentage}</p>

                    <p className="property"><span>Rating:</span> {product.rating}</p>

                    <p className="property"><span>Stock:</span> {product.stock}</p>

                    <p className="property"><span>Brand:</span> {product.brand}</p>

                    <p className="property"><span>Weight:</span> {product.weight}</p>

                    <p className="property"><span>Warranty:</span> {product.warranty}</p>

                    <p className="property"><span>Shipping Information:</span> {product.shippingInformation}</p>

                    <p className="property"><span>Availability Status:</span> {product.availabilityStatus}</p>

                    <div className="button-container">
                        <button
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "rgba(80, 80, 80, 1)"
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "var(--gray-color)"
                            }}
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
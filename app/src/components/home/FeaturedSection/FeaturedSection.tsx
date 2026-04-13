import { useEffect, useState } from "react"
import { getProductById } from "../../../features/products/services/products.api"
import type { Product } from "../../../features/products/types/products.types"

export const FeaturedSection = () => {
    const [bigProduct, setBigProduct] = useState<Product | null>(null)
    const [smallProduct, setSmallProduct] = useState<Product | null>(null)
    const [wideProduct, setWideProduct] = useState<Product | null>(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const big = await getProductById(10)
                const small = await getProductById(8)
                const wide = await getProductById(6)

                setBigProduct(big)
                setSmallProduct(small)
                setWideProduct(wide)
            } catch (error) {
                console.error("Error loading featured products")
            }
        }

        fetchProducts()
    }, [])

    return (
        <section className="featured">
            <div className="featured-header">
                <div>
                    <h2>Featured Products</h2>
                    <p>Top picks for you</p>
                </div>

                <span>Collection 01</span>
            </div>

            <div className="featured-grid">
                {/* BIG */}
                {bigProduct && (
                    <div className="featured-big">
                        <img src={bigProduct.image} alt={bigProduct.title} />
                    </div>
                )}

                {/* SMALL */}
                {smallProduct && (
                    <div className="featured-small">
                        <img src={smallProduct.image} alt={smallProduct.title} />
                    </div>
                )}

                {/* WIDE */}
                {wideProduct && (
                    <div className="featured-wide">
                        <img src={wideProduct.image} alt={wideProduct.title} />
                    </div>
                )}    
            </div>
        </section>
    )
}
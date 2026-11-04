import { useCallback, useEffect, useRef, useState } from "react"

import { getProducts } from "../../../products/services/products.api"
import type { Product } from "../../../products/types/products.types"

const HERO_PRODUCT_ID = 7
const FEATURED_PRODUCT_IDS = [14, 10, 8, 6, 13]
const FEATURED_SLOTS = 5

interface HomeProductsState {
    heroProduct: Product | null
    featuredProducts: Product[]
    loading: boolean
    failed: boolean
    refetch: () => void
}

export const useHomeProducts = (): HomeProductsState => {
    const [heroProduct, setHeroProduct] = useState<Product | null>(null)
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const isMounted = useRef(true)

    useEffect(() => {
        isMounted.current = true

        return () => {
            isMounted.current = false
        }
    }, [])

    const load = useCallback(async () => {
        setLoading(true)
        setFailed(false)

        try {
            const catalogue = await getProducts()

            if (!isMounted.current) return

            const byId = new Map<number, Product>()

            for (const product of catalogue) {
                byId.set(product.id, product)
            }

            const hero = byId.get(HERO_PRODUCT_ID) ?? catalogue[0] ?? null

            const featured: Product[] = []
            const seen = new Set<number>()

            for (const id of FEATURED_PRODUCT_IDS) {
                if (id === hero?.id) continue

                const product = byId.get(id)

                if (!product) continue

                featured.push(product)
                seen.add(product.id)
            }

            for (const product of catalogue) {
                if (featured.length >= FEATURED_SLOTS) break
                if (product.id === hero?.id || seen.has(product.id)) continue

                featured.push(product)
                seen.add(product.id)
            }

            setHeroProduct(hero)
            setFeaturedProducts(featured.slice(0, FEATURED_SLOTS))
            setFailed(featured.length === 0)
        } catch (error) {
            if (!isMounted.current) return

            console.error("Error loading the home edit:", error)

            setHeroProduct(null)
            setFeaturedProducts([])
            setFailed(true)
        } finally {
            if (isMounted.current) setLoading(false)
        }
    }, [])

    useEffect(() => {
        void load()
    }, [load])

    const refetch = useCallback(() => {
        void load()
    }, [load])

    return {
        heroProduct,
        featuredProducts,
        loading,
        failed,
        refetch,
    }
}

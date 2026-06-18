import { useState } from "react";

import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { ProductCardSkeleton } from "../components/ProductCardSkeleton/ProductCardSkeleton";
import { SearchBar } from "../components/SearchBar/SearchBar";

import "./ProductsPage.css";

import { useCart } from "../../cart/context/useCart";

export const ProductsPage = () => {
    const [search, setSearch] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    
    const {
        products,
        loading,
        error,
        refetch
    } = useProducts();

    const categories = [
        "all",
        ...new Set(
            products.map(
                (product) => product.category
            )
        )
    ]

    const { addToCart } = useCart();

    const filteredProducts =
        products.filter((product) => {

            const matchesSearch =
                product.title
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

                ||

                product.description
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

            const matchesCategory =
                selectedCategory === "all"

                ||

                product.category ===
                selectedCategory

            return (
                matchesSearch &&
                matchesCategory
            )
        })

    // LOADING STATE
    if (loading) {
        return (
            <div className="products-page-container">
                <div>
                    <h1>Products</h1>

                    <div className="products-grid">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <ProductCardSkeleton key={index} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // ERROR STATE
    if (error) {
        return (
            <div className="products-page-container">
                <div className="products-state-container">
                    <h2>
                        Failed to load products
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        className="retry-button"
                        onClick={refetch}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // EMPTY STATE
    if (products.length === 0) {
        return (
            <div className="products-page-container">
                <div className="products-state-container">
                    <h2>
                        No products found
                    </h2>

                    <p>
                        There are currently no products available.
                    </p>

                    <button
                        className="retry-button"
                        onClick={refetch}
                    >
                        Refresh
                    </button>
                </div>
            </div>
        );
    }

    // SUCCESS STATE
    return (
        <div className="products-page-container">
            <div>
                <h1>
                    Products
                </h1>

                <SearchBar
                    value={search}
                    onChange={setSearch}
                />

                <p className="products-counter">
                    {filteredProducts.length}
                    {" "}
                    product(s) found
                </p>

                <div className="products-filters">

                    <select
                        value={selectedCategory}
                        onChange={(e) =>
                        setSelectedCategory(
                            e.target.value
                        )
                        }
                    >

                        {categories.map((category) => (
                        <option
                            key={category}
                            value={category}
                        >
                            {category
                                .replace( "-", " " )
                                .replace(
                                    /\b\w/g,
                                    (letter) =>
                                        letter.toUpperCase()
                                )
                            }
                        </option>
                        ))}

                    </select>

                    </div>

                {filteredProducts.length > 0 ? (
                    <div className="products-grid">

                    {filteredProducts.map((product) => (
                        <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={addToCart}
                        />
                    ))}

                    </div>

                ) : (

                    <div className="products-state-container">

                    <h2>
                        No matching products
                    </h2>

                    <p>
                        Try another search term.
                    </p>

                    </div>

                )}
            </div>
        </div>
    );
};
import { useState } from "react"
import { Link } from "react-router-dom"

import { useProducts } from "../hooks/useProducts"
import { ProductCard } from "../components/ProductCard/ProductCard"
import { ProductCardSkeleton } from "../components/ProductCardSkeleton/ProductCardSkeleton"
import { SearchBar } from "../components/SearchBar/SearchBar"

import { formatCategory } from "../utils/productFormat"

import { useCart } from "../../cart/context/useCart"

import "./ProductsPage.css"

type SortOption = "featured" | "price-asc" | "price-desc" | "rating"

const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
    { value: "featured", label: "Featured" },
    { value: "price-asc", label: "Price: low to high" },
    { value: "price-desc", label: "Price: high to low" },
    { value: "rating", label: "Top rated" },
]

const SKELETON_COUNT = 9

export const ProductsPage = () => {
    const [search, setSearch] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [sort, setSort] = useState<SortOption>("featured")

    const { products, loading, error, refetch } = useProducts()
    const { addToCart } = useCart()

    const categories = [
        "all",
        ...Array.from(
            new Set(products.map((product) => product.category))
        ).sort(),
    ]

    const normalizedSearch = search.trim().toLowerCase()

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            normalizedSearch.length === 0 ||
            product.title.toLowerCase().includes(normalizedSearch) ||
            product.description.toLowerCase().includes(normalizedSearch)

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory

        return matchesSearch && matchesCategory
    })

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sort) {
            case "price-asc":
                return a.price - b.price
            case "price-desc":
                return b.price - a.price
            case "rating":
                return (b.rating ?? 0) - (a.rating ?? 0)
            default:
                return 0
        }
    })

    const hasActiveFilters =
        normalizedSearch.length > 0 || selectedCategory !== "all"

    const clearFilters = () => {
        setSearch("")
        setSelectedCategory("all")
    }

    return (
        <div className="products-page">
            <header className="catalog-hero">
                <p className="catalog-kicker">
                    <span className="catalog-kicker-dot" aria-hidden="true" />
                    The full shop
                </p>

                <h1 className="catalog-title">
                    The catalogue
                    <span className="catalog-title-accent">.</span>
                </h1>

                <p className="catalog-lede">
                    Fragrance, furniture, and small everyday luxuries.
                    Search the edit or browse by category.
                </p>
            </header>

            {loading ? (
                <>
                    <p className="catalog-status" role="status">
                        Loading the catalogue…
                    </p>

                    <div className="catalog-grid">
                        {Array.from(
                            { length: SKELETON_COUNT },
                            (_, index) => (
                                <ProductCardSkeleton key={index} />
                            )
                        )}
                    </div>
                </>
            ) : error ? (
                <div className="catalog-state" role="alert">
                    <span
                        className="material-symbols-outlined"
                        aria-hidden="true"
                    >
                        cloud_off
                    </span>

                    <h2>The catalogue didn't load.</h2>

                    <p>
                        We couldn't reach the shop. Check your connection and
                        try again.
                    </p>

                    <div className="catalog-state-actions">
                        <button
                            type="button"
                            className="catalog-button"
                            onClick={refetch}
                        >
                            Try again
                        </button>

                        <Link
                            className="catalog-button catalog-button--ghost"
                            to="/"
                        >
                            Back home
                        </Link>
                    </div>
                </div>
            ) : products.length === 0 ? (
                <div className="catalog-state" role="status">
                    <span
                        className="material-symbols-outlined"
                        aria-hidden="true"
                    >
                        inventory_2
                    </span>

                    <h2>The shelves are empty.</h2>

                    <p>
                        There are no products available right now. Check back
                        shortly.
                    </p>

                    <div className="catalog-state-actions">
                        <button
                            type="button"
                            className="catalog-button"
                            onClick={refetch}
                        >
                            Refresh
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <section
                        className="catalog-toolbar"
                        aria-label="Find products"
                    >
                        <div className="catalog-toolbar-top">
                            <SearchBar value={search} onChange={setSearch} />

                            <label className="catalog-sort">
                                <span>Sort</span>

                                <span className="catalog-sort-control">
                                    <select
                                        value={sort}
                                        onChange={(event) =>
                                            setSort(
                                                event.target.value as SortOption
                                            )
                                        }
                                    >
                                        {SORT_OPTIONS.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>

                                    <span
                                        className="material-symbols-outlined"
                                        aria-hidden="true"
                                    >
                                        expand_more
                                    </span>
                                </span>
                            </label>
                        </div>

                        <div
                            className="catalog-pills"
                            role="group"
                            aria-label="Filter by category"
                        >
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    className="catalog-pill"
                                    aria-pressed={
                                        selectedCategory === category
                                    }
                                    onClick={() =>
                                        setSelectedCategory(category)
                                    }
                                >
                                    {category === "all"
                                        ? "All pieces"
                                        : formatCategory(category)}
                                </button>
                            ))}
                        </div>
                    </section>

                    <div className="catalog-results-head">
                        <p
                            className="catalog-results-count"
                            aria-live="polite"
                        >
                            {sortedProducts.length === products.length
                                ? `${products.length} pieces`
                                : `${sortedProducts.length} of ${products.length} pieces`}
                        </p>

                        {hasActiveFilters ? (
                            <button
                                type="button"
                                className="catalog-clear"
                                onClick={clearFilters}
                            >
                                Clear filters
                            </button>
                        ) : null}
                    </div>

                    {sortedProducts.length > 0 ? (
                        <div className="catalog-grid">
                            {sortedProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={addToCart}
                                />
                            ))}
                        </div>
                    ) : (
                        <div
                            className="catalog-state catalog-state--compact"
                            role="status"
                        >
                            <span
                                className="material-symbols-outlined"
                                aria-hidden="true"
                            >
                                search_off
                            </span>

                            <h2>Nothing matched that.</h2>

                            <p>
                                Try a different search or category. There are
                                {" "}
                                {products.length} pieces in the shop.
                            </p>

                            <div className="catalog-state-actions">
                                <button
                                    type="button"
                                    className="catalog-button"
                                    onClick={clearFilters}
                                >
                                    Clear filters
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

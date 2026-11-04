const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
})

export const formatPrice = (price: number): string =>
    currencyFormatter.format(price)

export const getOriginalPrice = (
    price: number,
    discountPercentage?: number
): number | null => {
    if (
        !discountPercentage ||
        discountPercentage <= 0 ||
        discountPercentage >= 100
    ) {
        return null
    }

    return price / (1 - discountPercentage / 100)
}

export const formatCategory = (category: string): string =>
    category
        .replace(/-/g, " ")
        .replace(/\b\w/g, (character) => character.toUpperCase())

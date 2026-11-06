import type { Review } from "./features/products/types/products.types"
import type { Comment } from "./features/products/types/comments.types"

export const mapReviewsToComments = (reviews: Review[]): Comment[] => {
    return reviews.map((review) => ({
        rating: review.rating,
        comment: review.comment,
        date: review.date,
        reviewerName: review.reviewerName,
        reviewerEmail: review.reviewerEmail,
    }))
}

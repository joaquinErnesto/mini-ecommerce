import type { Review } from "../types/products.types";
import type { Comment } from "../types/comments.types";

export const mapReviewsToComments = (reviews: Review[]): Comment[] => {
  return reviews.map((r, index) => ({
    id: `api-${index}`,
    productId: 0, // not needed for API ones
    author: r.reviewerName,
    content: r.comment,
    createdAt: r.date,
  }));
};
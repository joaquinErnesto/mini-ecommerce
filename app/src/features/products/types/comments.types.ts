export interface Comment {
  id: string;

  // Link to product
  productId: number;

  // User info
  author: string;
  content: string;

  // Metadata
  createdAt: string;

  // Optional (API compatibility + future features)
  rating?: number;
  email?: string;

  // Source control (VERY useful)
  source?: "api" | "local";
}
import type { Comment } from "./comments.types";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;

  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  weight?: number;
  warranty?: string;
  shippingInformation?: string;
  availabilityStatus?: string;

  reviews?: Comment[];
}
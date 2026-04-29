export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;

  reviews?: Review[]; // 👈 ADD THIS

  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  weight?: 4;
  warranty?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}
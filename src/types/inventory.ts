/** @format */

export interface Product {
  _id: string;
  name: string;
  category: { categoryName: string; id: string };
  manufacturer: string;
  manufactureDate: string; // or Date for Date object
  formulation: string;
  strength: string;
  reorderLevel: number;
  quantityInStock: number;
  expirationDate: string; // or Date for Date object
  description: string;
  barcode: string;
  isActive: boolean;
  key?: number;
  price: number;
  buyingPrice: number;
  quantity?: number;
}

export interface ProductCategory {
  id: string;
  categoryName: string;
  description: string;
  isActive: boolean;
}

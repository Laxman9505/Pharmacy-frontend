/** @format */

export interface CustomerDataModel {
  id?: string;
  customerName: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phoneNumber: string;
}

export interface PayOrderRequest {
  orderId?: string;
  customerDataModel?: CustomerDataModel | {};
  totalPaymentAmount: Number;
  orderStatus: string;
  paymentMethod: string;
  products: Product[];
  orderDescription: string;
  paidAmount: number;
  remainingAmount: number;
  discountAmount: number;
  discountPercentage: number;
}
export interface Product {
  id?: string;
  productId: string;
  quantity: number;
  boughtPrice: number;
}
export interface Order {
  id: string;
  customerDataModel: {
    firstName: string;
    lastName: string;
  };
  orderNo: string;
  paymentMethod: string;
  totalPaymentAmount: number;
  orderStatus: string;
  orderDate: string;
}

// src/types/orderTypes.ts

export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

export type OrderItem = {
  id: string | number;
  name: string;
  price: number;
  imgUrl: string;
  quantity: number;
  subtotal: number;
};

export type Order = {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
};

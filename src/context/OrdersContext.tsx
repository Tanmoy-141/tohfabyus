import { createContext } from "react";
import type { Order } from "../types/orderTypes";
import type { CartItem } from "./CartContext";

export type OrdersContextType = {
  orders: Order[];
  placeOrder: (items: CartItem[]) => void;
  cancelOrder: (orderId: string) => void;
  decreaseItemQuantity: (orderId: string, itemId: string | number) => void;
};

export const OrdersContext = createContext<OrdersContextType | null>(null);

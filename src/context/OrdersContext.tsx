import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import type { CartItem } from "./CartContext";

/* ===============================
   TYPES
================================ */

export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

export type Order = {
  id: string;
  items: CartItem[];
  totalAmount: number;
  createdAt: string;
  status: OrderStatus;
};

type OrdersContextType = {
  orders: Order[];
  placeOrder: (items: CartItem[], total: number) => void;
  cancelOrder: (orderId: string) => void;
  decreaseItemQuantity: (orderId: string, itemId: string | number) => void;
};

/* ===============================
   CONTEXT
================================ */

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

/* ===============================
   CONSTANTS
================================ */

const SHIPPING_CHARGE = 50;

/* ===============================
   PROVIDER
================================ */

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>(() => {
    // Initialize from localStorage if available
    if (!user) return [];
    const savedOrders = localStorage.getItem(`orders_${user.email}`);
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (user && orders.length > 0) {
      localStorage.setItem(`orders_${user.email}`, JSON.stringify(orders));
    }
  }, [orders, user]);

  // Clear orders when user logs out
  useEffect(() => {
    if (!user) {
      setOrders([]);
    } else {
      const savedOrders = localStorage.getItem(`orders_${user.email}`);
      setOrders(savedOrders ? JSON.parse(savedOrders) : []);
    }
  }, [user]);

  // Place a new order
  const placeOrder = (items: CartItem[], total: number) => {
    if (!user || items.length === 0) return;

    const newOrder: Order = {
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      items: items.map((item) => ({ ...item })), // Deep copy items
      totalAmount: total + SHIPPING_CHARGE, // Add shipping charge to total
      status: "Processing",
      createdAt: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };

    setOrders((prev) => [newOrder, ...prev]);
  };

  // Cancel an existing order
  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status: "Cancelled" as OrderStatus }
          : order,
      ),
    );
  };

  // Decrease quantity of a specific item in an order
  const decreaseItemQuantity = (orderId: string, itemId: string | number) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        const newItems = order.items
          .map((item) =>
            item.id === itemId
              ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
              : item,
          )
          .filter((item) => item.quantity > 0); // remove if quantity is 0

        const newTotal = newItems.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0,
        );

        return {
          ...order,
          items: newItems,
          totalAmount: newTotal + SHIPPING_CHARGE, // Add shipping charge to updated total
        };
      }),
    );
  };

  return (
    <OrdersContext.Provider
      value={{ orders, placeOrder, cancelOrder, decreaseItemQuantity }}>
      {children}
    </OrdersContext.Provider>
  );
}

/* ===============================
   HOOK
================================ */

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used inside OrdersProvider");
  }
  return context;
}

// src/context/OrdersProvider.tsx

import React, { useMemo, useState, useEffect } from "react";
import { OrdersContext } from "./OrdersContext";
import { useAuth } from "../hooks/useAuth";
import type { CartItem } from "./CartContext";
import type { Order, OrderItem } from "../types/orderTypes";
import { SHIPPING_CHARGE } from "../types/orderConstant";

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const initialOrders = useMemo(() => {
    if (!user) return [];
    try {
      const saved = localStorage.getItem(`orders_${user.email}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }, [user]);

  const [orders, setOrders] = useState<Order[]>(initialOrders);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem(`orders_${user.email}`, JSON.stringify(orders));
  }, [orders, user]);

  const placeOrder = (items: CartItem[]) => {
    if (!user || items.length === 0) return;

    const orderItems: OrderItem[] = items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      subtotal: item.price * item.quantity,
      imgUrl: item.imgUrl,
    }));

    const totalAmount =
      orderItems.reduce((sum, item) => sum + item.subtotal, 0) +
      SHIPPING_CHARGE;

    const newOrder: Order = {
      id: crypto.randomUUID(),
      items: orderItems,
      totalAmount,
      status: "Processing",
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "Cancelled" } : order,
      ),
    );
  };

  const decreaseItemQuantity = (orderId: string, itemId: string | number) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        const newItems = order.items
          .map((item) => {
            if (item.id !== itemId) return item;
            const qty = Math.max(item.quantity - 1, 0);
            return { ...item, quantity: qty, subtotal: item.price * qty };
          })
          .filter((item) => item.quantity > 0);

        const newTotal =
          newItems.reduce((sum, item) => sum + item.subtotal, 0) +
          (newItems.length ? SHIPPING_CHARGE : 0);

        return { ...order, items: newItems, totalAmount: newTotal };
      }),
    );
  };

  return (
    <OrdersContext.Provider
      value={{ orders, placeOrder, cancelOrder, decreaseItemQuantity }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

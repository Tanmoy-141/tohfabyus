// src/hooks/useOrders.ts

import { useContext } from "react";
import { OrdersContext } from "../context/OrdersContext";

export function useOrders() {
  const context = useContext(OrdersContext);

  if (!context) {
    throw new Error("useOrders must be used inside OrdersProvider");
  }

  return context;
}

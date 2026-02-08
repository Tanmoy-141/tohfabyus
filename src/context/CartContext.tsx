import { createContext, useContext, useEffect, useState } from "react";

/* ===============================
   TYPES
================================ */

export type CartItem = {
  id: string | number;
  name: string;
  price: number;
  imgUrl: string;
  quantity: number;
};

type AddToCartProps = Omit<CartItem, "quantity"> & { quantity?: number };

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: AddToCartProps) => void;
  removeFromCart: (id: string | number) => void;
  increaseQty: (id: string | number) => void;
  decreaseQty: (id: string | number) => void;
  cartCount: number;
  totalPrice: number;
};

/* ===============================
   CONTEXT
================================ */

const CartContext = createContext<CartContextType | undefined>(undefined);

/* ===============================
   PROVIDER
================================ */

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: AddToCartProps) => {
    const qty = item.quantity ?? 1; // default to 1 if quantity not provided
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + qty } : i,
        );
      }
      return [...prev, { ...item, quantity: qty }];
    });
  };

  const removeFromCart = (id: string | number) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const increaseQty = (id: string | number) => {
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)),
    );
  };

  const decreaseQty = (id: string | number) => {
    setCartItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    );
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        cartCount,
        totalPrice,
      }}>
      {children}
    </CartContext.Provider>
  );
}

/* ===============================
   HOOK
================================ */

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

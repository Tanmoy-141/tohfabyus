import { createContext, useContext, useEffect, useState } from "react";

export type WishlistItem = {
  id: string | number;
  name: string;
  price: number;
  imgUrl: string;
};

type WishlistContextType = {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string | number) => void;
  isWishlisted: (id: string | number) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  /* Persist wishlist */
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prev) =>
      prev.find((i) => i.id === item.id) ? prev : [...prev, item],
    );
  };

  const removeFromWishlist = (id: string | number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const isWishlisted = (id: string | number) =>
    wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

/* Custom hook */
// eslint-disable-next-line react-refresh/only-export-components
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }
  return context;
}

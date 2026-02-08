import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import productsData from "../data/items.json"; // Import your actual products

// Search Context Type
export interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchResult[];
  isSearching: boolean;
  performSearch: (query: string) => void;
  clearSearch: () => void;
}

export interface SearchResult {
  id: string;
  title: string;
  category: string;
  description?: string;
  path: string;
  type: "product" | "page" | "category";
  image?: string;
  price?: number;
}

// Create Context
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Search Provider Component
export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Build searchable data from actual products
  const buildSearchableData = (): SearchResult[] => {
    const productResults: SearchResult[] = productsData.map((product) => ({
      id: product.id,
      title: product.name,
      category: product.category,
      description: product.description,
      path: `/product/${product.id}`, // Changed from /product-details/ to /product/
      type: "product" as const,
      image: product.imgUrl,
      price: product.price,
    }));

    // Static pages and categories
    const staticResults: SearchResult[] = [
      {
        id: "cat-gift",
        title: "Gift Items",
        category: "Category",
        path: "/gift-items",
        type: "category",
      },
      {
        id: "cat-home",
        title: "Home Decor",
        category: "Category",
        path: "/home-decor",
        type: "category",
      },
      {
        id: "cat-accessories",
        title: "Accessories",
        category: "Category",
        path: "/accessories",
        type: "category",
      },
      {
        id: "page-about",
        title: "About Us",
        category: "Page",
        path: "/aboutus",
        type: "page",
      },
      {
        id: "page-account",
        title: "My Account",
        category: "Page",
        path: "/account",
        type: "page",
      },
      {
        id: "page-cart",
        title: "Shopping Cart",
        category: "Page",
        path: "/cart",
        type: "page",
      },
      {
        id: "page-wishlist",
        title: "Wishlist",
        category: "Page",
        path: "/wishlist",
        type: "page",
      },
    ];

    return [...productResults, ...staticResults];
  };

  const performSearch = (query: string) => {
    setIsSearching(true);

    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const searchableData = buildSearchableData();

    // Search algorithm
    const results = searchableData.filter((item) => {
      const searchTerm = query.toLowerCase();
      return (
        item.title.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm) ||
        item.description?.toLowerCase().includes(searchTerm)
      );
    });

    setSearchResults(results);
    setIsSearching(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        isSearching,
        performSearch,
        clearSearch,
      }}>
      {children}
    </SearchContext.Provider>
  );
}

// Custom Hook
export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within SearchProvider");
  }
  return context;
}

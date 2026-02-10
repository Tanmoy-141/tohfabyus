import { createContext } from "react";

export type SearchResult = {
  id: string;
  title: string;
  path: string;
  type: "product" | "category" | "page";
  category?: string;
  price?: number;
  imgurl?: string;
};

export type SearchContextType = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchResults: SearchResult[];
  clearSearch: () => void;
};

export const SearchContext = createContext<SearchContextType | null>(null);

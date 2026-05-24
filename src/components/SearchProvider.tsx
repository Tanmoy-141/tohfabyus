import { useMemo, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import type { SearchResult } from "../context/SearchContext";

const data: SearchResult[] = [
  {
    id: "Jetuku Bristi bhalo",
    title: "Jetuku Bristi bhalo",
    path: "/product/Jetuku Bristi bhalo",
    type: "product",
    category: "",
    price: 150,
  },
  {
    id: "Nijeder jonnyo bari",
    title: "Nijeder jonnyo bari",
    path: "/product/Nijeder jonnyo bari",
    type: "product",
    category: "",
    price: 150,
  },
  {
    id: "Olpo holeo sotti",
    title: "Olpo holeo sotti",
    path: "/product/Olpo holeo sotti",
    type: "product",
    category: "",
    price: 150,
  },
  {
    id: "Bichheder Niyomaboli",
    title: "Bichheder Niyomaboli",
    path: "/product/Bichheder Niyomaboli",
    type: "product",
    category: "",
    price: 150,
  },
  {
    id: "Wall Painting",
    title: "Wall Painting",
    path: "/product/Wall Painting",
    type: "product",
    category: "",
    price: 150,
  },
  {
    id: "Erit Lux",
    title: "Erit Lux",
    path: "/product/Erit Lux",
    type: "product",
    category: "",
    price: 150,
  },
  {
    id: "",
    title: "",
    path: "/product/",
    type: "product",
    category: "",
    price: 150,
  },
  {
    id: "দুপুর...",
    title: "দুপুর...",
    path: "/product/দুপুর...",
    type: "product",
    category: "",
    price: 150,
  },
  {
    id: "TEMPTATION",
    title: "TEMPTATION",
    path: "/product/TEMPTATION",
    type: "product",
    category: "",
    price: 150,
  },
  {
    id: "Table Painting",
    title: "Table Painting",
    path: "/product/Table Painting",
    type: "product",
    category: "",
    price: 150,
  },
  {
    id: "Mountain Landscape",
    title: "Mountain Landscape",
    path: "/product/Mountain Landscape",
    type: "product",
    category: "",
    price: 150,
  },
  {
    id: "Open Window",
    title: "Open Window",
    path: "/product/Open Window",
    type: "product",
    category: "",
    price: 150,
  },
  {
    id: "Empty Stairs",
    title: "Empty Stairs",
    path: "/product/Empty Stairs",
    type: "product",
    category: "",
    price: 150,
  },
];

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Derived state instead of useEffect + setState
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    return data.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <SearchContext.Provider
      value={{ searchQuery, setSearchQuery, searchResults, clearSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
}

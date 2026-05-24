import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/useSearch";
import "./ModernSearchbar.css";

export function ModernSearchBar() {
  const { searchQuery, setSearchQuery, searchResults, clearSearch } =
    useSearch();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = (path: string) => {
    navigate(path);
    clearSearch();
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsOpen(true);
  };

  return (
    <div className="modern-search-wrapper" ref={searchRef}>
      <div className="modern-search-container">
        <svg
          className="search-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>

        <input
          name="search"
          autoComplete="off"
          type="text"
          className="modern-search-input"
          placeholder="Search products, categories..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
        />

        {searchQuery && (
          <button
            className="search-clear-btn"
            onClick={() => {
              clearSearch();
              setIsOpen(false);
            }}
            type="button"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && searchQuery && (
        <div className="search-results-dropdown">
          {searchResults.length > 0 ? (
            <>
              <div className="search-results-header">
                Found {searchResults.length} result
                {searchResults.length !== 1 ? "s" : ""}
              </div>
              <div className="search-results-list">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="search-result-item"
                    onClick={() => handleResultClick(result.path)}
                  >
                    <div className="search-result-icon">
                      {result.type === "product" && "imgurl" in result && (
                        <img src={result.imgurl as string} alt={result.title} />
                      )}
                      {result.type === "category" && "📁"}
                      {result.type === "page" && "📄"}
                    </div>
                    <div className="search-result-content">
                      <div className="search-result-title">{result.title}</div>
                      <div className="search-result-meta">
                        <span className="search-result-category">
                          {result.category}
                        </span>
                        {result.price && (
                          <span className="search-result-price">
                            ₹{result.price}
                          </span>
                        )}
                      </div>
                    </div>
                    <svg
                      className="search-result-arrow"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="search-no-results">
              <div className="search-no-results-icon">🔍</div>
              <div className="search-no-results-text">No results found</div>
              <div className="search-no-results-hint">
                Try different keywords
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

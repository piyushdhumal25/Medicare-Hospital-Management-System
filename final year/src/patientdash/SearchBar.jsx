import React from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = ({ query, setQuery, placeholder = "Search doctors or specialists…" }) => {
  return (
    <div className="relative max-w-md w-full mx-auto mb-4">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 bg-white rounded-md border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
      />

      {query && (
        <FaTimes
          onClick={() => setQuery("")}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
        />
      )}
    </div>
  );
};

export default SearchBar;

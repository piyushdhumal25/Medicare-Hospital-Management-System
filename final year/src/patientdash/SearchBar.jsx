import React from "react";

const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="w-full flex justify-center my-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search doctors or specialists..."
        className="w-1/2 p-2 border rounded-lg"
      />
    </div>
  );
};

export default SearchBar;
import { useEffect, useState } from "react";

const SearchBar = ({ setSearchTerm }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="custom-search-input">
      <span className="search-icon">
        <i className="bi bi-search"></i>
      </span>
      <input
        type="text"
        className="search-input"
        placeholder="Search Movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;

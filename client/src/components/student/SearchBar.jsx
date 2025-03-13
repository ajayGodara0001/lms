import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/allcourses?search=${query}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center gap-2 border border-gray-300 rounded-lg p-2 w-full max-w-md mx-auto md:max-w-lg lg:max-w-xl"
    >
      {/* Search Icon */}
      <Search className="text-gray-500" size={20} />

      {/* Input Field */}
      <input
        type="text"
        placeholder="Search your courses"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
      />

      {/* Search Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;

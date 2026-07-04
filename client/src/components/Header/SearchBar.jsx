import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative hidden w-full lg:block">
      <MagnifyingGlassIcon className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
      <input
        type="search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="What are you looking for?"
        className="h-10 w-full rounded-lg bg-slate-200 px-4 pl-10 text-sm outline-slate-600 transition-all placeholder:text-slate-500"
      />
    </form>
  );
};

export default SearchBar;

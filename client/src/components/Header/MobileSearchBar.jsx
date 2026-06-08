import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const MobileSearchBar = () => {
  return (
    <div className="relative block w-full px-4 py-2 lg:hidden ml-4">
      <MagnifyingGlassIcon className=" h-4 w-4 text-slate-400 absolute left-7 top-5" />
      <div>
        <input
          type="search"
          placeholder="What are you looking for?"
          className="h-10 w-full rounded-lg bg-slate-200 px-4 py-10 text-sm outline-slate-600 transition-all placeholder:text-slate-500"
        />
      </div>
    </div>
  );
};

export default MobileSearchBar;

import React from "react";
import { Link } from "react-router-dom";

const MobileMenuItem = ({ url, label, icon: Icon }) => {
  return (
    <Link
      to={url}
      className="block w-full px-4 py-2 font-medium text-base text-slate-900 transition-all hover:bg-slate-200 hover:text-indigo-700"
    >
      <span className="flex items-center gap-2">
        <Icon strokeWidth={2} className=" h-4 w-4" />
        {label}
      </span>
    </Link>
  );
};

export default MobileMenuItem;

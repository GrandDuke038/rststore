import React from "react";

const MobileMenuItem = ({ url, label, icon: Icon }) => {
  return (
    <a
      href={url}
      className="block w-full px-4 py-2 font-medium text-base text-slate-900 transition-all hover:bg-slate-200 hover:text-indigo-700"
    >
      <span className="flex items-center gap-2">
        <Icon strokeWidth={2} className=" h-4 w-4" />
        {label}
      </span>
    </a>
  );
};

export default MobileMenuItem;

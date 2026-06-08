import React from "react";

const Footer = () => {
  return (
    <footer className="max-w-7xl mx-auto px-3 py-6 sm:px-6 lg:px-8">
      <div>
        <p className="text-center text-sm text-slate-700 sm:text-left">
          &copy; {new Date().getFullYear()} RST Store. All rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

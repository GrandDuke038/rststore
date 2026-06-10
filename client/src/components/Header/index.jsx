import { useState } from "react";

import DesktopMenu from "./DesktopMenu";
import Logo from "./Logo";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import MobileMenuIcon from "./MobileMenuIcon";
import SearchBar from "./SearchBar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed z-50 w-full border-b border-slate-300 bg-white">
      <div className="relative z-50 max-w-7xl mx-auto px-6 sm:py-2 lg:px-8">
        <div className="relative h-14 flex items-center justify-between">
          <Logo />
          <SearchBar />
          <DesktopMenu />
          <MobileMenuIcon isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>

      {/* Mobile Menu */}
      <div>{isOpen && <MobileMenu />}</div>

      <MegaMenu />
    </header>
  );
};

export default Header;

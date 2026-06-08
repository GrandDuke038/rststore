import DesktopMenu from "./DesktopMenu";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import MobileMenuIcon from "./MobileMenuIcon";
import SearchBar from "./SearchBar";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="fixed w-full border-b border-slate-300 bg-white">
      <div className="relative z-50 mx-auto max-w-7xl px-6  sm:py-1  lg:px-8">
        <div className=" flex h-14 relative items-center justify-between  ">
          <Logo />
          <SearchBar />
          <DesktopMenu />
          <MobileMenuIcon isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
      {/* Mobile Menu */}
      <div>{isOpen && <MobileMenu />}</div>
    </header>
  );
};

export default Header;

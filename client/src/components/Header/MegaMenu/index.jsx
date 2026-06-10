import { useEffect, useRef, useState } from "react";

import AllCategoriesMenuDisplay from "./AllCategoriesMenuDisplay";
import MegaMenuItem from "./MegaMenuItem";
import MenMenuDisplay from "./MenMenuDisplay";

const menuComponents = {
  "All Categories": AllCategoriesMenuDisplay,
  Men: MenMenuDisplay,
};

const MegaMenu = () => {
  const [currentMenu, setCurrentMenu] = useState(null);
  const menuRef = useRef(null);

  const CurrentSelectedMenu = currentMenu ? menuComponents[currentMenu] : null;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setCurrentMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="relative z-50 mx-auto hidden max-w-7xl gap-10 bg-white px-3 py-2.5 sm:px-6 lg:flex lg:px-8">
        <MegaMenuItem
          label="All Categories"
          currentItem={currentMenu}
          action={setCurrentMenu}
        />
        <MegaMenuItem
          currentItem={currentMenu}
          action={setCurrentMenu}
          label="Men"
        />
        <MegaMenuItem
          currentItem={currentMenu}
          action={setCurrentMenu}
          label="Women"
        />
        <MegaMenuItem
          currentItem={currentMenu}
          action={setCurrentMenu}
          label="Kids"
        />
        <MegaMenuItem
          currentItem={currentMenu}
          action={setCurrentMenu}
          label="Collections"
        />
        <MegaMenuItem
          currentItem={currentMenu}
          action={setCurrentMenu}
          label="Watches"
        />
        <MegaMenuItem
          currentItem={currentMenu}
          action={setCurrentMenu}
          label="Shoes"
        />
        <MegaMenuItem
          currentItem={currentMenu}
          action={setCurrentMenu}
          label="Accessories"
        />
        <MegaMenuItem
          currentItem={currentMenu}
          action={setCurrentMenu}
          label="Sale"
        />
      </nav>

      <div ref={menuRef}>{CurrentSelectedMenu && <CurrentSelectedMenu />}</div>
    </>
  );
};

export default MegaMenu;

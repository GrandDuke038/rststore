import { useEffect, useRef, useState } from "react";

import AllCategoriesMenuDisplay from "./AllCategoriesMenuDisplay";
import CategoryMenuDisplay from "./CategoryMenuDisplay";
import MegaMenuItem from "./MegaMenuItem";
import MenMenuDisplay from "./MenMenuDisplay";

const searchLink = (term, label) => ({
  url: `/search/${encodeURIComponent(term)}`,
  label,
});

const menuComponents = {
  "All Categories": AllCategoriesMenuDisplay,
  Men: MenMenuDisplay,
  Women: () => (
    <CategoryMenuDisplay
      title="Women's fashion"
      description="Explore clothing, shoes, and wardrobe essentials selected for every occasion."
      imageUrl="/images/women-category.jpg"
      links={[
        searchLink("women", "Shop all women"),
        searchLink("women clothing", "Clothing"),
        searchLink("women shoes", "Shoes"),
        searchLink("women outerwear", "Outerwear"),
      ]}
    />
  ),
  Kids: () => (
    <CategoryMenuDisplay
      title="Kids"
      description="Find comfortable, practical styles for little ones."
      imageUrl="/images/kids-category.jpg"
      links={[
        searchLink("kids", "Shop all kids"),
        searchLink("new", "New arrivals"),
        searchLink("clothing", "Clothing"),
        searchLink("shoes", "Shoes"),
      ]}
    />
  ),
  Collections: () => (
    <CategoryMenuDisplay
      title="Collections"
      description="Browse curated edits and seasonal favourites."
      imageUrl="/images/collections-category.jpg"
      links={[
        searchLink("collections", "Shop collections"),
        searchLink("new", "New arrivals"),
        searchLink("fashion", "Fashion picks"),
        searchLink("accessories", "Accessories"),
      ]}
    />
  ),
  Watches: () => (
    <CategoryMenuDisplay
      title="Watches"
      description="Discover classic and statement timepieces."
      imageUrl="/images/watches-category.jpg"
      links={[
        searchLink("watches", "Shop all watches"),
        searchLink("luxury", "Luxury watches"),
        searchLink("men watches", "Men's watches"),
        searchLink("women watches", "Women's watches"),
      ]}
    />
  ),
  Shoes: () => (
    <CategoryMenuDisplay
      title="Shoes"
      description="Step into everyday comfort, performance, and occasion styles."
      imageUrl="/images/shoes-category.jpg"
      links={[
        searchLink("shoes", "Shop all shoes"),
        searchLink("men shoes", "Men's shoes"),
        searchLink("women shoes", "Women's shoes"),
        searchLink("running shoes", "Running shoes"),
      ]}
    />
  ),
  Accessories: () => (
    <CategoryMenuDisplay
      title="Accessories"
      description="Finish the look with bags and everyday essentials."
      imageUrl="/images/accessories-category.jpg"
      links={[
        searchLink("accessories", "Shop all accessories"),
        searchLink("bags", "Bags"),
        searchLink("jewellery", "Jewellery"),
        searchLink("watches", "Watches"),
      ]}
    />
  ),
  Sale: () => (
    <CategoryMenuDisplay
      title="Sale"
      description="Browse current offers and reduced-price favourites."
      imageUrl="/images/sale-category.jpg"
      links={[
        searchLink("sale", "Shop sale"),
        searchLink("women", "Women's picks"),
        searchLink("men", "Men's picks"),
        searchLink("accessories", "Accessories"),
      ]}
    />
  ),
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
      <nav className="relative z-10 mx-auto hidden max-w-7xl gap-10 bg-white px-3 py-2.5 sm:px-6 lg:flex lg:px-8">
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

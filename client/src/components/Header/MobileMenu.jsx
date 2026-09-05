import MobileSearchBar from "./MobileSearchBar";
import MobileMenuItem from "./MobileMenuItem";
import {
  ShoppingCartIcon,
  TagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

const MobileMenu = () => {
  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <nav className="relative z-10 w-full overflow-auto bg-white pb-2 sm:max-w-sm">
      <MobileSearchBar />
      <div className="h-2" />
      <div>
        <MobileMenuItem url="/categories" label="Categories" icon={TagIcon} />
        <MobileMenuItem
          url={userInfo ? "/profile" : "/login"}
          label={userInfo ? "profile" : "login"}
          icon={UserIcon}
        />
        {userInfo && (
          <MobileMenuItem url="/support" label="support" icon={UserIcon} />
        )}
        <MobileMenuItem url="/cart" label="cart" icon={ShoppingCartIcon} />
      </div>
    </nav>
  );
};

export default MobileMenu;

import {
  ShoppingCartIcon,
  TagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import MenuItem from "./MenuItem";

const DesktopMenu = () => {
  return (
    <nav className="hidden items-center sm:ml-6 sm:flex sm:space-x-8">
      <MenuItem url="/categories" label="categories" icon={TagIcon} />
      <MenuItem url="/login" label="login" icon={UserIcon} />
      <MenuItem url="/cart" label="cart" icon={ShoppingCartIcon} />
    </nav>
  );
};

export default DesktopMenu;

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const MobileMenuIcon = ({ isOpen, setIsOpen }) => {
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="block sm:hidden cursor-pointer"
    >
      {isOpen ? (
        <XMarkIcon className="h-6 w-6 text-slate-600" />
      ) : (
        <Bars3Icon className="h-6 w-6 text-slate-600" />
      )}
    </button>
  );
};

export default MobileMenuIcon;

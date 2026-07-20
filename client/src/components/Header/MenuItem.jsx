import { Link } from "react-router-dom";
const MenuItem = ({ url, label, icon: Icon }) => {
  return (
    <Link
      to={url}
      className="flex items-center gap-1 text-sm font-semibold text-slate-900 transition-all hover:text-slate-600"
    >
      <Icon className="h-4 w-4 " />
      {label}
    </Link>
  );
};

export default MenuItem;

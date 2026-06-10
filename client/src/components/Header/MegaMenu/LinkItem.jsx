import { Link } from "react-router-dom";

const LinkItem = ({ url, label }) => {
  return (
    <li>
      <Link
        to={url}
        className="text-sm text-slate-700 transition-all hover:text-slate-950 hover:underline"
      >
        {label}
      </Link>
    </li>
  );
};

export default LinkItem;

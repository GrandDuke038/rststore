import { Link } from "react-router-dom";
const CategoryImageBox = ({ url, imageUrl, label }) => {
  return (
    <div>
      <Link to={url} className="relative block rounded-xl overflow-hidden">
        <span className="absolute bottom-10 z-10 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white rounded-lg font-semibold text-sm text-center px-3 py-1.5 uppercase tracking-wide">
          {label}
        </span>
        <img
          src={imageUrl}
          alt={label}
          className="h-64 w-full rounded-xl transition-transform duration-500 hover:scale-105 object-cover object-top"
        />
      </Link>
    </div>
  );
};

export default CategoryImageBox;

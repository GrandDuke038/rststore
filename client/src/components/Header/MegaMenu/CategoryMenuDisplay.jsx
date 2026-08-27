import CategoryImageBox from "./CategoryImageBox";
import LinkItem from "./LinkItem";

const CategoryMenuDisplay = ({ title, description, imageUrl, links }) => {
  return (
    <section className="border-t border-slate-300">
      <div className="relative z-50 mx-auto hidden max-w-7xl gap-10 bg-white px-3 py-8 sm:px-6 lg:flex lg:px-8">
        <div className="grid w-full grid-cols-12 gap-8">
          <div className="col-span-4">
            <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">
              {description}
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
              {links.map((link) => (
                <LinkItem key={link.label} {...link} />
              ))}
            </ul>
          </div>
          <div className="col-span-8">
            <CategoryImageBox url={links[0].url} imageUrl={imageUrl} label={title} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryMenuDisplay;

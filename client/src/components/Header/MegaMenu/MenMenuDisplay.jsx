import CategoryImageBox from "./CategoryImageBox";
import LinkItem from "./LinkItem";

const MenMenuDisplay = () => {
  return (
    <section className="border-t border-slate-300">
      <div className="relative z-50 mx-auto hidden max-w-7xl gap-10 bg-white px-3 py-8 sm:px-6 lg:flex lg:px-8">
        <div className="grid w-full grid-cols-12 gap-8">
          <div className="col-span-2">
            <h6 className="mb-6 text-sm font-semibold text-slate-950">
              Categories
            </h6>
            <ul className="flex flex-col gap-y-3">
              <LinkItem url="/search/men" label="Men's Fashion" />
              <LinkItem url="/search/new" label="New Arrivals" />
              <LinkItem url="/search/clothing" label="Clothing" />
              <LinkItem url="/search/footwear" label="Footwear" />
              <LinkItem url="/search/watches" label="Watches" />
              <LinkItem url="/search/jewellery" label="Jewellery" />
              <LinkItem url="/search/backpacks" label="Backpacks" />
              <LinkItem url="/search/luggage" label="Luggage" />
            </ul>
          </div>

          <div className="col-span-2">
            <h6 className="mb-6 text-sm font-semibold text-slate-950">
              Top Brands
            </h6>
            <ul className="flex flex-col gap-y-3">
              <LinkItem url="/search/nike" label="Nike" />
              <LinkItem url="/search/tommy-hilfiger" label="Tommy Hilfiger" />
              <LinkItem url="/search/skechers" label="Skechers" />
              <LinkItem url="/search/converse" label="Converse" />
              <LinkItem url="/search/puma" label="Puma" />
              <LinkItem url="/search/adidas" label="Adidas" />
              <LinkItem url="/search/under-armour" label="Under Armour" />
              <LinkItem url="/search/jack-jones" label="Jack & Jones" />
            </ul>
          </div>

          <div className="col-span-5">
            <CategoryImageBox
              url="/search/watches"
              imageUrl="/images/men-watches-category.jpg"
              label="Luxury Watches"
            />
          </div>

          <div className="col-span-3">
            <CategoryImageBox
              url="/search/suits"
              imageUrl="/images/mens-suit-category.jpg"
              label="Men's Suits"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenMenuDisplay;

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
              <LinkItem url="#" label="Men's Fashion" />
              <LinkItem url="#" label="New Arrivals" />
              <LinkItem url="#" label="Clothing" />
              <LinkItem url="#" label="Footwear" />
              <LinkItem url="#" label="Watches" />
              <LinkItem url="#" label="Jewellery" />
              <LinkItem url="#" label="Backpacks" />
              <LinkItem url="#" label="Luggage" />
            </ul>
          </div>

          <div className="col-span-2">
            <h6 className="mb-6 text-sm font-semibold text-slate-950">
              Top Brands
            </h6>
            <ul className="flex flex-col gap-y-3">
              <LinkItem url="#" label="Nike" />
              <LinkItem url="#" label="Tommy Hilfiger" />
              <LinkItem url="#" label="Skechers" />
              <LinkItem url="#" label="Converse" />
              <LinkItem url="#" label="Puma" />
              <LinkItem url="#" label="Adidas" />
              <LinkItem url="#" label="Under Armour" />
              <LinkItem url="#" label="Jack & Jones" />
            </ul>
          </div>

          <div className="col-span-5">
            <CategoryImageBox
              url="#"
              imageUrl="/images/men-watches-category.jpg"
              label="Luxury Watches"
            />
          </div>

          <div className="col-span-3">
            <CategoryImageBox
              url="#"
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

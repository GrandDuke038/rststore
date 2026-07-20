import CategoryImageBox from "./CategoryImageBox";

const AllCategoriesMenuDisplay = () => {
  return (
    <section className="border-t border-slate-300">
      <div className="relative z-50 mx-auto hidden max-w-7xl gap-10 bg-white px-3 py-8 sm:px-6 lg:flex lg:px-8">
        <div className="grid w-full grid-cols-12 gap-8">
          <div className="col-span-3">
            <CategoryImageBox
              url="/search/men"
              imageUrl="/images/men-category.jpg"
              label="Men"
            />
          </div>
          <div className="col-span-3">
            <CategoryImageBox
              url="/search/women"
              imageUrl="/images/women-category.jpg"
              label="Women"
            />
          </div>
          <div className="col-span-3">
            <CategoryImageBox
              url="/search/kids"
              imageUrl="/images/kids-category.jpg"
              label="Kids"
            />
          </div>
          <div className="col-span-3">
            <CategoryImageBox
              url="/search/collections"
              imageUrl="/images/collections-category.jpg"
              label="Collections"
            />
          </div>
          <div className="col-span-3">
            <CategoryImageBox
              url="/search/watches"
              imageUrl="/images/watches-category.jpg"
              label="Watches"
            />
          </div>
          <div className="col-span-3">
            <CategoryImageBox
              url="/search/shoes"
              imageUrl="/images/shoes-category.jpg"
              label="Shoes"
            />
          </div>
          <div className="col-span-3">
            <CategoryImageBox
              url="/search/accessories"
              imageUrl="/images/accessories-category.jpg"
              label="Accessories"
            />
          </div>
          <div className="col-span-3">
            <CategoryImageBox
              url="/search/sale"
              imageUrl="/images/sale-category.jpg"
              label="Sale"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllCategoriesMenuDisplay;

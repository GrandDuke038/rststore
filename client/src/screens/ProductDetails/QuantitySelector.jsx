import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

const QuantitySelector = ({ countInStock, quantity, setQuantity }) => {
  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };
  const handleIncrement = () => {
    setQuantity((prevQuantity) => Math.min(prevQuantity + 1, countInStock));
  };

  return (
    <div className="mt-10">
      <h6 className="mb-1 text-sm font-semibold text-slate-600">
        Select Quantity
      </h6>
      <div className="inline-flex items-center space-x-2 rounded-lg border border-slate-300 p-1">
        <div className="flex items-center gap-3">
          <button
            onClick={handleDecrement}
            className={`flex h-8 w-8 items-center justify-center rounded bg-slate-200 text-slate-600 hover:bg-slate-300 ${quantity <= 1 && "cursor-not-allowed opacity-50"}`}
          >
            <MinusIcon className="h-4 w-4 text-slate-900" />
          </button>

          <span className="text-sm font-medium">{quantity}</span>

          <button
            onClick={handleIncrement}
            className={`flex h-8 w-8 items-center justify-center rounded bg-slate-200 text-slate-600 hover:bg-slate-300 ${quantity >= countInStock && "cursor-not-allowed opacity-50"}`}
          >
            <PlusIcon className="h-4 w-4 text-slate-900" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuantitySelector;

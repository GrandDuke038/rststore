import { EyeIcon } from "@heroicons/react/24/outline";

const CardImage = ({ image, name }) => {
  return (
    <div className="relative w-full">
      <img
        src={image}
        alt={name}
        className="block w-full rounded-lg sm:h-96 object-cover object-center"
      />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 hover:opacity-100">
        <div className="bg-white rounded-full p-3 transition-all hover:bg-slate-200">
          <EyeIcon className="h-6 w-6 text-slate-700" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
};

export default CardImage;

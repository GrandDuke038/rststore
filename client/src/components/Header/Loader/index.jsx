import { ScaleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex min-h-96 items-center justify-center">
      <ScaleLoader color="#4338ca" size={50} />
    </div>
  );
};

export default Loader;

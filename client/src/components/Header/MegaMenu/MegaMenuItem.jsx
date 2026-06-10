const MegaMenuItem = ({ label, currentItem, action }) => {
  return (
    <button
      onClick={() => {
        if (currentItem !== label) {
          action(label);
        } else {
          action(null);
        }
      }}
      className={`text-sm hover:text-slate-950 cursor-pointer ${
        currentItem === label
          ? "font-bold text-indigo-700 underline underline-offset-4"
          : "text-slate-700 font-medium"
      }`}
    >
      {label}
    </button>
  );
};

export default MegaMenuItem;

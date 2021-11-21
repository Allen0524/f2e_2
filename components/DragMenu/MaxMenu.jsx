import Filterbutton from "../FilterButton";
import ListView from "../ListView";
import SearchInput from "../SearchInput";

const MaxMenu = () => {
  return (
    <div className="absolute w-[425px] h-3/4 shadow-xl rounded-xl bg-white px-6 py-5 z-20 top-32 left-8 lg:top-36">
      <div className="flex items-center justify-between">
        <SearchInput />
        <Filterbutton />
      </div>
      <ListView />
    </div>
  );
};

export default MaxMenu;

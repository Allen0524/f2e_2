import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAmountDown } from "@fortawesome/free-solid-svg-icons";

const Filterbutton = () => {
  return (
    <button className="bg-white text-primary flex justify-center items-center py-1 px-2 border border-lightPrimary rounded-lg ml-3 min-w-[70px]">
      <FontAwesomeIcon
        icon={faSortAmountDown}
        className="h-4 text-primary cursor-pointer"
      />
      <div className="text-primary font-semibold ml-1">排序</div>
    </button>
  );
};

export default Filterbutton;

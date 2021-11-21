import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

const CollapsButton = () => {
  return (
    <div className="absolute left-1/2 top-[-20px] w-12 h-7 pt-1 px-8 text-center z-30 -translate-x-2/4 bg-white rounded-md flex justify-center items-center cursor-pointer">
      <div className="flex justify-center items-center w-5 h-4">
        <FontAwesomeIcon icon={faSortUp} className="w-5 h-5 text-gray-500" />
      </div>
    </div>
  );
};

export default CollapsButton;

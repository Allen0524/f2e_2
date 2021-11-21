import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { filterList } from "../../utils";
import {
  setSearchResult,
  setSearchValue,
} from "../../store/reducer/searchReducer";

const SearchInput = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.appState.data);
  const searchValue = useSelector((state) => state.searchState.searchValue);

  function handleOnInputChange(e) {
    dispatch(setSearchValue(e.target.value));
    if (e.target.value === "") {
      // setSearchResults([]);
      dispatch(setSearchResult([]));
      return;
    }
    if (e.target.value) {
      const newData = data.filter(
        (item) =>
          item.StationName.Zh_tw.includes(e.target.value) ||
          item.StationAddress.Zh_tw.includes(e.target.value)
      );
      newData.length === 0
        ? dispatch(setSearchResult(undefined))
        : dispatch(setSearchResult(newData));
    }
  }
  return (
    <div className="flex items-center bg-gray-200 rounded-xl max-w-[300px] w-full py-2 px-4">
      <input
        className="bg-transparent outline-none w-full tracking-wider"
        type="text"
        value={searchValue}
        placeholder="搜尋站點或鄰近地點"
        onChange={handleOnInputChange}
      />
      <FontAwesomeIcon
        icon={faSearch}
        className="h-4 ml-1 text-gray-500 cursor-pointer"
      />
    </div>
  );
};

export default SearchInput;

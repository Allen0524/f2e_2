import { useDispatch, useSelector } from "react-redux";
import { setSwitchValue } from "../../store/reducer";

const Button = ({ text, children, value }) => {
  const switchValue = useSelector((state) => state.appState.switchValue);
  const dispatch = useDispatch();
  function handleOnSwitchClick() {
    dispatch(setSwitchValue(value));
  }
  return (
    <button
      className="flex items-center justify-center  w-24"
      onClick={handleOnSwitchClick}
    >
      {children}
      <div
        className=" text-primary text-md pl-1 font-semibold z-10"
        style={switchValue === value ? { color: "white" } : null}
      >
        {text}
      </div>
    </button>
  );
};

export default Button;

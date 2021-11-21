import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBicycle, faParking } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

const Switch = () => {
  const switchValue = useSelector((state) => state.appState.switchValue);
  return (
    <div className="absolute bg-white flex justify-center items-center w-52 h-9 rounded-2xl p-1 shadow-md z-20 top-12 left-1/2 -translate-x-2/4 lg:top-24">
      <Button text="找單車" value="findBike">
        <FontAwesomeIcon
          icon={faBicycle}
          className="h-4 text-white z-10"
          style={!(switchValue === "findBike") ? { color: "#738047" } : null}
        />
      </Button>
      <Button text="找車位" value="findPark">
        <FontAwesomeIcon
          icon={faParking}
          className="h-4 text-white z-10"
          style={!(switchValue === "findPark") ? { color: "#738047" } : null}
        />
      </Button>
      <div
        className="absolute w-24 rounded-2xl h-6 -z-10 duration-300"
        style={
          switchValue === "findBike"
            ? { backgroundColor: "#738047", transform: "translateX(-45px)" }
            : { backgroundColor: "#738047", transform: "translateX(45px)" }
        }
      />
    </div>
  );
};

export default Switch;

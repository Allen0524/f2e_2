import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faBicycle, faParking } from "@fortawesome/free-solid-svg-icons";
import CollapsButton from "../CollapsButton";
import { distance, getStyleByStatus } from "../../utils";

export const SmallInfoTag = ({ type, value = "--" }) => {
  return (
    <div
      className="flex items-center justify-around min-w-[56px] rounded-md bg-slightPrimary px-2 mr-1"
      style={
        type === "bike"
          ? { backgroundColor: "#DFE4CE" }
          : { backgroundColor: "#F7D4DD" }
      }
    >
      <div className="flex items-center justify-center">
        {type === "bike" ? (
          <FontAwesomeIcon icon={faBicycle} className="h-4 text-heavyPrimaty" />
        ) : (
          <FontAwesomeIcon
            icon={faParking}
            className="h-4 text-heavyRedPrimary"
          />
        )}
      </div>
      <div
        className="font-bold text-lg"
        style={type === "bike" ? { color: "#474f2c" } : { color: "#8C3046" }}
      >
        {value}
      </div>
    </div>
  );
};

const Tag = ({ status }) => {
  return (
    <div
      className=" py-[2px] px-2 text-sm border border-lightPrimary rounded-md min-w-[77px]"
      style={getStyleByStatus(status)}
    >
      {status}
    </div>
  );
};

const InfoTag = ({ type, value = "--", disable }) => {
  return (
    <div
      className="flex items-center justify-around min-w-[156px] mt-2 rounded-md py-2 px-4"
      style={
        disable
          ? { backgroundColor: "#EEEEEE" }
          : type === "bike"
          ? { backgroundColor: "#DFE4CE" }
          : { backgroundColor: "#F7D4DD" }
      }
    >
      <div className="flex items-center justify-center">
        {type === "bike" ? (
          <FontAwesomeIcon
            icon={faBicycle}
            className="h-4 text-heavyPrimaty"
            style={disable && { color: "#9A9A9A" }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faParking}
            className="h-4 text-heavyRedPrimary"
            style={disable && { color: "#9A9A9A" }}
          />
        )}
        <div
          className="pl-1"
          style={
            disable
              ? { color: "#9A9A9A" }
              : type === "bike"
              ? { color: "#474f2c" }
              : { color: "#8C3046" }
          }
        >
          {type === "bike" ? "可租借" : "可停車"}
        </div>
      </div>
      <div
        className="text-heavyPrimaty font-bold text-lg"
        style={
          disable
            ? { color: "#9A9A9A" }
            : type === "bike"
            ? { color: "#474f2c" }
            : { color: "#8C3046" }
        }
      >
        {value}
      </div>
    </div>
  );
};

const ListItem = ({
  title,
  rentCount,
  returnCount,
  distance,
  ServiceStatus,
}) => {
  const status = "";
  if (ServiceStatus === 2) {
    status = "站點施工中";
  } else if (rentCount > 0 && returnCount > 0) {
    status = "可借可還";
  } else if (returnCount === 0) {
    status = "只可借車";
  } else {
    status = "只可停車";
  }
  return (
    <div className="flex flex-col pt-5 pb-5 border-b border-gray-200 last:border-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center min-w-[150px]">
          <div className=" text-heavyPrimaty font-semibold text-md pr-2 truncate max-w-[180px]">
            {title}
          </div>
          <Tag status={status} />
        </div>

        <div className="flex justify-center items-center min-w-[88px]">
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className=" h-4 text-gray-500"
          />
          <div className="text-gray-500 text-sm pl-1 min-w-[77px]">
            距離{distance}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <InfoTag type="bike" value={rentCount} disable={rentCount === 0} />
        <InfoTag type="park" value={returnCount} disable={returnCount === 0} />
      </div>
    </div>
  );
};

const ListView = () => {
  const data = useSelector((state) => state.appState.data);
  const searchResults = useSelector((state) => state.searchState.searchResults);
  const { lon, lat } = useSelector((state) => state.appState.userCoords);
  return (
    <div className="w-full h-full mb-3 overflow-y-auto px-2 mt-2">
      {searchResults && searchResults?.length !== 0 ? (
        searchResults.map((item) => (
          <ListItem
            key={item.StationID}
            title={item.StationName.Zh_tw}
            rentCount={item.AvailableRentBikes}
            returnCount={item.AvailableReturnBikes}
            ServiceStatus={item.ServiceStatus}
            distance={distance(
              lat,
              lon,
              item.StationPosition.PositionLat,
              item.StationPosition.PositionLon
            )}
          />
        ))
      ) : typeof searchResults === "undefined" ? (
        <div className="w-full h-16 bg-slightRedPrimary rounded-lg flex justify-center items-center">
          <div className=" text-heavyRedPrimary  font-bold">查無結果</div>
        </div>
      ) : (
        data?.map((item) => (
          <ListItem
            key={item.StationID}
            title={item.StationName.Zh_tw}
            rentCount={item.AvailableRentBikes}
            returnCount={item.AvailableReturnBikes}
            ServiceStatus={item.ServiceStatus}
            distance={distance(
              lat,
              lon,
              item.StationPosition.PositionLat,
              item.StationPosition.PositionLon
            )}
          />
        ))
      )}
    </div>
  );
};

export default ListView;

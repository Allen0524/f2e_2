import React, { useEffect, useState } from "react";
import MapGL, { Marker, Popup } from "@urbica/react-map-gl";
import Cluster from "@urbica/react-map-gl-cluster";
import { useSelector, useDispatch } from "react-redux";
import "mapbox-gl/dist/mapbox-gl.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { SmallInfoTag } from "../ListView";
import { distance } from "../../utils";
import { setViewPortStore } from "../../store/reducer";

const Map = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.appState.data);
  const viewPortStore = useSelector((state) => state.appState.viewPortStore);
  const switchValue = useSelector((state) => state.appState.switchValue);
  const { lon, lat } = useSelector((state) => state.appState.userCoords);
  const [selectedLocation, setSelectedLocation] = useState();
  const [viewport, setViewport] = useState(
    viewPortStore || {
      width: "100%",
      height: "100%",
      latitude: lon,
      longitude: lat,
      zoom: 14,
    }
  );

  useEffect(() => {
    setViewport((oldState) => ({
      ...oldState,
      latitude: lat,
      longitude: lon,
    }));
  }, [lon, lat]);

  if (!data) return null;

  const ClusterMarker = ({ longitude, latitude, pointCount }) => (
    <Marker longitude={longitude} latitude={latitude}>
      <div className="h-10 w-10 flex justify-center items-center rounded-full bg-lightPrimary">
        <div className=" text-center text-base font-semibold text-white">
          {pointCount}
        </div>
      </div>
    </Marker>
  );

  return (
    <MapGL
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/lp0318563lp/cks14ovh931do18mlf8d6r0hu"
      accessToken="pk.eyJ1IjoibHAwMzE4NTYzbHAiLCJhIjoiY2tzMTRraTJrMTE2dTJ3cWc3emZuMGJvaSJ9.Ps-_jBZs_V8DqAyBVYF3FA"
      {...viewport}
      onViewportChange={(nextViewport) => {
        setViewport(nextViewport);
        dispatch(setViewPortStore(nextViewport));
      }}
    >
      <Marker longitude={lon} latitude={lat}>
        <img
          src="/user-position.svg"
          alt="user-position"
          className=" w-16 h-16"
        />
      </Marker>
      <Cluster radius={40} extent={512} nodeSize={64} component={ClusterMarker}>
        {data.map((point) => (
          <Marker
            key={point.StationID}
            longitude={point.StationPosition.PositionLon}
            latitude={point.StationPosition.PositionLat}
          >
            <div
              className="relative cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedLocation(point);
              }}
            >
              {/* <FontAwesomeIcon
                aria-label="push-pin"
                icon={faMapMarkerAlt}
                className="h-9 cursor-pointer animate-bounce text-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedLocation(point);
                }}
              /> */}
              <img
                src="/Vector.svg"
                alt="marker"
                className="h-12 cursor-pointer"
              />
              <div className="absolute text-lg h-7 w-7 rounded-full bg-white top-[5px] left-[5.5px] flex justify-center items-center cursor-pointer font-bold">
                {switchValue === "findBike"
                  ? point.AvailableRentBikes
                  : point.AvailableReturnBikes}
              </div>
            </div>
          </Marker>
        ))}
      </Cluster>

      {selectedLocation && (
        <Popup
          onClose={() => {
            setSelectedLocation();
          }}
          closeButton={false}
          closeOnClick={true}
          latitude={selectedLocation.StationPosition.PositionLat}
          longitude={selectedLocation.StationPosition.PositionLon}
          maxWidth="269px"
          anchor="bottom-left"
        >
          <div className="min-w-[229px]">
            <div className="text-heavyPrimaty text-base font-semibold">
              {selectedLocation.StationName.Zh_tw}
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center justify-between">
                <SmallInfoTag
                  type="bike"
                  value={selectedLocation.AvailableRentBikes}
                />
                <SmallInfoTag
                  type="park"
                  value={selectedLocation.AvailableReturnBikes}
                />
              </div>
              <div className="flex justify-center items-center min-w-[88px]">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className=" h-4 text-gray-500"
                />
                <div className="text-gray-500 text-sm pl-1 min-w-[77px]">
                  距離
                  {distance(
                    lat,
                    lon,
                    selectedLocation.StationPosition.PositionLat,
                    selectedLocation.StationPosition.PositionLon
                  )}
                </div>
              </div>
            </div>
          </div>
        </Popup>
      )}
    </MapGL>
  );
};

export default Map;

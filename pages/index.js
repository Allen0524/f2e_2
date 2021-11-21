import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { setData, setCoords } from "../store/reducer";
import DragMenu from "../components/DragMenu/DragMenu";
import Header from "../components/Layout/Header/Header";
import Switch from "../components/SwitchButton/Switch";
import { getUserLocation, fetchData, fetchDynamicData } from "../api";
import MainLoading from "../components/Loading/Main";
import useMediaQuery from "../hooks";
import MaxMenu from "../components/DragMenu/MaxMenu";
import { removeString } from "../utils";

export default function Home() {
  const switchValue = useSelector((state) => state.appState.switchValue);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const Map = useMemo(
    () => dynamic(() => import("../components/Map"), { ssr: false }),
    [switchValue]
  );
  const match = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    async function init() {
      setIsLoading(true);
      try {
        const { lon, lat } = await getUserLocation();
        const nearByInfoDatas = await fetchData(lon, lat);
        const nearbyAvailableDatas = await fetchDynamicData(lon, lat);

        const datas = nearByInfoDatas.map((item) => {
          const targetData = nearbyAvailableDatas.find(
            (data) => data.StationID === item.StationID
          );
          item.StationName.Zh_tw = removeString(item.StationName.Zh_tw);
          item.AvailableRentBikes = targetData.AvailableRentBikes;
          item.AvailableReturnBikes = targetData.AvailableReturnBikes;
          item.ServiceStatus = targetData.ServiceStatus;
          item.UpdateTime = targetData.UpdateTime;

          return item;
        });

        console.log(datas);
        dispatch(setCoords({ lon, lat }));
        dispatch(setData(datas));
        setIsLoading(false);
      } catch {}
    }

    init();
  }, []);

  return (
    <div className="">
      <Head>
        <title>Bikeland</title>
        <link rel="icon" href="/smalllogo.svg" />
      </Head>

      <main className=" bg-blue-300 h-screen relative overflow-hidden">
        <Header />
        <Switch />
        {isLoading ? <MainLoading /> : <Map />}
        {/* <MainLoading /> */}
        {isLoading ? null : match ? <MaxMenu /> : <DragMenu />}
      </main>
    </div>
  );
}

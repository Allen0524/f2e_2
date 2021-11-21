import jsSHA from "jssha";
import axios from "axios";

export function getAuthorizationHeader() {
  let AppID = "d5eeee97da8b4d18a8a1350c1f87dfe3";
  let AppKey = "9Sf8FW4Z5L-dt0cQIsRKjs67G7E";

  let GMTString = new Date().toGMTString();
  let ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(AppKey, "TEXT");
  ShaObj.update("x-date: " + GMTString);
  let HMAC = ShaObj.getHMAC("B64");
  let Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"';
  return { Authorization: Authorization, "X-Date": GMTString };
}

export async function getUserLocation() {
  if (navigator.geolocation) {
    const pos = await new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });
    return { lon: pos.coords.longitude, lat: pos.coords.latitude };
  }
}

export async function fetchData(lon, lat) {
  const res = await axios.get(
    `https://ptx.transportdata.tw/MOTC/v2/Bike/Station/NearBy?$spatialFilter=nearby(${lat}, ${lon}, 1000)&$format=JSON`,
    { headers: getAuthorizationHeader() }
  );
  const data = await res.data;
  return data;
}

export async function fetchDynamicData(lon, lat) {
  const res = await axios.get(
    `https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/NearBy?$spatialFilter=nearby(${lat}, ${lon}, 1000)&$format=JSON`,
    { headers: getAuthorizationHeader() }
  );
  const data = await res.data;
  return data;
}

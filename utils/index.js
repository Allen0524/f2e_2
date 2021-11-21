export function distance(lat1, lon1, lat2, lon2, unit = "K") {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist < 1
      ? `${dist.toFixed(2) * 1000}公尺`
      : `${dist.toFixed(2)}公里`;
  }
}

const version1 = "YouBike1.0_";
const version2 = "YouBike2.0_";

export function removeString(string) {
  if (!string.includes(version1) && !string.includes(version2)) {
    return string;
  }

  return string.includes(version2)
    ? string.replace(version2, "")
    : string.replace(version1, "");
}

export function getStyleByStatus(status) {
  switch (status) {
    case "只可借車":
      return {
        border: "1px solid #F27594",
        color: "#E75578",
      };
    case "只可停車":
      return {
        border: "1px solid #F27594",
        color: "#E75578",
      };
    case "站點施工中":
      return {
        border: "1px solid #C5C5C5",
        color: "#9A9A9A",
      };
    default:
      return {
        border: "1px solid #EABD8A",
        color: "#C67A24",
      };
  }
}

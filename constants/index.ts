export const h2 = {
  fontFamily: "CarosSoftBold",
  fontSize: 24,
  letterSpacing: 0.4,
  color: "#1A1A1A",
};

export const h3 = {
  fontFamily: "CarosSoftBold",
  fontSize: 18,
  letterSpacing: 0.3,
  color: "#1A1A1A",
};

export const AppName = "Qutta";

export const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const isDev = process.env.NODE_ENV !== "production";

// Use EXPO_PUBLIC_MACHINE_IP for local dev
const machineIP = process.env.EXPO_PUBLIC_MACHINE_IP || "localhost";

export const BASE_URL = isDev
  ? `http://${machineIP}:3000/api/`
  : "https://qutta-backend-production.up.railway.app/api/";

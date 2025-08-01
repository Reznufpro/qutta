import { featured, suggestion } from "@/types";

const MAPBOX_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_API_KEY;

export const fetchSuggestions = async ({
  query,
  sessionToken,
  proximity,
}: {
  query: string;
  sessionToken: string;
  proximity?: [number, number];
}): Promise<suggestion> => {
  const prox = proximity ? `&proximity=${proximity[0]},${proximity[1]}` : "";
  const url = `https://api.mapbox.com/search/searchbox/v1/suggest?q=${encodeURIComponent(
    query
  )}&language=en&limit=5${prox}&session_token=${sessionToken}&access_token=${MAPBOX_TOKEN}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch suggestions");
  const response: suggestion = await res.json();
  return response;
};

export const fetchLocationById = async ({
  mapbox_id,
  sessionToken,
}: {
  mapbox_id: string;
  sessionToken: string;
}): Promise<featured> => {
  const url = `https://api.mapbox.com/search/searchbox/v1/retrieve/${mapbox_id}?session_token=${sessionToken}&access_token=${MAPBOX_TOKEN}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to retrieve location");
  const response: featured = await res.json();
  return response;
};

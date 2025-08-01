import { fetchLocationById, fetchSuggestions } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export const useMapboxSuggestions = (query: string, sessionToken: string) => {
  return useQuery({
    queryKey: ["mapbox-suggestions", query],
    queryFn: () => fetchSuggestions({ query, sessionToken }),
    enabled: !!query && query.length > 2,
  });
};

export const useMapboxRetrieve = (mapbox_id: string, sessionToken: string) => {
  return useQuery({
    queryKey: ["mapbox-retrieve", mapbox_id],
    queryFn: () => fetchLocationById({ mapbox_id, sessionToken }),
    enabled: !!mapbox_id,
  });
};

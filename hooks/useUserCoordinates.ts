import { useQuery } from "@tanstack/react-query";
import * as Location from "expo-location";

export const useUserCoordinates = () => {
  return useQuery({
    queryKey: ["user-coordinates"],
    queryFn: async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Location permission denied");
      }

      try {
        const loc = await Location.getCurrentPositionAsync({});
        return {
          lat: loc.coords.latitude,
          lon: loc.coords.longitude,
        };
      } catch (error) {
        console.warn("⚠️ Location error", error);

        // Fallback (e.g. on iOS simulator)
        return {
          lat: 25.6866, // Monterrey fallback
          lon: -100.3161,
        };
      }
    },
    staleTime: 3600000, // cache for 1 hour
    refetchOnWindowFocus: false,
  });
};

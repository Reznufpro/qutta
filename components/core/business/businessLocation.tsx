import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { useUserCoordinates } from "@/hooks/useUserCoordinates";
import { BusinessData } from "@/types";
import { calculateDistanceInKm } from "@/utils";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

interface BusinessLocationProps {
  businessCoordinates: BusinessData["coordinates"];
}

export const BusinessLocation = ({
  businessCoordinates,
}: BusinessLocationProps) => {
  const { data: coords, isLoading } = useUserCoordinates();

  const businessLat = Number(businessCoordinates.latitude);
  const businessLon = Number(businessCoordinates.longitude);

  const distance = useMemo(() => {
    if (coords && businessLat && businessLon) {
      return calculateDistanceInKm(
        coords.lat,
        coords.lon,
        businessLat,
        businessLon
      );
    }
    return null;
  }, [coords, businessLat, businessLon]);

  return (
    <CustomText style={styles.itemText}>
      {isLoading
        ? "Calculating..."
        : distance !== null
        ? `${distance} km`
        : "Info"}
    </CustomText>
  );
};

const styles = StyleSheet.create({
  itemText: {
    fontFamily: "CarosSoftMedium",
    color: Colors.light.textSecondary,
    fontSize: 15,
  },
});

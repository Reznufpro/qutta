import CustomText from "@/components/ui/customText";
import { HoverButton } from "@/components/ui/hoverButton";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { bookingData } from "@/context/bookingContext";
import { useCurrency } from "@/context/currencyContext";
import { BusinessData } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface ClientBookingProps {
  bookingData: bookingData;
  businessData: BusinessData;
  setBookingData: React.Dispatch<React.SetStateAction<bookingData>>;
}

export const ClientBooking = ({
  bookingData,
  businessData,
  setBookingData,
}: ClientBookingProps) => {
  const router = useRouter();
  const { formatAmount, isLoading } = useCurrency();

  const disable = useMemo(() => {
    const check = bookingData.service.length === 0 || !bookingData.business;
    return check;
  }, [bookingData.service, bookingData.business]);

  const handlePress = () => {
    if (disable) return;

    setBookingData((prev) => ({
      ...prev,
      business: {
        id: businessData.id,
        name: businessData.name,
        image: businessData.image,
        rating: businessData.rating,
        coordinates: {
          location: businessData.coordinates?.location ?? "",
          latitude: businessData.coordinates?.latitude ?? 0,
          longitude: businessData.coordinates?.longitude ?? 0,
        },
      },
    }));

    router.push("/bookings/selectTimeDate");
  };

  return (
    <HoverButton
      keyId="submit"
      styleContainer={{ borderTopWidth: 1, borderColor: Colors.light.muted }}
    >
      <InnerContainer style={styles.container}>
        <View>
          <CustomText style={styles.serviceText}>
            {bookingData.service.length}{" "}
            {bookingData.service.length > 1 ? "services" : "service"} selected
          </CustomText>

          {bookingData.staff?.name && (
            <CustomText style={styles.serviceText}>
              Staff: <CustomText>{bookingData.staff?.name}</CustomText>
            </CustomText>
          )}

          <CustomText style={styles.serviceText}>
            Total:{" "}
            <CustomText>
              {bookingData.total && formatAmount(bookingData.total)}
            </CustomText>{" "}
          </CustomText>
        </View>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <CustomText style={styles.buttonText}>Finalize</CustomText>
            <Ionicons
              name="arrow-forward-outline"
              color={Colors.light.white}
              size={16}
            />
          </View>
        </TouchableOpacity>
      </InnerContainer>
    </HoverButton>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 45,
    alignItems: "center",
  },
  serviceText: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    fontFamily: "CarosSoftLight",
  },
  button: {
    backgroundColor: Colors.light.black,
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: Colors.light.white,
    fontFamily: "Satoshi-Bold",
    fontSize: 14,
  },
});

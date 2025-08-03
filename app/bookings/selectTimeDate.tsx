import { BookingTimeSelector } from "@/components/core/business/clientBusiness/bookingTimeSelector";
import { BackButton } from "@/components/ui/backButton";
import { Header } from "@/components/ui/header";
import { ScreenContainer } from "@/components/ui/screenContainer";
import { useBooking } from "@/context/bookingContext";
import { useSelectedBusiness } from "@/context/selectedBusinessContext";
import { useAvailability } from "@/hooks/useBusinessAvailability";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function SelectTimeDateScreen() {
  const { selectedBusinessId } = useSelectedBusiness();
  const { data: availability } = useAvailability(selectedBusinessId as string);
  const { setBookingData, bookingData } = useBooking();

  const router = useRouter();

  const handleSave = () => router.push("/bookings/finalizeBooking");

  return (
    <>
      <ScreenContainer innerStyle={{ paddingBottom: 0 }}>
        <View style={styles.iconRow}>
          <BackButton />
        </View>

        <Header
          headerTitle="Pick a date and time."
          style={{ marginBottom: 12 }}
        />

        {availability && (
          <BookingTimeSelector
            handleSave={handleSave}
            bookingData={bookingData}
            availability={availability}
            setBookingData={setBookingData}
          />
        )}
      </ScreenContainer>
    </>
  );
}

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: "row",
  },
});

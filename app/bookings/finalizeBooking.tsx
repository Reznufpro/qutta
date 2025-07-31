import { BackButton } from "@/components/ui/backButton";
import { Header } from "@/components/ui/header";
import { HoverButton } from "@/components/ui/hoverButton";
import { InnerContainer } from "@/components/ui/innerContainer";
import { ListingButtons } from "@/components/ui/listingButtons";
import { ScreenContainer } from "@/components/ui/screenContainer";
import { useBooking } from "@/context/bookingContext";
import { StyleSheet, View } from "react-native";

export default function FinalizeBookingScreen() {
  const { bookingData } = useBooking();

  console.log(bookingData);

  const handleBack = () => {};

  const handleNext = () => {};

  return (
    <>
      <ScreenContainer>
        <View style={styles.iconRow}>
          <BackButton />
        </View>

        <Header
          headerTitle="Review and finalize"
          style={{ marginBottom: 12 }}
        />
      </ScreenContainer>

      <HoverButton keyId="finalize">
        <InnerContainer style={styles.container}>
          <ListingButtons
            backBtnTitle="Cancel"
            nextBtnTitle="Confirm"
            handleBack={handleBack}
            handleNext={handleNext}
          />
        </InnerContainer>
      </HoverButton>
    </>
  );
}

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: "row",
  },
  container: {
    paddingVertical: 20,
  },
});

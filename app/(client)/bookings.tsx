import { ClientBookingCard } from "@/components/core/bookings/clientBookingCard";
import CustomHeading from "@/components/ui/customHeading";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { ScreenContainer } from "@/components/ui/screenContainer";
import { Colors } from "@/constants/Colors";
import { mockClientBookings } from "@/utils";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

export default function BookingsScreen() {
  const router = useRouter();

  const handleGetStarted = () => router.push("/(client)/home");

  return (
    <ScreenContainer>
      <Header
        headerTitle="Bookings"
        subHeader="Keep track of your upcoming and past appointments."
        style={{ marginBottom: 12 }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {mockClientBookings && mockClientBookings.length > 0 ? (
          mockClientBookings.map((booking) => (
            <ClientBookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <CustomHeading style={styles.headin}>
              Start your experience
            </CustomHeading>

            <CustomText style={styles.text}>
              Explore businesses and check availabilities. When you book an
              appointment, your upcoming appointments will appear here.
            </CustomText>

            <Pressable style={styles.button} onPress={handleGetStarted}>
              <CustomText style={styles.buttonText}>Get started</CustomText>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 150,
    gap: 15,
  },
  headin: {
    fontFamily: "CarosSoftBold",
    textAlign: "center",
    fontSize: 18,
    textTransform: "capitalize",
    color: Colors.light.black,
  },
  text: {
    fontFamily: "Satoshi-Bold",
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
    color: Colors.light.textSecondary,
    maxWidth: 350,
  },
  emptyContainer: {
    flexDirection: "column",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
  },
  button: {
    backgroundColor: Colors.light.black,
    paddingVertical: 14,
    paddingHorizontal: 14,
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 40,
  },
  buttonText: {
    color: Colors.light.white,
    fontFamily: "CarosSoftBold",
    fontSize: 15,
  },
});

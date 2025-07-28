import { ClientBookingCard } from "@/components/core/bookings/clientBookingCard";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { ScreenContainer } from "@/components/ui/screenContainer";
import { mockClientBookings } from "@/utils";
import { ScrollView, StyleSheet, View } from "react-native";

export default function BookingsScreen() {
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
        <View>
          <CustomText style={styles.text}>Upcoming {}</CustomText>

          {mockClientBookings.map((booking) => (
            <ClientBookingCard key={booking.id} booking={booking} />
          ))}
        </View>

        <View>
          <CustomText style={styles.text}>Past {}</CustomText>

          {mockClientBookings.map((booking) => (
            <ClientBookingCard key={booking.id} booking={booking} />
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 150,
    gap: 15,
  },
  text: {
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
    marginBottom: 16,
  },
});

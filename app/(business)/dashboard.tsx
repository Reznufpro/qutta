import { BookedCard } from "@/components/core/business/bookedCard";
import CustomHeading from "@/components/ui/customHeading";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { ScreenContainer } from "@/components/ui/screenContainer";
import { Colors } from "@/constants/Colors";
import { useUserData } from "@/context/userContext";
import { useCancelBooking, useGetOwnerBookings } from "@/hooks/useBooking";
import { useState } from "react";
import { FlatList, Platform, ScrollView, StyleSheet, View } from "react-native";

export default function DashboardScreen() {
  const { userData } = useUserData();
  const { data: ownerBookings } = useGetOwnerBookings();

  const {
    mutateAsync: cancelBooking,
    isSuccess,
    error,
    isPending: cancelPending,
  } = useCancelBooking();

  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <ScreenContainer>
      <Header
        headerTitle={`Welcome, ${userData.name}`}
        style={{ marginBottom: 12 }}
      />

      <CustomText style={styles.text}>Your bookings</CustomText>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: 15, gap: 12 }}>
          <FlatList
            scrollEnabled={false}
            horizontal={false}
            data={ownerBookings}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.scrollContent}
            renderItem={({ item, index }) => (
              <BookedCard
                item={item}
                index={index}
                cancelPending={cancelPending}
                expandedId={expandedId}
                setExpandedId={setExpandedId}
                cancel={() => cancelBooking(item.id)}
              />
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <CustomHeading style={styles.headin}>
                  You have no bookings yet
                </CustomHeading>

                <CustomText style={styles.emptyText}>
                  Once a client has booked, they will appear here!
                </CustomText>
              </View>
            }
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAF7",
  },
  scrollContent: {
    paddingBottom: Platform.OS === "ios" ? 70 : 30,
  },
  text: {
    fontSize: 18,
    color: Colors.light.black,
    fontFamily: "CarosSoftBold",
  },
  emptyContainer: {
    flexDirection: "column",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
  },
  headin: {
    fontFamily: "CarosSoftBold",
    textAlign: "center",
    fontSize: 18,
    textTransform: "none",
    color: Colors.light.black,
  },
  emptyText: {
    fontFamily: "Satoshi-Bold",
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
    color: Colors.light.textSecondary,
    maxWidth: 350,
  },
});

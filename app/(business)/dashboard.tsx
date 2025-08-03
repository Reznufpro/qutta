import { BookedCard } from "@/components/core/business/bookedCard";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { ScreenContainer } from "@/components/ui/screenContainer";
import { Colors } from "@/constants/Colors";
import { useUserData } from "@/context/userContext";
import { useLogout } from "@/hooks/useAuth";
import { useCancelBooking, useGetOwnerBookings } from "@/hooks/useBooking";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Platform, ScrollView, StyleSheet, View } from "react-native";

export default function DashboardScreen() {
  const { userData } = useUserData();
  const { logout } = useLogout();
  const router = useRouter();

  const { data: ownerBookings } = useGetOwnerBookings();

  const {
    mutateAsync: cancelBooking,
    isSuccess,
    error,
    isPending,
  } = useCancelBooking();

  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <ScreenContainer>
      <Header
        headerTitle={`Welcome, ${userData.name}`}
        style={{ marginBottom: 12 }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: 30, gap: 12 }}>
          <CustomText style={styles.text}>Your bookings</CustomText>

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
                expandedId={expandedId}
                setExpandedId={setExpandedId}
                cancel={() => cancelBooking(item.id)}
              />
            )}
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
});

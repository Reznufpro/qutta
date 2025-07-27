import { Header } from "@/components/ui/header";
import { ScreenContainer } from "@/components/ui/screenContainer";
import { Platform, ScrollView, StyleSheet } from "react-native";

export default function BookingsScreen() {
  return (
    <ScreenContainer>
      <Header headerTitle="Bookings" style={{ marginBottom: 12 }} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      ></ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: Platform.OS === "ios" ? 70 : 30,
  },
});

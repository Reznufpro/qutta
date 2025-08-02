import { BusinessSelector } from "@/components/core/business/businessSelector";
import { ScheduleForm } from "@/components/core/business/scheduleForm";
import { Header } from "@/components/ui/header";
import { InnerContainer } from "@/components/ui/innerContainer";
import { useUserData } from "@/context/userContext";
import { usegetBusinessesByUserId } from "@/hooks/useCreateBusiness";
import { StatusBar } from "expo-status-bar";
import { Platform, SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function ScheduleScreen() {
  const { userData } = useUserData();
  const { data: businesses } = usegetBusinessesByUserId(userData.id);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <InnerContainer style={{ gap: 12, marginTop: 20 }}>
        <Header headerTitle="Schedule" style={{ marginBottom: 18 }} />

        {businesses && <BusinessSelector businesses={businesses} />}

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ScheduleForm />
        </ScrollView>
      </InnerContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAF7",
  },
  scrollContent: {
    paddingBottom: Platform.OS === "ios" ? 70 : 30,
    marginTop: 12,
  },
});

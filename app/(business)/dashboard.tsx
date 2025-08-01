import CustomHeading from "@/components/ui/customHeading";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { useUserData } from "@/context/userContext";
import { useLogout } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function DashboardScreen() {
  const { userData } = useUserData();
  const { logout } = useLogout();
  const router = useRouter();

  console.log(userData.lastName);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <InnerContainer style={{ gap: 12, marginTop: 20 }}>
        <CustomHeading>Welcome</CustomHeading>

        <Pressable onPress={logout}>
          <CustomText>Logout</CustomText>
        </Pressable>

        <Pressable onPress={() => router.push("/onboarding/business/intro")}>
          <CustomText>Onboarding</CustomText>
        </Pressable>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        ></ScrollView>
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
  },
});

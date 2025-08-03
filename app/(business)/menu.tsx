import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { useUserData } from "@/context/userContext";
import { useLogout } from "@/hooks/useAuth";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function MenuScreen() {
  const { userData } = useUserData();
  const { logout } = useLogout();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <InnerContainer style={{ gap: 12, marginTop: 20 }}>
        <Header headerTitle="Menu" style={{ marginBottom: 18 }} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Pressable onPress={logout} style={styles.button}>
            <CustomText style={styles.buttonText}>Log out</CustomText>
          </Pressable>
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
    paddingBottom: Platform.OS === "ios" ? 150 : 30,
    marginTop: 12,
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

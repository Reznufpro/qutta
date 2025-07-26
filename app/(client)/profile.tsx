import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { useLogout } from "@/hooks/useAuth";
import { StatusBar } from "expo-status-bar";
import { AnimatePresence, MotiView } from "moti";
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function ProfileScreen() {
  const { logout } = useLogout();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <InnerContainer style={{ gap: 12, marginTop: 20 }}>
        <Header headerTitle="Profile" style={{ marginBottom: 12 }} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        ></ScrollView>
      </InnerContainer>

      <AnimatePresence exitBeforeEnter>
        <MotiView
          key="submitBtn"
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: -20 }}
          transition={{ type: "timing", duration: 300 }}
          style={styles.wrapper}
        >
          <Pressable style={styles.button} onPress={logout}>
            <CustomText style={styles.buttonText}>Log out</CustomText>
          </Pressable>
        </MotiView>
      </AnimatePresence>
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
  wrapper: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  button: {
    backgroundColor: Colors.light.black,
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 8,
    width: 100,
    maxWidth: 150,
  },
  buttonText: {
    color: Colors.light.white,
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
  },
});

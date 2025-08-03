import { AppVersion } from "@/components/core/profile/settings/appVersion";
import { BackButton } from "@/components/ui/backButton";
import { Header } from "@/components/ui/header";
import { ScreenContainer } from "@/components/ui/screenContainer";
import { StyleSheet, View } from "react-native";

export default function ProfileScreen() {
  return (
    <ScreenContainer>
      <View style={styles.iconRow}>
        <BackButton />
      </View>

      <Header
        headerTitle="Profile"
        style={{ marginTop: 12, marginBottom: 18 }}
      />

      <AppVersion />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: "row",
  },
});

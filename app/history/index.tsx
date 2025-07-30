import { BackButton } from "@/components/ui/backButton";
import { Header } from "@/components/ui/header";
import { ScreenContainer } from "@/components/ui/screenContainer";
import { StyleSheet, View } from "react-native";

export default function HistoryScreen() {
  return (
    <ScreenContainer>
      <View style={styles.iconRow}>
        <BackButton />
      </View>

      <Header
        headerTitle="History"
        style={{ marginTop: 12, marginBottom: 18 }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: "row",
  },
});

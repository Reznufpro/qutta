import { SettingsItem } from "@/components/core/profile/settingItem";
import { BackButton } from "@/components/ui/backButton";
import { Header } from "@/components/ui/header";
import { ScreenContainer } from "@/components/ui/screenContainer";
import { useDelete } from "@/hooks/useAuth";
import { StyleSheet, View } from "react-native";

export default function LoginSecurityScreen() {
  const { deleteAccount } = useDelete();

  return (
    <ScreenContainer>
      <View style={styles.iconRow}>
        <BackButton />
      </View>

      <Header
        headerTitle="Login & Security"
        style={{ marginTop: 8, marginBottom: 18 }}
      />

      <SettingsItem
        header="Deactivate your account"
        subHeader="This cannot be undone"
        btnText="Deactivate"
        func={deleteAccount}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: "row",
  },
});

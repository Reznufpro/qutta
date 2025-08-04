import { InfoBlock } from "@/components/core/profile/infoBlock";
import { BackButton } from "@/components/ui/backButton";
import { Header } from "@/components/ui/header";
import { ScreenContainer } from "@/components/ui/screenContainer";
import { useUserData } from "@/context/userContext";
import { ScrollView, StyleSheet, View } from "react-native";

export default function PersonalInfoScreen() {
  const { userData } = useUserData();

  return (
    <ScreenContainer>
      <View style={styles.iconRow}>
        <BackButton />
      </View>

      <Header
        headerTitle="Personal information"
        style={{ marginTop: 8, marginBottom: 18 }}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <InfoBlock label="First name" value={userData.name} />
        <InfoBlock label="Last name" value={userData.lastName} />
        <InfoBlock label="Email" value={userData.email} />
        <InfoBlock label="Account type" value={userData.role} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: "row",
  },
});

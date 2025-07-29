import { ProfileCard } from "@/components/core/profile/profileCard";
import { BackButton } from "@/components/ui/backButton";
import { Header } from "@/components/ui/header";
import { ScreenContainer } from "@/components/ui/screenContainer";
import { Colors } from "@/constants/Colors";
import { getLegal } from "@/utils";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";

export default function LegalScreen() {
  const legal = getLegal();
  const router = useRouter();

  return (
    <ScreenContainer>
      <View style={styles.iconRow}>
        <BackButton style={{ backgroundColor: Colors.light.muted }} />
      </View>

      <Header headerTitle="Legal" style={{ marginTop: 12, marginBottom: 18 }} />

      <FlatList
        data={legal}
        keyExtractor={(item) => item.label}
        scrollEnabled
        horizontal={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ProfileCard
            icon={item.icon}
            label={item.label}
            iconRight={item.iconRight}
            onPress={() => {
              if (item.link) router.push(item.link);
            }}
          />
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 150,
  },
  iconRow: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
});

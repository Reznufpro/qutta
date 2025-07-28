import { ProfileCard } from "@/components/core/profile/profileCard";
import { CustomDivider } from "@/components/ui/customDivider";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { ScreenContainer } from "@/components/ui/screenContainer";
import { Colors } from "@/constants/Colors";
import { useLogout } from "@/hooks/useAuth";
import { getProfileBottom, getProfileTop } from "@/utils";
import { useRouter } from "expo-router";
import { FlatList, Platform, ScrollView, StyleSheet } from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const { logout } = useLogout();

  const profileBottom = getProfileBottom();
  const profileTop = getProfileTop();

  return (
    <ScreenContainer>
      <Header
        headerTitle="Profile"
        subHeader={
          <CustomText style={{ fontSize: 20, fontFamily: "CarosSoftLight" }}>
            Good Afternoon!{" "}
            <CustomText style={{ fontSize: 20, fontFamily: "Satoshi-Bold" }}>
              Emmanuel
            </CustomText>
          </CustomText>
        }
        style={{ marginBottom: 12 }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          data={profileTop}
          keyExtractor={(item) => item.label}
          scrollEnabled={false}
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

        <CustomDivider />

        <FlatList
          data={profileBottom}
          keyExtractor={(item) => item.label}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <ProfileCard
              icon={item.icon}
              label={item.label}
              iconRight={item.iconRight}
              onPress={() => {
                if (item.func) logout();
                else if (item.link) router.push(item.link);
              }}
            />
          )}
        />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: Platform.OS === "ios" ? 150 : 30,
  },
  listContent: {
    gap: 30,
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

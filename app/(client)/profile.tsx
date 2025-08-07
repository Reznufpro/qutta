import { IdentityCard } from "@/components/core/profile/identityCard";
import { ProfileCard } from "@/components/core/profile/profileCard";
import { AppVersion } from "@/components/core/profile/settings/appVersion";
import { CustomDivider } from "@/components/ui/customDivider";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { ScreenContainer } from "@/components/ui/screenContainer";
import { Colors } from "@/constants/Colors";
import { useUserData } from "@/context/userContext";
import { useLogout } from "@/hooks/useAuth";
import {
  allSettings,
  getFirstName,
  getTimeOfDay,
  handleOpenLink,
} from "@/utils";
import { useRouter } from "expo-router";
import {
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const { userData } = useUserData();
  const { logout } = useLogout();

  const profileAll = allSettings();

  return (
    <ScreenContainer>
      <Header
        headerTitle="Profile"
        subHeader={
          <CustomText style={{ fontSize: 20, fontFamily: "CarosSoftLight" }}>
            {getTimeOfDay()}{" "}
            <CustomText style={{ fontSize: 20, fontFamily: "Satoshi-Bold" }}>
              {getFirstName(userData.name)}
            </CustomText>
          </CustomText>
        }
        style={{ marginBottom: 12 }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {userData && <IdentityCard userData={userData} user />}

        <FlatList
          data={profileAll}
          keyExtractor={(item) => item.label}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProfileCard
              icon={item.icon}
              label={item.label}
              iconRight={item.iconRight}
              onPress={() => {
                if (item.link) router.push(item.link);
                else if (item.href) handleOpenLink(item.href);
              }}
            />
          )}
        />

        <CustomDivider style={{ marginVertical: 40 }} />

        <Pressable onPress={logout} style={styles.button}>
          <CustomText style={styles.buttonText}>Log out</CustomText>
        </Pressable>

        <View style={{ alignItems: "center" }}>
          <AppVersion />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: Platform.OS === "ios" ? 150 : 30,
  },
  button: {
    backgroundColor: Colors.light.black,
    paddingVertical: 14,
    paddingHorizontal: 14,
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 30,
  },
  buttonText: {
    color: Colors.light.white,
    fontFamily: "CarosSoftBold",
    fontSize: 15,
  },
});

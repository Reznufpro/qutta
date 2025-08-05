import { initialLoginState } from "@/components/core/login/getLoggedIn";
import { RoleSelector } from "@/components/core/login/roleSelector";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { ListingButtons } from "@/components/ui/listingButtons";
import { ScreenContainerWithoutAnimation } from "@/components/ui/screenContainer";
import { useUserData } from "@/context/userContext";
import { setRole } from "@/utils";
import { useRouter } from "expo-router";
import { AnimatePresence, MotiView } from "moti";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function SetRoleScreen() {
  const { setUser } = useUserData();
  const [formData, setFormData] = useState(initialLoginState);
  const router = useRouter();

  const handleInputChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleBack = () => router.push("/onboarding");

  const handleNext = async () => {
    console.log(formData.role);

    try {
      const data = await setRole(formData.role);

      console.log(data);

      setUser({ ...data.user });

      router.push("/onboarding/intro");
    } catch (error) {
      console.log("Error creating user", error);
    }
  };

  return (
    <>
      <ScreenContainerWithoutAnimation innerStyle={styles.container}>
        <View style={styles.inner}>
          <View>
            <Header
              headerTitle="Select Role"
              subHeader="This helps us setup your experience."
              style={{ marginBottom: 12 }}
            />

            <AnimatePresence>
              <MotiView
                key="setRole"
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: 20 }}
                transition={{ type: "timing", duration: 400 }}
                style={{
                  paddingTop: 40,
                  gap: 16,
                }}
              >
                <CustomText style={styles.sectionTitle}>
                  Each account has its own features.
                </CustomText>

                <CustomText style={styles.text}>
                  Choose a{" "}
                  <CustomText style={{ fontWeight: "600" }}>Client</CustomText>{" "}
                  account if you are a customer looking for businesses around
                  you to book appointments. By default profiles are set to
                  Client.
                </CustomText>

                <CustomText style={[styles.text, { marginBottom: 30 }]}>
                  Choose a{" "}
                  <CustomText style={{ fontWeight: "600" }}>
                    Business
                  </CustomText>{" "}
                  account if you want to host your business on our platform and
                  receive bookings from the community.
                </CustomText>

                <RoleSelector
                  handleInputChange={handleInputChange}
                  currentRole={formData.role}
                />
              </MotiView>
            </AnimatePresence>
          </View>

          <ListingButtons
            handleBack={handleBack}
            handleNext={handleNext}
            backBtnTitle="Cancel"
            styleContainer={{ marginBottom: 0 }}
          />
        </View>
      </ScreenContainerWithoutAnimation>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "space-between",
  },
  text: {
    fontFamily: "CarosSoftLight",
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Satoshi-Bold",
    marginBottom: 5,
  },
});

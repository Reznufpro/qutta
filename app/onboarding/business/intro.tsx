import { IntroCardListing } from "@/components/core/business/introBusiness/introCard";
import { BackButton } from "@/components/ui/backButton";
import { CustomDivider } from "@/components/ui/customDivider";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { ScreenContainerWithoutAnimation } from "@/components/ui/screenContainer";
import { Colors } from "@/constants/Colors";
import { useBusinessForm } from "@/context/businessContext";
import { introSlides } from "@/utils";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

export default function IntroScreen() {
  const router = useRouter();
  const introUtils = introSlides();
  const { resetForm } = useBusinessForm();

  const handleContinue = () => {
    router.push("/onboarding/business/info");
  };

  return (
    <ScreenContainerWithoutAnimation innerStyle={styles.container}>
      <View style={styles.iconRow}>
        <BackButton func={() => resetForm()} cancel />
      </View>

      <View style={styles.inner}>
        <View>
          <Header
            headerTitle="Let's help you make appointments easier!"
            subHeader="Very easy to get started"
            style={styles.header}
          />

          <FlatList
            data={introUtils}
            keyExtractor={(item) => item.key}
            scrollEnabled={false}
            contentContainerStyle={styles.steps}
            renderItem={({ item, index }) => (
              <MotiView
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  delay: 500 + index * 80,
                  type: "timing",
                  duration: 500,
                }}
              >
                <IntroCardListing
                  title={item.title}
                  desc={item.desc}
                  index={index + 1}
                  image={item.image}
                />
                {index < introUtils.length - 1 && <CustomDivider />}
              </MotiView>
            )}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <CustomText style={styles.buttonText}>Continue</CustomText>
        </TouchableOpacity>
      </View>
    </ScreenContainerWithoutAnimation>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconRow: {
    flexDirection: "row",
  },
  inner: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    marginTop: 12,
    marginBottom: 18,
  },
  steps: {
    marginTop: 30,
  },
  button: {
    backgroundColor: Colors.light.black,
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.light.white,
    fontFamily: "CarosSoftBold",
    fontSize: 18,
  },
});

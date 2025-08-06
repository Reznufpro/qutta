import { CustomListingHeader } from "@/components/ui/customListingHeader";
import { CustomProgressBar } from "@/components/ui/customProgressBar";
import { InnerContainer } from "@/components/ui/innerContainer";
import { ListingButtons } from "@/components/ui/listingButtons";
import { blurhash } from "@/constants";
import { useUserData } from "@/context/userContext";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AnimatePresence, MotiView } from "moti";
import { useMemo, useState } from "react";
import {
  Dimensions,
  DimensionValue,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

const { width } = Dimensions.get("screen");

const clientOnboardingData = [
  {
    heading: "Book Services Instantly",
    subHeading:
      "Easily browse and book appointments with barbers, trainers, wellness experts, and more — all in just a few taps.",
    image: require("../../assets/onBoarding/client.jpg"),
  },
  {
    heading: "Manage your appointments",
    subHeading:
      "You can cancel or rebook appointments at your ease. Save favorite businesses for later.",
    image: require("../../assets/onBoarding/manage.jpg"),
  },
  {
    heading: "Discover Quality Businesses",
    subHeading:
      "Explore local businesses, view their staff schedules, and read reviews — so you always know what to expect.",
    image: require("../../assets/onBoarding/busOpen.jpg"),
  },
];

const businessOnboardingData = [
  {
    heading: "Manage Your Schedule Effortlessly",
    subHeading:
      "Set your business hours, block out time, and let clients book without back-and-forth messages.",
    image: require("../../assets/onBoarding/time.jpg"),
  },
  {
    heading: "Build a Loyal Client Base",
    subHeading:
      "See list of loyal clients, Get discovered by nearby clients ready to book.",
    image: require("../../assets/onBoarding/client.jpg"),
  },
  {
    heading: "Adjust your schedule at ease",
    subHeading:
      "Fill every empty slot. Clients join waitlists and get auto-notified when there’s an opening.",
    image: require("../../assets/onBoarding/calendar.jpg"),
  },
];

export default function IntroScreen() {
  const router = useRouter();
  const { userData } = useUserData();

  const onboardingData = useMemo(
    () =>
      userData.role === "Client"
        ? clientOnboardingData
        : businessOnboardingData,
    [userData.role]
  );

  const [currentIndex, setCurrentIndex] = useState(1);
  const totalIntro = onboardingData.length + 1;

  const progressPercentage: DimensionValue = `${
    (currentIndex / onboardingData.length) * 100
  }%`;
  const currentItem = onboardingData[currentIndex - 1];

  const handleNext = () => {
    if (currentIndex < totalIntro - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      if (userData.role === "Client") {
        router.push("/(client)/home");
      } else {
        router.push("/onboarding/business/intro");
      }
    }
  };

  const handleSkip = () => router.push("/onboarding");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <InnerContainer style={{ flex: 1, justifyContent: "space-between" }}>
        <View>
          <CustomProgressBar progressPercentage={progressPercentage} />

          <AnimatePresence exitBeforeEnter>
            <MotiView
              key={currentIndex}
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -20 }}
              transition={{ type: "timing", duration: 400 }}
              style={{
                width: "100%",
                justifyContent: "center",
              }}
            >
              <CustomListingHeader
                heading={currentItem.heading}
                subHeading={currentItem.subHeading}
              />

              <View style={styles.imageContainer}>
                <Image
                  source={currentItem.image}
                  placeholder={blurhash}
                  style={styles.image}
                  contentFit="cover"
                  cachePolicy="memory-disk"
                />
              </View>
            </MotiView>
          </AnimatePresence>
        </View>

        <ListingButtons
          backBtnTitle="Cancel"
          handleBack={handleSkip}
          handleNext={handleNext}
        />
      </InnerContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    width: width,
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    marginTop: 25,
    overflow: "hidden",
    alignSelf: "center",
    borderRadius: 15,
    width: 300,
    height: 500,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

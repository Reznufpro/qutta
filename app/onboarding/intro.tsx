import { InnerContainer } from "@/components/ui/innerContainer";
import { ListingButtons } from "@/components/ui/listingButtons";
import { Dimensions, SafeAreaView, StyleSheet } from "react-native";

const { width } = Dimensions.get("screen");

export default function IntroScreen() {
  const handleNext = () => {};

  const handleSkip = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <InnerContainer style={{ flex: 1, justifyContent: "space-between" }}>
        <ListingButtons handleBack={handleSkip} handleNext={handleNext} />
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

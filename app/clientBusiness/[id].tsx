import { ItemImagesCarousel } from "@/components/core/business/clientBusiness/itemImgCarousel";
import { BackButton } from "@/components/ui/backButton";
import { useLocalSearchParams } from "expo-router";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

const { height } = Dimensions.get("window");

interface clientBusinessProps {}

export default function ClientBusinessScreen() {
  const { id } = useLocalSearchParams();

  return (
    <>
      <View style={styles.imageContainer}>
        {/* <ItemImagesCarousel images={selectedItem?.image} /> */}

        <View style={styles.iconRow}>
          <BackButton />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}></ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  imageContainer: {
    width: "100%",
    height: height / 2.5,
    position: "relative",
  },
  iconRow: {
    position: "absolute",
    left: 20,
    top: 60,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

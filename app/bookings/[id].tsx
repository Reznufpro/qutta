import { BackButton } from "@/components/ui/backButton";
import { mockBooking } from "@/utils";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

const { height } = Dimensions.get("window");

export default function BookingsItemScreen() {
  const { id } = useLocalSearchParams();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={mockBooking.img} style={styles.image} />

        <View style={styles.iconRow}>
          <BackButton />
        </View>
      </View>

      <View style={styles.content}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  lottie: {
    width: 200,
    height: 200,
  },
  imageContainer: {
    width: "100%",
    height: height / 2.5,
    position: "relative",
  },
  image: {
    width: "100%",
    height: height / 2.8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
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
  content: {
    padding: 16,
    gap: 12,
  },
});

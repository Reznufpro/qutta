import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

interface IntroCardListingProps {
  title: string;
  desc: string;
  image: any;
  index: number;
}

export const IntroCardListing = ({
  title,
  desc,
  image,
  index,
}: IntroCardListingProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <CustomText style={styles.indexText}>{index}.</CustomText>
        <View style={styles.content}>
          <CustomText style={styles.title}>{title}</CustomText>
          <CustomText style={styles.desc}>{desc}</CustomText>
        </View>
      </View>

      <Image source={image} style={styles.cardImage} contentFit="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  indexText: {
    fontSize: 16,
    fontFamily: "Satoshi-Bold",
  },
  content: {
    maxWidth: 280,
  },
  title: {
    fontSize: 17,
    marginBottom: 4,
    fontFamily: "Satoshi-Bold",
  },
  desc: {
    fontSize: 15,
    fontFamily: "CarosSoftLight",
    lineHeight: 20,
    color: Colors.light.textSecondary,
  },
  cardImage: {
    width: 70,
    height: 70,
  },
});

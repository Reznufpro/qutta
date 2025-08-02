import CustomText from "@/components/ui/customText";
import { blurhash } from "@/constants";
import { Colors } from "@/constants/Colors";
import { ImageBackground } from "expo-image";
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

const { width } = Dimensions.get("window");

interface BusinessCardProps {
  img: string[];
  title: string;
  subtitle: React.ReactNode;
  extra?: string;
  heading?: string;
  tag?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const BusinessCard = ({
  img,
  tag,
  subtitle,
  extra,
  title,
}: BusinessCardProps) => {
  return (
    <View style={styles.containerBig}>
      <View style={[styles.overlay]} />
      <ImageBackground
        source={{ uri: img[0] }}
        placeholder={blurhash}
        style={styles.background}
        imageStyle={{
          objectFit: "cover",
          width: width - 40,
          height: 400,
          borderRadius: 15,
          overflow: "hidden",
        }}
      >
        <View style={styles.innerCont}>
          {tag}

          <View style={styles.bottomCont}>
            <View style={{ gap: 5 }}>
              {subtitle && (
                <CustomText style={styles.subtext}>{subtitle}</CustomText>
              )}

              {extra && (
                <CustomText style={styles.extraText}>{extra}</CustomText>
              )}
            </View>

            {title && <CustomText style={styles.titleText}>{title}</CustomText>}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  containerBig: {
    borderRadius: 15,
    height: 400,
    width: "100%",
    marginTop: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1,
    borderRadius: 15,
  },
  background: {
    height: 400,
    width: 310,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 25,
  },
  innerCont: {
    flexDirection: "column",
    paddingHorizontal: 10,
    alignContent: "flex-start",
    justifyContent: "space-between",
    height: "100%",
    width: 170,
    zIndex: 2,
  },
  bottomCont: {
    flexDirection: "column",
    width: 250,
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 18,
  },
  subtext: {
    color: Colors.light.white,
    fontFamily: "CarosSoftBold",
    fontSize: 15,
    lineHeight: 24,
  },
  extraText: {
    color: Colors.light.muted,
    fontSize: 14,
    fontFamily: "CarosSoftBold",
  },
  titleText: {
    fontFamily: "CormorantGaramond-Bold",
    fontSize: 28,
    lineHeight: 30,
    color: Colors.light.white,
  },
});

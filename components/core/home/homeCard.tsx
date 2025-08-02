import CustomHeading from "@/components/ui/customHeading";
import CustomText from "@/components/ui/customText";
import { blurhash } from "@/constants";
import { Colors } from "@/constants/Colors";
import { marketingCards } from "@/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ImageBackground } from "expo-image";
import { Dimensions, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");

interface HomeCardT {
  img: string[];
  name: string;
  location?: string;
  distance?: string | undefined;
  tag?: "Recommended" | "New" | "Popular" | "Open Now";
  rating?: number;
}

export const HomeCard = ({
  img,
  name,
  rating = 4.5,
  distance = "3km away",
  location,
  tag,
}: HomeCardT) => {
  return (
    <View style={styles.container}>
      <View style={styles.overlay} />
      <ImageBackground
        source={{ uri: img[0] }}
        style={styles.background}
        placeholder={blurhash}
        imageStyle={{
          objectFit: "cover",
          borderRadius: 15,
          height: 400,
          width: 310,
        }}
      >
        <View style={styles.innerCont}>
          <View style={styles.tag}>
            <CustomText style={[styles.text, { textAlign: "center" }]}>
              {tag}
            </CustomText>
          </View>

          <View style={styles.bottomCont}>
            <View>
              <View style={styles.tagContainer}>
                <CustomText style={styles.ratingText}>
                  {rating === 0 ? "New" : rating}
                </CustomText>
                <Ionicons name="star" size={14} color={Colors.light.white} />
              </View>

              <CustomText style={styles.distanceText}>{location}</CustomText>
            </View>

            <CustomText style={styles.nameText}>{name}</CustomText>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export const HeroCardBig = ({
  img,
  title,
  subtitle,
  extra,
  heading,
  style,
}: marketingCards) => {
  return (
    <View
      style={[
        {
          paddingTop: 8,
          marginBottom: 30,
          gap: 15,
        },
        style,
      ]}
    >
      {heading && (
        <CustomHeading
          style={{
            fontFamily: "Satoshi-Bold",
            color: Colors.light.text,
            textTransform: "capitalize",
            fontSize: 20,
          }}
        >
          {heading}
        </CustomHeading>
      )}

      <View style={styles.containerBig}>
        <View style={[styles.overlay]} />
        <ImageBackground
          source={img}
          style={styles.background}
          placeholder={{ blurhash }}
          imageStyle={{
            objectFit: "cover",
            width: width - 40,
            height: 400,
            borderRadius: 15,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              padding: 12,
              zIndex: 2,
            }}
          >
            <View
              style={[
                styles.bottomCont,
                {
                  alignItems: "flex-start",
                  flexDirection: "column",
                  justifyContent: "space-between",
                },
              ]}
            >
              <View>
                {subtitle && (
                  <CustomText
                    style={[
                      styles.text,
                      {
                        fontFamily: "CarosSoftBold",
                        fontSize: 15,
                        lineHeight: 24,
                      },
                    ]}
                  >
                    {subtitle}
                  </CustomText>
                )}

                {extra && (
                  <CustomText
                    style={[
                      styles.text,
                      {
                        color: Colors.light.muted,
                        fontSize: 14,
                        lineHeight: 20,
                      },
                    ]}
                  >
                    {extra}
                  </CustomText>
                )}
              </View>

              {title && (
                <CustomText
                  style={[
                    styles.text,
                    {
                      fontFamily: "CormorantGaramond-Bold",
                      fontSize: 28,
                      lineHeight: 30,
                    },
                  ]}
                >
                  {title}
                </CustomText>
              )}
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    height: 400,
    width: 310,
  },
  containerBig: {
    borderRadius: 15,
    height: 400,
    width: "100%",
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
  tagContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  tag: {
    borderRadius: 20,
    backgroundColor: "rgba(60, 60, 60, 0.25)",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  bottomCont: {
    flexDirection: "column",
    gap: 18,
    width: 250,
  },
  text: {
    color: Colors.light.background,
    fontSize: 15,
    fontFamily: "CarosSoftBold",
  },
  ratingText: {
    color: Colors.light.white,
    fontFamily: "CarosSoftBold",
    fontSize: 15,
    lineHeight: 24,
  },
  distanceText: {
    color: Colors.light.muted,
    fontFamily: "CarosSoftBold",
    fontSize: 14,
    lineHeight: 20,
  },
  nameText: {
    fontFamily: "CormorantGaramond-Bold",
    fontSize: 28,
    lineHeight: 30,
    color: Colors.light.white,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1,
    borderRadius: 15,
  },
});

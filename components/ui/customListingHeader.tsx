import { Colors } from "@/constants/Colors";
import { StyleProp, StyleSheet, TextStyle, View } from "react-native";
import CustomText from "./customText";

interface CustomLisitngHeaderProps {
  heading: string;
  subHeading: string;
  style?: StyleProp<TextStyle>;
  stylesub?: StyleProp<TextStyle>;
}

export const CustomListingHeader = ({
  heading,
  subHeading,
  style,
  stylesub,
}: CustomLisitngHeaderProps) => {
  return (
    <View style={{ marginVertical: 30, gap: 5 }}>
      <CustomText style={[styles.heading, style]}>{heading}</CustomText>
      <CustomText style={[styles.subheading, stylesub]}>
        {subHeading}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: Colors.light.black,
    fontSize: 24,
    lineHeight: 30,
  },
  subheading: {
    fontSize: 16,
    color: Colors.light.textSecondary,
  },
});

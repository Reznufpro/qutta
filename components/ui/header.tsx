import { Colors } from "@/constants/Colors";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import CustomHeading from "./customHeading";
import CustomText from "./customText";

interface HeaderProps {
  children?: React.ReactNode;
  headerTitle?: string;
  subHeader?: string;
  style?: StyleProp<ViewStyle>;
}

export const Header = ({
  children,
  headerTitle,
  subHeader,
  style,
}: HeaderProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.titlesContainer}>
        <CustomHeading style={styles.header}>{headerTitle}</CustomHeading>

        {subHeader && <CustomText style={styles.text}>{subHeader}</CustomText>}
      </View>
      <View style={styles.childrenContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  childrenContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  titlesContainer: {
    flexDirection: "column",
    gap: 6,
  },
  header: {
    fontFamily: "Satoshi-Bold",
    color: Colors.light.text,
    textTransform: "capitalize",
    fontSize: 23,
  },
  text: {
    fontFamily: "CarosSoftLight",
    fontSize: 16,
    color: Colors.light.textSecondary,
    maxWidth: 290,
  },
});

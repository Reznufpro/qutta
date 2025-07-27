import { Colors } from "@/constants/Colors";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import CustomHeading from "./customHeading";

interface HeaderProps {
  children?: React.ReactNode;
  headerTitle?: string;
  style?: StyleProp<ViewStyle>;
}

export const Header = ({ children, headerTitle, style }: HeaderProps) => {
  return (
    <View style={[styles.container, style]}>
      <CustomHeading
        style={{
          fontFamily: "Satoshi-Bold",
          color: Colors.light.text,
          textTransform: "capitalize",
          fontSize: 23,
        }}
      >
        {headerTitle}
      </CustomHeading>
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
});

import CustomText from "@/components/ui/customText";
import { Pressable, StyleSheet, View } from "react-native";

interface SettingsItemProps {
  header: string;
  subHeader: string;
  btnText: string;
  func: () => void;
  show?: boolean;
}

export const SettingsItem = ({
  header,
  subHeader,
  btnText,
  func,
  show,
}: SettingsItemProps) => {
  return (
    <View style={styles.itemContainer}>
      <View style={{ gap: 5 }}>
        <CustomText style={styles.value}>{header}</CustomText>
        <CustomText style={styles.label}>{subHeader}</CustomText>
      </View>

      <Pressable onPress={func}>
        <CustomText style={styles.btnText}>
          {show ? "Cancel" : btnText}
        </CustomText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: "CarosSoftLight",
  },
  value: {
    fontSize: 16,
    color: "#000",
    maxWidth: 300,
  },
  btnText: {
    fontSize: 16,
    fontFamily: "Satoshi-Bold",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
});

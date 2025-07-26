import { Colors } from "@/constants/Colors";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import CustomText from "./customText";

interface ListingButtonsProps {
  handleBack: () => void;
  handleNext: () => void;
  disabledBack?: boolean;
  disabled?: boolean;
  nextBtnTitle?: string;
  backBtnTitle?: string;
  styleBackText?: StyleProp<TextStyle>;
}

export const ListingButtons = ({
  handleBack,
  handleNext,
  disabledBack,
  disabled,
  nextBtnTitle = "Next",
  backBtnTitle = "Skip",
  styleBackText,
}: ListingButtonsProps) => {
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity onPress={handleBack} disabled={disabledBack}>
        <CustomText style={[styles.backText, styleBackText]}>
          {backBtnTitle}
        </CustomText>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={disabled}
        style={[styles.nextButton, disabled && styles.disabledButton]}
        onPress={handleNext}
      >
        <CustomText style={[styles.buttonText]}>{nextBtnTitle}</CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  backText: {
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
  nextButton: {
    backgroundColor: Colors.light.black,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
    color: Colors.light.white,
  },
  disabledButton: {
    backgroundColor: Colors.light.tabIconDefault,
  },
});

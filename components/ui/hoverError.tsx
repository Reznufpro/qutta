import { Colors } from "@/constants/Colors";
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { ErrorIndicator } from "../core/login/errorIndicator";

const { width } = Dimensions.get("window");

interface HoverErrorProps {
  error: React.ReactNode;
  styleCont?: StyleProp<ViewStyle>;
  close?: () => void;
}

export const HoverError = ({ error, styleCont, close }: HoverErrorProps) => {
  return (
    <View style={[styles.container, styleCont]}>
      <ErrorIndicator
        errors={error}
        styleCard={{ marginTop: 0 }}
        styleText={{
          color: Colors.light.white,
          fontSize: 14,
          fontFamily: "CarosSoftLight",
        }}
        styleIconColor="white"
        styleIconSize={24}
        close={close}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    width: width - 35,
    zIndex: 999,
    backgroundColor: Colors.light.black,
    borderRadius: 5,
    overflow: "hidden",
    paddingVertical: 8,
    paddingHorizontal: 10,
    shadowColor: "#E7E7E7",
    shadowOpacity: 0.6,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
});

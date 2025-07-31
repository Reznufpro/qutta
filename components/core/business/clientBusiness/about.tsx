import CustomText from "@/components/ui/customText";
import { fullBusinessT } from "@/utils";
import { StyleSheet, View } from "react-native";

interface AboutBusinessProps {
  about: fullBusinessT["about"];
}

export const AboutBusiness = ({ about }: AboutBusinessProps) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.aboutText}>{about}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  aboutText: {
    fontFamily: "CarosSoftLight",
    fontSize: 15,
    lineHeight: 25,
  },
});

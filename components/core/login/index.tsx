import CustomText from "@/components/ui/customText";
import { FlexibleModal } from "@/components/ui/flexibleModal";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { GetLoggedIn } from "./getLoggedIn";

const { height } = Dimensions.get("window");

export const Login = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={openModal}>
        <CustomText style={styles.buttonText}>Sign In</CustomText>
      </TouchableOpacity>

      <FlexibleModal
        modalVisible={modalVisible}
        closeModal={() => setModalVisible(false)}
        styles={{ height: height - 150 }}
      >
        <GetLoggedIn
          closeModal={() => setModalVisible(false)}
          func={() => {}}
        />
      </FlexibleModal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.cream,
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 40,
  },
  buttonText: {
    color: Colors.light.black,
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
  },
});

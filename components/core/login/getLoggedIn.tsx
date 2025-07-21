import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { h3 } from "@/constants";
import { FC } from "react";
import { StyleSheet, View } from "react-native";

interface GetLoggedInProps {
  closeModal: () => void;
  func: () => void;
}

export const GetLoggedIn: FC<GetLoggedInProps> = ({ closeModal, func }) => {
  return (
    <InnerContainer>
      <View style={styles.modalHeader}>
        <CustomText style={[h3]}>Login or sign up</CustomText>
      </View>
    </InnerContainer>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    paddingVertical: 12,
    alignItems: "center",
  },
});

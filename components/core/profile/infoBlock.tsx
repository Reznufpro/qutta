import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";

interface InfoBlockProps {
  label: string;
  value: string;
  editFunc?: () => void;
  style?: StyleProp<TextStyle>;
}

export const InfoBlock = ({
  label,
  value,
  editFunc,
  style,
}: InfoBlockProps) => {
  const Content = (
    <View style={styles.editContainer}>
      <CustomText style={[styles.value, style]}>{value || "—"}</CustomText>
      {editFunc && (
        <Ionicons name="create-outline" size={16} color={Colors.light.black} />
      )}
    </View>
  );

  return (
    <View style={styles.infoBlock}>
      <CustomText style={[styles.label]}>{label}</CustomText>

      {editFunc ? (
        <TouchableOpacity onPress={editFunc} activeOpacity={0.7}>
          {Content}
        </TouchableOpacity>
      ) : (
        Content
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoBlock: {
    marginBottom: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingBottom: 10,
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
  editContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

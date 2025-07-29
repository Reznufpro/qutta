import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { profileT } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface ProfileCardProps extends profileT {
  onPress: () => void;
}

export const ProfileCard = ({
  icon,
  label,
  iconRight,
  onPress,
}: ProfileCardProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <Ionicons name={icon} size={24} color={Colors.light.black} />
          <CustomText style={styles.label}>{label}</CustomText>
        </View>

        {iconRight && (
          <Ionicons
            name="chevron-forward"
            size={14}
            color={Colors.light.textSecondary}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    justifyContent: "space-between",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontFamily: "CarosSoftMedium",
    textAlign: "center",
    textTransform: "capitalize",
    color: Colors.light.black,
  },
});

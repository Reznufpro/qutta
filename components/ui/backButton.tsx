import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface BackIconProps {
  color?: string;
  size?: number;
  iconName?: keyof typeof Ionicons.glyphMap;
  style?: StyleProp<ViewStyle>;
  func?: boolean;
}

export const BackButton = ({
  color = "#000",
  size = 24,
  iconName = "arrow-back",
  style,
  func,
}: BackIconProps) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <TouchableOpacity style={[styles.icon, style]} onPress={handleBack}>
      <Ionicons name={iconName} size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    padding: 8,
    borderRadius: 20,
  },
});

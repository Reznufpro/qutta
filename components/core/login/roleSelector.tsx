import CustomText from "@/components/ui/customText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { formState } from "./getLoggedIn";

const roles = [
  { value: "Client", icon: "people-circle-outline", desc: "For customers " },
  { value: "Business", icon: "business-outline", desc: "For Owners" },
];

interface RoleSelectorProps {
  handleInputChange: (key: keyof formState, value: string) => void;
  currentRole: formState["role"];
}

export const RoleSelector = ({
  currentRole,
  handleInputChange,
}: RoleSelectorProps) => {
  return (
    <View style={styles.container}>
      {roles.map((role) => {
        const isSelected = currentRole === role.value;

        return (
          <TouchableOpacity
            key={role.value}
            onPress={() => handleInputChange("role", role.value)}
            style={{
              flex: 1,
              paddingVertical: 12,
              backgroundColor: isSelected ? "#000" : "transparent",
              borderRadius: 8,
            }}
          >
            <View style={styles.roleContainer}>
              <View style={styles.roles}>
                <Ionicons
                  name={role.icon as keyof typeof Ionicons.glyphMap}
                  color={isSelected ? "#fff" : "#000"}
                  size={20}
                />
                <CustomText
                  style={{
                    textAlign: "center",
                    color: isSelected ? "#fff" : "#000",
                  }}
                >
                  {role.value}
                </CustomText>
              </View>

              <CustomText
                style={{ color: isSelected ? "#fff" : "#000", fontSize: 13 }}
              >
                {role.desc}
              </CustomText>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 4,
    marginBottom: 30,
  },
  roleContainer: {
    flexDirection: "column",
    gap: 2,
    alignItems: "center",
  },
  roles: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    justifyContent: "center",
  },
});

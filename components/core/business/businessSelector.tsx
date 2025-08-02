import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { useSelectedBusiness } from "@/context/selectedBusinessContext";
import { BusinessData } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface BusinessSelectorProps {
  businesses: BusinessData[];
}

export const BusinessSelector = ({ businesses }: BusinessSelectorProps) => {
  const { selectedBusinessId, setSelectedBusinessId } = useSelectedBusiness();

  const dropdownData = businesses.map((b) => ({
    label: b.name,
    value: b.id,
  }));

  const renderItem = (item: { label: string; value: string }) => (
    <View style={styles.item}>
      <CustomText style={styles.textItem}>{item.label}</CustomText>
      {item.value === selectedBusinessId && (
        <Ionicons
          style={styles.icon}
          color={Colors.light.black}
          name="business-outline"
          size={18}
        />
      )}
    </View>
  );

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={dropdownData}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select your business"
      searchPlaceholder="Search..."
      value={selectedBusinessId}
      onChange={(item) => setSelectedBusinessId(item.value)}
      renderLeftIcon={() => (
        <Ionicons
          style={styles.icon}
          color={Colors.light.black}
          name="business-outline"
          size={18}
        />
      )}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  dropdown: {
    marginBottom: 8,
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Colors.light.textSecondary,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: "500",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

import { Colors } from "@/constants/Colors";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

interface SearchBarProps {
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchBar = ({ setSearchInput }: SearchBarProps) => {
  const [focused, setFocused] = useState(false);
  const [submittedQuery, setSubmittedQuery] = useState("");

  const handleSearch = () => {
    setSearchInput(submittedQuery.trim());
    Keyboard.dismiss();
  };

  const handleClear = () => {
    setSearchInput("");
    setSubmittedQuery("");
  };

  return (
    <View style={[styles.searchContainer, focused && styles.focusedInput]}>
      <Feather name="search" size={20} color="#000" style={styles.icon} />
      <TextInput
        style={styles.searchInput}
        value={submittedQuery}
        onChangeText={(text) => {
          setSubmittedQuery(text);
        }}
        placeholder="Search by business name"
        placeholderTextColor="#c7c7c7"
        returnKeyType="search"
        selectionColor="#000"
        onSubmitEditing={handleSearch}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {submittedQuery.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Ionicons
            name="close-circle-outline"
            size={18}
            color={Colors.light.black}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    alignItems: "center",
    marginBottom: 16,
    width: width - 38,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: Colors.light.textSecondary,
    fontFamily: "CarosSoftLight",
  },
  focusedInput: {
    borderColor: "#000",
    borderWidth: 2,
  },
  icon: {
    marginRight: 8,
  },
  clearButton: {
    paddingLeft: 8,
  },
});

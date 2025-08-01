import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { BusinessForm } from "@/context/businessContext";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface TagsProps {
  form: BusinessForm;
  updateForm: (key: keyof BusinessForm, value: any) => void;
}

interface tagT {
  value: BusinessForm["tag"];
  name: string;
}

const tag: tagT[] = [
  { value: "New", name: "New" },
  { value: "Popular", name: "Popular" },
  { value: "Open Now", name: "Open Now" },
  { value: "Recommended", name: "Recommended" },
];

export const Tags = ({ form, updateForm }: TagsProps) => {
  const [tags, setTags] = useState<BusinessForm["tag"]>(form.tag);

  const handlePress = (tag: BusinessForm["tag"]) => {
    setTags(tag);
    updateForm("tag", tag);
  };

  return (
    <View style={styles.container}>
      {tag.map((item) => {
        const selected = tags === item.value;

        return (
          <Pressable
            style={[styles.bubble, selected && styles.selected]}
            key={item.name}
            onPress={() => handlePress(item.value)}
          >
            <CustomText style={styles.text}>{item.value}</CustomText>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  bubble: {
    borderRadius: 999,
    backgroundColor: Colors.light.black,
    padding: 10,
  },
  text: {
    color: Colors.light.white,
  },
  selected: {
    backgroundColor: Colors.light.highlight,
  },
});

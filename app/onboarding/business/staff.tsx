import { ErrorIndicator } from "@/components/core/login/errorIndicator";
import { CustomProgressBar } from "@/components/ui/customProgressBar";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { HoverButton } from "@/components/ui/hoverButton";
import { InnerContainer } from "@/components/ui/innerContainer";
import { ListingButtons } from "@/components/ui/listingButtons";
import { ScreenContainerWithoutAnimation } from "@/components/ui/screenContainer";
import { Colors } from "@/constants/Colors";
import { useBusinessForm } from "@/context/businessContext";
import { introSlides } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { AnimatePresence, MotiView } from "moti";
import { useMemo, useState } from "react";
import {
  DimensionValue,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function BusinessStaffScreen() {
  const { form, updateForm } = useBusinessForm();
  const router = useRouter();
  const introUtils = introSlides();

  const [focusedInput, setFocusedInput] = useState<number | null>(null);
  const [error, setError] = useState("");

  const progressPercentage: DimensionValue = `${
    (form.current_step / form.total_steps) * 100
  }%`;

  const disabled = useMemo(
    () => form.staff.length <= 0 || !form.staff[0].name,
    [form.staff]
  );

  const addStaffMember = () => {
    updateForm("staff", [...form.staff, { name: "" }]);
  };

  const removeStaffMember = (index: number) => {
    const updated = [...form.staff];
    updated.splice(index, 1);
    updateForm("staff", updated);
  };

  const updateStaffMember = (
    index: number,
    key: "name" | "image",
    value: string
  ) => {
    const updated = [...form.staff];
    updated[index][key] = value;
    updateForm("staff", updated);
  };

  const pickStaffImage = async (index: number) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      selectionLimit: 1,
      allowsMultipleSelection: false,
      quality: 0.7,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      const uri = result.assets[0].uri;

      const info = await FileSystem.getInfoAsync(uri);
      if (info.exists && info.size > 5 * 1024 * 1024) {
        setError("Please select an image smaller than 5MB.");
        return;
      } else {
        setError("");
      }

      updateStaffMember(index, "image", uri);
    }
  };

  const handleBack = () => {
    updateForm("current_step", form.current_step - 1);
    router.back();
  };

  const handleNext = () => {
    if (disabled) {
      setError("You need to add at least one staff. For example: yourself.");
      return;
    }

    try {
      console.log(form.staff);
      updateForm("current_step", form.current_step + 1);
      router.push("/onboarding/business/review");
    } catch (error) {
      console.log("Staff Error;", error);
    }
  };

  return (
    <>
      <ScreenContainerWithoutAnimation innerStyle={styles.container}>
        <CustomProgressBar progressPercentage={progressPercentage} />
        <Header
          headerTitle="Add staff members to your business."
          subHeader="Choose and add staff profiles to give users more freedom when booking."
          style={styles.header}
        >
          <Image
            source={introUtils[1].image}
            style={styles.cardImage}
            contentFit="contain"
          />
        </Header>

        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <AnimatePresence>
              <MotiView
                key="staff"
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: 20 }}
                transition={{ type: "timing", duration: 400 }}
                style={{ paddingTop: 30 }}
              >
                <CustomText style={styles.label}>Add staff profiles</CustomText>

                {form.staff.map((staff, index) => (
                  <View key={index} style={styles.staffRow}>
                    <Pressable
                      onPress={() => pickStaffImage(index)}
                      style={styles.imageWrapper}
                    >
                      {staff.image ? (
                        <Image
                          source={{ uri: staff.image }}
                          style={styles.staffImage}
                          contentFit="contain"
                        />
                      ) : (
                        <View style={styles.placeholderImage}>
                          <Ionicons name="add-circle" size={24} color="#999" />
                        </View>
                      )}
                    </Pressable>

                    <TextInput
                      style={[
                        styles.staffNameInput,
                        focusedInput === index && styles.focusedInput,
                      ]}
                      placeholder="Staff Name"
                      placeholderTextColor="#aaa"
                      value={staff.name}
                      onFocus={() => setFocusedInput(index)}
                      onBlur={() => setFocusedInput(null)}
                      onChangeText={(text) => {
                        updateStaffMember(index, "name", text);
                        setError("");
                      }}
                    />

                    <Pressable
                      onPress={() => removeStaffMember(index)}
                      style={styles.removeButton}
                    >
                      <Ionicons name="remove-circle" size={22} color="#888" />
                    </Pressable>
                  </View>
                ))}

                <Pressable style={styles.addButton} onPress={addStaffMember}>
                  <Ionicons
                    name="add-outline"
                    size={16}
                    color={Colors.light.white}
                  />
                  <CustomText style={styles.addButtonText}>
                    Add Staff Member
                  </CustomText>
                </Pressable>

                {error ? <ErrorIndicator errors={error} /> : null}
              </MotiView>
            </AnimatePresence>
          </TouchableWithoutFeedback>
        </ScrollView>
      </ScreenContainerWithoutAnimation>

      <HoverButton keyId="staff">
        <InnerContainer style={styles.btnContainer}>
          <ListingButtons
            backBtnTitle="Back"
            handleBack={handleBack}
            handleNext={handleNext}
          />
        </InnerContainer>
      </HoverButton>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  btnContainer: {
    paddingVertical: 20,
  },
  header: {
    marginTop: 12,
    marginBottom: 18,
  },
  cardImage: {
    width: 70,
    height: 70,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Satoshi-Bold",
  },
  staffRow: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 8,
    gap: 10,
  },
  imageWrapper: {
    width: 200,
    height: 200,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  staffImage: {
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  staffNameInput: {
    height: 40.5,
    width: 200,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.light.icon,
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  focusedInput: {
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 4,
  },
  removeButton: {
    padding: 4,
  },
  button: {
    backgroundColor: Colors.light.black,
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: Colors.light.white,
    fontFamily: "Satoshi-Bold",
    fontSize: 14,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: Colors.light.black,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    gap: 6,
    alignSelf: "flex-start",
  },
  addButtonText: {
    color: Colors.light.white,
    fontFamily: "Satoshi-Bold",
    fontSize: 14,
  },
});

import { CustomProgressBar } from "@/components/ui/customProgressBar";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { ListingButtons } from "@/components/ui/listingButtons";
import { ScreenContainerWithoutAnimation } from "@/components/ui/screenContainer";
import { Colors } from "@/constants/Colors";
import { useBusinessForm } from "@/context/businessContext";
import { useMapboxRetrieve, useMapboxSuggestions } from "@/hooks/useMapBox";
import { introSlides } from "@/utils";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { AnimatePresence, MotiView } from "moti";
import { useEffect, useRef, useState } from "react";
import {
  DimensionValue,
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const sessionToken = uuidv4();

export default function BusinessLocationScreen() {
  const { form, updateForm } = useBusinessForm();
  const router = useRouter();
  const introUtils = introSlides();

  const locationInputRef = useRef<TextInput>(null);
  const [focusedInput, setFocusedInput] = useState<null | "location">(null);
  const [input, setInput] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const progressPercentage: DimensionValue = `${
    (form.current_step / form.total_steps) * 100
  }%`;

  const { data: suggestions } = useMapboxSuggestions(input, sessionToken);
  const { data: selectedLocation } = useMapboxRetrieve(
    selectedId ?? "",
    sessionToken
  );

  const handleSelect = (item: any) => {
    setSelectedId(item.mapbox_id);
    setInput(item.full_address);
    setShowSuggestions(false);
  };

  useEffect(() => {
    if (selectedLocation?.features?.[0]) {
      const result = selectedLocation.features[0];
      const coords = result.properties.coordinates;

      updateForm("coordinates", {
        location: result.properties.full_address,
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    }
  }, [selectedLocation]);

  const handleBack = () => router.back();

  const handleNext = () => {
    if (form.coordinates?.location) {
      console.log(form.coordinates);
    //   updateForm("current_step", form.current_step + 1);
    }
  };

  return (
    <ScreenContainerWithoutAnimation innerStyle={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View>
            <CustomProgressBar progressPercentage={progressPercentage} />

            <Header
              headerTitle="Share your business address"
              subHeader="Add your business location so your clients can easily find you."
              style={styles.header}
            >
              <Image
                source={introUtils[0].image}
                style={styles.cardImage}
                contentFit="contain"
              />
            </Header>

            <AnimatePresence>
              <MotiView
                key="location"
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: 20 }}
                transition={{ type: "timing", duration: 400 }}
                style={{ paddingTop: 30 }}
              >
                <CustomText style={styles.label}>Location</CustomText>
                <TextInput
                  ref={locationInputRef}
                  style={[
                    styles.input,
                    focusedInput === "location" && styles.focusedInput,
                  ]}
                  placeholder="Enter location"
                  placeholderTextColor="#c7c7c7"
                  keyboardType="default"
                  selectionColor="#000"
                  autoCorrect={false}
                  value={input}
                  onFocus={() => setFocusedInput("location")}
                  onBlur={() => setFocusedInput(null)}
                  onChangeText={(text) => {
                    setInput(text);
                    setShowSuggestions(true);
                  }}
                />

                {showSuggestions &&
                  suggestions?.suggestions &&
                  suggestions?.suggestions?.length > 0 && (
                    <FlatList
                      data={suggestions.suggestions}
                      keyExtractor={(item) => item.mapbox_id}
                      style={styles.dropdown}
                      renderItem={({ item }) => (
                        <Pressable
                          style={styles.dropdownItem}
                          onPress={() => handleSelect(item)}
                        >
                          <CustomText>{item.full_address}</CustomText>
                        </Pressable>
                      )}
                    />
                  )}
              </MotiView>
            </AnimatePresence>
          </View>

          <ListingButtons
            handleBack={handleBack}
            handleNext={handleNext}
            backBtnTitle="Back"
            styleContainer={{ marginBottom: 0 }}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScreenContainerWithoutAnimation>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    marginTop: 12,
    marginBottom: 18,
  },
  cardImage: {
    width: 70,
    height: 70,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.icon,
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    height: 45.5,
    backgroundColor: "#fafafa",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Satoshi-Bold",
  },
  focusedInput: {
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 4,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ddd",
    borderWidth: 1,
    marginTop: 8,
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  noLocationText: {},
});

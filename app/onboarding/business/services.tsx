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
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { AnimatePresence, MotiView } from "moti";
import { useRef, useState } from "react";
import {
  DimensionValue,
  Keyboard,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type Service = {
  title: string;
  time: string;
  price: number;
  description?: string;
};

type Category = {
  title: string;
  services: Service[];
};

export default function BusinessServicesScreen() {
  const { form, updateForm } = useBusinessForm();
  const router = useRouter();
  const introUtils = introSlides();

  const [categories, setCategories] = useState<Category[]>(
    form.categories || []
  );

  const categoryInputRef = useRef<TextInput>(null);
  const [newCategory, setNewCategory] = useState("");

  const [focusedInput, setFocusedInput] = useState<null | "categoryTitle">(
    null
  );
  const [error, setError] = useState("");

  const progressPercentage: DimensionValue = `${
    (form.current_step / form.total_steps) * 100
  }%`;

  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (!trimmed) {
      setError("Category title cannot be empty.");
      return;
    }

    const duplicate = categories.find(
      (cat) => cat.title.toLowerCase() === trimmed.toLowerCase()
    );
    if (duplicate) {
      setError("This category already exists.");
      return;
    }

    setCategories((prev) => [...prev, { title: trimmed, services: [] }]);
    setNewCategory("");
    categoryInputRef.current?.blur();
    setError("");
  };

  const handleRemoveCategory = (index: number) => {
    setCategories((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddService = (categoryIndex: number) => {
    const currentCat = categories[categoryIndex];

    // Optional: Block adding more services if the last one is incomplete
    const lastService = currentCat.services.at(-1);
    if (
      lastService &&
      (!lastService.title.trim() ||
        !lastService.time.trim() ||
        !lastService.price ||
        lastService.price <= 0)
    ) {
      setError(
        "Fill in all fields for the previous service before adding another."
      );
      return;
    }

    setCategories((prev) => {
      const copy = [...prev];
      copy[categoryIndex].services.push({
        title: "",
        time: "",
        price: 0,
        description: "",
      });
      return copy;
    });

    setError("");
  };

  const handleChangeService = (
    categoryIndex: number,
    serviceIndex: number,
    key: keyof Service,
    value: string | number
  ) => {
    setCategories((prev) => {
      const updated = [...prev];
      (updated[categoryIndex].services[serviceIndex][key] as typeof value) =
        value;
      return updated;
    });
  };

  const handleBack = () => {
    updateForm("current_step", form.current_step - 1);
    router.back();
  };

  const handleNext = () => {
    const valid = categories.filter(
      (c) =>
        c.title.trim() &&
        c.services.length > 0 &&
        c.services.every((s) => s.title && s.time && s.price > 0)
    );

    if (valid.length === 0) {
      setError("Please add at least one valid category with services.");
      return;
    }

    try {
      updateForm("categories", valid);
      setError("");

      console.log(form.categories);
      updateForm("current_step", form.current_step + 1);
      router.push("/onboarding/business/staff");
    } catch (error) {
      console.log("Services Error:", error);
    }
  };

  return (
    <>
      <ScreenContainerWithoutAnimation innerStyle={styles.container}>
        <CustomProgressBar progressPercentage={progressPercentage} />
        <Header
          headerTitle="List your services."
          subHeader="Add your services, prices and provide details on each service."
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
                key="addService"
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: 20 }}
                transition={{ type: "timing", duration: 400 }}
                style={{ paddingTop: 30 }}
              >
                <CustomText style={styles.label}>
                  Add categories and services
                </CustomText>

                <View
                  style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
                >
                  <TextInput
                    ref={categoryInputRef}
                    value={newCategory}
                    onChangeText={setNewCategory}
                    placeholder="Category (e.g. Barbering)"
                    placeholderTextColor="#c7c7c7"
                    keyboardType="default"
                    selectionColor="#000"
                    onFocus={() => setFocusedInput("categoryTitle")}
                    onBlur={() => setFocusedInput(null)}
                    style={[
                      styles.input,
                      focusedInput === "categoryTitle" && styles.focusedInput,
                      { flex: 1 },
                    ]}
                  />
                  <TouchableOpacity onPress={handleAddCategory}>
                    <Ionicons name="add-circle" size={28} color="#111" />
                  </TouchableOpacity>
                </View>

                {error ? <ErrorIndicator errors={error} /> : null}

                {categories.map((cat, catIndex) => (
                  <View key={catIndex} style={styles.categoryBox}>
                    <View style={styles.categoryHeader}>
                      <CustomText style={styles.categoryTitle}>
                        {cat.title}
                      </CustomText>
                      <TouchableOpacity
                        onPress={() => handleRemoveCategory(catIndex)}
                      >
                        <Ionicons name="close" size={20} color="gray" />
                      </TouchableOpacity>
                    </View>

                    {cat.services.map((service, svcIndex) => (
                      <View key={svcIndex} style={styles.serviceBox}>
                        <TextInput
                          value={service.title}
                          placeholderTextColor="#c7c7c7"
                          keyboardType="default"
                          selectionColor="#000"
                          style={styles.input}
                          onChangeText={(text) =>
                            handleChangeService(
                              catIndex,
                              svcIndex,
                              "title",
                              text
                            )
                          }
                          placeholder="Service title"
                        />
                        <TextInput
                          value={service.time}
                          placeholderTextColor="#c7c7c7"
                          keyboardType="default"
                          selectionColor="#000"
                          style={styles.input}
                          onChangeText={(text) =>
                            handleChangeService(
                              catIndex,
                              svcIndex,
                              "time",
                              text
                            )
                          }
                          placeholder="Duration (e.g. 30min)"
                        />
                        <TextInput
                          value={service.price.toString()}
                          placeholderTextColor="#c7c7c7"
                          selectionColor="#000"
                          style={styles.input}
                          onChangeText={(text) =>
                            handleChangeService(
                              catIndex,
                              svcIndex,
                              "price",
                              text
                            )
                          }
                          placeholder="Price (e.g. $50)"
                          keyboardType="numeric"
                        />
                        <TextInput
                          value={service.description}
                          style={styles.input}
                          placeholderTextColor="#c7c7c7"
                          keyboardType="default"
                          selectionColor="#000"
                          onChangeText={(text) =>
                            handleChangeService(
                              catIndex,
                              svcIndex,
                              "description",
                              text
                            )
                          }
                          placeholder="Description"
                          multiline
                        />
                      </View>
                    ))}

                    <TouchableOpacity
                      style={styles.addServiceBtn}
                      onPress={() => handleAddService(catIndex)}
                    >
                      <Ionicons name="add" size={16} color="#fff" />
                      <CustomText style={styles.addServiceText}>
                        Add Service
                      </CustomText>
                    </TouchableOpacity>
                  </View>
                ))}
              </MotiView>
            </AnimatePresence>
          </TouchableWithoutFeedback>
        </ScrollView>
      </ScreenContainerWithoutAnimation>

      <HoverButton keyId="servicesBusiness">
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
  input: {
    borderWidth: 1,
    borderColor: Colors.light.icon,
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    height: 45.5,
    backgroundColor: "#fafafa",
  },
  categoryBox: {
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryTitle: {
    fontFamily: "Satoshi-Bold",
    fontSize: 16,
  },
  serviceBox: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    gap: 8,
  },
  addServiceBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 6,
  },
  addServiceText: {
    color: "#fff",
    marginLeft: 4,
    fontSize: 14,
    fontFamily: "Satoshi-Medium",
  },
  focusedInput: {
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 4,
  },
});

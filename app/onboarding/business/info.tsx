import { Tags } from "@/components/core/business/introBusiness/tags";
import { CustomProgressBar } from "@/components/ui/customProgressBar";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { ListingButtons } from "@/components/ui/listingButtons";
import { ScreenContainerWithoutAnimation } from "@/components/ui/screenContainer";
import { Colors } from "@/constants/Colors";
import { useBusinessForm } from "@/context/businessContext";
import { introSlides } from "@/utils";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { AnimatePresence, MotiView } from "moti";
import { useMemo, useRef, useState } from "react";
import {
  DimensionValue,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function BusinessInfoScreen() {
  const introUtils = introSlides();
  const { form, updateForm } = useBusinessForm();
  const router = useRouter();
  const nameInputRef = useRef<TextInput>(null);
  const aboutInputRef = useRef<TextInput>(null);

  const [step, setStep] = useState<0 | 1>(0);
  const [focusedInput, setFocusedInput] = useState<null | "name" | "about">(
    null
  );

  const progressPercentage: DimensionValue = `${
    (form.current_step / form.total_steps) * 100
  }%`;

  const emptyForm = useMemo(
    () => !(form.name && form.about),
    [form.name, form.about]
  );

  const handleBack = () => router.back();

  const handleNext = () => {
    if (emptyForm) return;
    console.log("Submitting form:", form.name, form.about);
    updateForm("current_step", form.current_step + 1);
    router.push("/onboarding/business/location");
  };

  return (
    <ScreenContainerWithoutAnimation innerStyle={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View>
            <CustomProgressBar progressPercentage={progressPercentage} />

            <Header
              headerTitle={introUtils[0].title}
              subHeader="Share your story, location, and what makes your services unique."
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
                key="name"
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: 20 }}
                transition={{ type: "timing", duration: 400 }}
                style={{ paddingTop: 30 }}
              >
                <CustomText style={styles.label}>Business name</CustomText>
                <TextInput
                  ref={nameInputRef}
                  style={[
                    styles.input,
                    focusedInput === "name" && styles.focusedInput,
                  ]}
                  placeholder="E.g. Ragnarok Barbers"
                  placeholderTextColor="#c7c7c7"
                  keyboardType="default"
                  selectionColor="#000"
                  autoCorrect={false}
                  returnKeyType="next"
                  value={form.name}
                  onFocus={() => setFocusedInput("name")}
                  onBlur={() => setFocusedInput(null)}
                  onSubmitEditing={() => setStep(1)}
                  onChangeText={(text) => updateForm("name", text)}
                />
              </MotiView>
            </AnimatePresence>

            <AnimatePresence>
              {step === 1 && (
                <MotiView
                  key="about"
                  from={{ opacity: 0, translateY: 20 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: 20 }}
                  transition={{ type: "timing", duration: 400 }}
                  style={{ paddingTop: 30 }}
                >
                  <CustomText style={styles.label}>About</CustomText>
                  <TextInput
                    ref={aboutInputRef}
                    style={[
                      styles.input,
                      styles.textArea,
                      focusedInput === "about" && styles.focusedInput,
                    ]}
                    placeholder="Give clients a warm welcome, standout!"
                    placeholderTextColor="#c7c7c7"
                    keyboardType="default"
                    selectionColor="#000"
                    autoCorrect={false}
                    multiline
                    numberOfLines={5}
                    value={form.about}
                    onFocus={() => setFocusedInput("about")}
                    onBlur={() => setFocusedInput(null)}
                    onChangeText={(text) => updateForm("about", text)}
                  />
                </MotiView>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {step === 1 && (
                <MotiView
                  key="tags"
                  from={{ opacity: 0, translateY: 20 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: 20 }}
                  transition={{ type: "timing", duration: 400 }}
                  style={{ paddingTop: 30 }}
                >
                  <CustomText style={styles.label}>Tags</CustomText>
                  <Tags form={form} updateForm={updateForm} />
                </MotiView>
              )}
            </AnimatePresence>
          </View>

          <ListingButtons
            handleBack={handleBack}
            handleNext={handleNext}
            disabled={emptyForm}
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
  textArea: {
    height: 120,
    textAlignVertical: "top",
    borderRadius: 5,
  },
  focusedInput: {
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 4,
  },
});

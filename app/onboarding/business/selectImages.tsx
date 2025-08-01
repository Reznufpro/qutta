import { ErrorIndicator } from "@/components/core/login/errorIndicator";
import { CustomProgressBar } from "@/components/ui/customProgressBar";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { ListingButtons } from "@/components/ui/listingButtons";
import { ScreenContainerWithoutAnimation } from "@/components/ui/screenContainer";
import { useBusinessForm } from "@/context/businessContext";
import { introSlides } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { AnimatePresence, MotiView } from "moti";
import { useEffect, useState } from "react";
import {
  DimensionValue,
  Keyboard,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function SelectImagesScreen() {
  const { form, updateForm } = useBusinessForm();
  const router = useRouter();
  const introUtils = introSlides();

  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState<{ uri: string; sizeMB: number }[]>([]);

  const progressPercentage: DimensionValue = `${
    (form.current_step / form.total_steps) * 100
  }%`;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      selectionLimit: 3,
      allowsMultipleSelection: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const selectedWithSize = await Promise.all(
        result.assets.map(async (asset) => {
          const fileInfo = await FileSystem.getInfoAsync(asset.uri);
          const sizeMB =
            fileInfo.exists && fileInfo.size
              ? fileInfo.size / (1024 * 1024)
              : 0;

          return {
            uri: asset.uri,
            sizeMB: Number(sizeMB.toFixed(2)),
          };
        })
      );

      setImages((prev) => {
        const combined = [...prev, ...selectedWithSize].slice(0, 3);
        return combined;
      });
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const hasNoImages = images.length === 0;
    const hasLargeImage = images.some((img) => img.sizeMB > 5);
    setDisabled(hasNoImages || hasLargeImage);

    if (hasLargeImage) {
      setError("Each image must be 5MB or smaller.");
    } else {
      setError("");
    }
  }, [images]);

  const handleBack = () => {
    updateForm("current_step", form.current_step - 1);
    router.back();
  };

  const handleNext = () => {
    if (disabled) return;

    try {
      updateForm(
        "images",
        images.map((img) => img.uri)
      );
      updateForm("current_step", form.current_step + 1);

      console.log(form.images);
      router.push("/onboarding/business/services");
    } catch (error) {
      console.log("Select Images Error:", error);
    }
  };

  const renderImageCard = (uri: string, index: number) => (
    <View key={index} style={styles.imageWrapper}>
      <Image source={{ uri }} style={styles.image} contentFit="cover" />

      <Pressable
        onPress={() => removeImage(index)}
        style={styles.removeIcon}
        hitSlop={10}
      >
        <Ionicons name="close-circle-outline" size={18} color="#fff" />
      </Pressable>
    </View>
  );

  return (
    <ScreenContainerWithoutAnimation innerStyle={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View>
            <CustomProgressBar progressPercentage={progressPercentage} />

            <Header
              headerTitle={introUtils[1].title}
              subHeader="Upload photos to showcase your business. Standout!"
              style={styles.header}
            >
              <Image
                source={introUtils[1].image}
                style={styles.cardImage}
                contentFit="contain"
              />
            </Header>

            <AnimatePresence>
              <MotiView
                key="imageSelect"
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: 20 }}
                transition={{ type: "timing", duration: 400 }}
                style={{ paddingTop: 30 }}
              >
                <CustomText style={styles.label}>
                  Add images of your business.
                </CustomText>

                <View style={styles.gridContainer}>
                  {/* Left full-height slot */}
                  <View style={styles.leftSlot}>
                    {images[0] ? (
                      renderImageCard(images[0].uri, 0)
                    ) : (
                      <Pressable onPress={pickImage} style={styles.addSlot}>
                        <Ionicons name="add-outline" size={28} color="#999" />
                      </Pressable>
                    )}
                  </View>

                  {/* Right stacked slots */}
                  <View style={styles.rightSlots}>
                    {[1, 2].map((i) =>
                      images[i] ? (
                        renderImageCard(images[i].uri, i)
                      ) : (
                        <Pressable
                          key={i}
                          onPress={pickImage}
                          style={styles.addSlot}
                        >
                          <Ionicons name="add-outline" size={24} color="#999" />
                        </Pressable>
                      )
                    )}
                  </View>
                </View>

                {error ? <ErrorIndicator errors={error} /> : null}
              </MotiView>
            </AnimatePresence>
          </View>

          <ListingButtons
            handleBack={handleBack}
            handleNext={handleNext}
            disabled={disabled}
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
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Satoshi-Bold",
  },
  imageWrapper: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  removeIcon: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 12,
    padding: 2,
    zIndex: 1,
  },
  gridContainer: {
    flexDirection: "row",
    gap: 12,
    height: 200,
  },
  leftSlot: {
    flex: 1,
    aspectRatio: 3 / 4.9,
    borderRadius: 12,
    overflow: "hidden",
  },
  rightSlots: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 10,
    height: 310,
  },
  addSlot: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    height: 150,
  },
});

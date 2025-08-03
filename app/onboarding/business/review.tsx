import { ReviewRow } from "@/components/core/business/reviewRow";
import { CustomProgressBar } from "@/components/ui/customProgressBar";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { HoverButton } from "@/components/ui/hoverButton";
import { InnerContainer } from "@/components/ui/innerContainer";
import { ListingButtons } from "@/components/ui/listingButtons";
import { ScreenContainerWithoutAnimation } from "@/components/ui/screenContainer";
import { useBusinessForm } from "@/context/businessContext";
import { useUserData } from "@/context/userContext";
import { useCreateBusiness } from "@/hooks/useCreateBusiness";
import { introSlides } from "@/utils";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { AnimatePresence, MotiView } from "moti";
import {
  DimensionValue,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function BusinessReviewScreen() {
  const { form, updateForm, resetForm } = useBusinessForm();
  const { userData } = useUserData();

  console.log(userData.lastName);
  const router = useRouter();
  const introUtils = introSlides();
  const {
    mutateAsync: submitBusiness,
    isSuccess,
    error,
    isPending,
  } = useCreateBusiness();

  const progressPercentage: DimensionValue = `${
    (form.current_step / form.total_steps) * 100
  }%`;

  const isFormValid =
    form.name &&
    form.coordinates?.location &&
    form.coordinates?.latitude &&
    form.coordinates?.longitude &&
    form.phone_number &&
    form.about &&
    form.images.length > 0 &&
    form.staff.length > 0 &&
    form.categories.length > 0;

  const handleBack = () => {
    updateForm("current_step", form.current_step - 1);
    router.back();
  };

  const handleSubmit = async () => {
    if (!isFormValid) {
      alert("Please complete all sections before submitting.");
      return;
    }

    try {
      // validate no item thats needed in the form is empty
      console.log("Submitting business form", form);

      const formData = new FormData();

      // 1. Business images
      form.images.forEach((uri: string, index: number) => {
        const fileName = uri.split("/").pop() || `image_${index}.jpg`;
        const fileType = fileName.endsWith(".png") ? "image/png" : "image/jpeg";

        formData.append("images", {
          uri,
          name: fileName,
          type: fileType,
        } as any);

        console.log("Uploading image:", uri, fileType, fileName);
      });

      // 2. Staff images
      form.staff.forEach((staff: any) => {
        if (staff.image) {
          formData.append("staffImages", {
            uri: staff.image,
            name: staff.image.split("/").pop() || "staff.jpg",
            type: "image/jpeg",
          } as any);
        }
      });

      // 3. Other form fields
      formData.append("name", form.name);
      formData.append("phone_number", form.phone_number || "");
      formData.append("tag", form.tag || "");
      formData.append("about", form.about || "");
      formData.append("coordinates", JSON.stringify(form.coordinates));
      formData.append(
        "staff",
        JSON.stringify(form.staff.map(({ name }) => ({ name })))
      );
      formData.append("categories", JSON.stringify(form.categories));

      await submitBusiness(formData);

      console.log("Business submitted successfully");
      resetForm();
      router.push("/onboarding/business/success");
    } catch (error) {
      console.log("Submit error", error);
    }
  };

  return (
    <>
      <ScreenContainerWithoutAnimation innerStyle={styles.container}>
        <CustomProgressBar progressPercentage={progressPercentage} />
        <Header
          headerTitle="Review and List your business"
          subHeader="Review, go back, make changes if needed and submit."
          style={styles.header}
        >
          <Image
            source={introUtils[2].image}
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
                style={{ paddingTop: 30, gap: 20 }}
              >
                <View>
                  <CustomText style={styles.sectionTitle}>
                    - Business info
                  </CustomText>
                  <ReviewRow label="Name" value={form.name} />
                  <ReviewRow label="About" value={form.about} />
                  <ReviewRow
                    label="Location"
                    value={form.coordinates?.location}
                  />
                  <ReviewRow label="Phone number" value={form.phone_number} />
                </View>

                <View>
                  <CustomText style={styles.sectionTitle}> - Images</CustomText>

                  {form.images.length > 0 ? (
                    <ScrollView horizontal>
                      {form.images.map((img, i) => (
                        <Image
                          key={i}
                          source={{ uri: img }}
                          style={styles.previewImage}
                        />
                      ))}
                    </ScrollView>
                  ) : (
                    <CustomText style={styles.warning}>
                      No images added
                    </CustomText>
                  )}
                </View>

                <View>
                  <CustomText style={styles.sectionTitle}> - Staff</CustomText>

                  <View
                    style={{ flexDirection: "row", flexWrap: "wrap", gap: 20 }}
                  >
                    {form.staff.length > 0 ? (
                      form.staff.map((member, i) => (
                        <View key={i} style={styles.staffRow}>
                          {member.image && (
                            <Image
                              source={{ uri: member.image }}
                              style={styles.staffImage}
                            />
                          )}
                          <CustomText
                            style={{
                              fontFamily: "CarosSoftMedium",
                              fontSize: 14,
                            }}
                          >
                            {member.name}
                          </CustomText>
                        </View>
                      ))
                    ) : (
                      <CustomText style={styles.warning}>
                        No staff added
                      </CustomText>
                    )}
                  </View>
                </View>

                <View>
                  <CustomText style={styles.sectionTitle}>
                    - Services
                  </CustomText>

                  {form.categories.length > 0 ? (
                    form.categories.map((cat, i) => (
                      <View key={i} style={styles.categoryBlock}>
                        <CustomText style={styles.categoryTitle}>
                          {cat.title}
                        </CustomText>
                        {cat.services.map((srv, j) => (
                          <View key={j} style={styles.serviceRow}>
                            <CustomText style={styles.serviceTitle}>
                              • {srv.title}
                            </CustomText>
                            <CustomText style={styles.serviceTitle}>
                              {srv.time} • ${srv.price}
                            </CustomText>
                          </View>
                        ))}
                      </View>
                    ))
                  ) : (
                    <CustomText style={styles.warning}>
                      No categories/services added
                    </CustomText>
                  )}
                </View>
              </MotiView>
            </AnimatePresence>
          </TouchableWithoutFeedback>
        </ScrollView>
      </ScreenContainerWithoutAnimation>

      <HoverButton keyId="review">
        <InnerContainer style={styles.btnContainer}>
          <ListingButtons
            backBtnTitle="Back"
            disabledBack={isPending}
            disabled={!isFormValid || isPending}
            nextBtnTitle={isPending ? "Submitting..." : "Submit"}
            handleBack={handleBack}
            handleNext={handleSubmit}
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
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Satoshi-Bold",
    marginBottom: 15,
  },
  warning: {
    color: "#999",
    fontSize: 14,
    marginBottom: 10,
    fontFamily: "CarosSoftLight",
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 10,
  },
  staffRow: {
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  },
  staffImage: {
    width: 60,
    height: 60,
    borderRadius: 999,
  },
  categoryBlock: {
    marginBottom: 10,
    backgroundColor: "#f8f8f8",
    paddingBottom: 10,
    borderRadius: 8,
  },
  categoryTitle: {
    fontFamily: "Satoshi-Bold",
    fontSize: 16,
    marginBottom: 6,
  },
  serviceTitle: {
    fontFamily: "CarosSoftLight",
    fontSize: 14,
  },
  serviceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
  },
});

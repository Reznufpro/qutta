import { BusinessCard } from "@/components/core/business/businessCard";
import CustomHeading from "@/components/ui/customHeading";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { useUserData } from "@/context/userContext";
import { usegetBusinessesByUserId } from "@/hooks/useCreateBusiness";
import { getShortLocation } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

export default function BusinessScreen() {
  const { userData } = useUserData();
  const { data: business } = usegetBusinessesByUserId(userData.id);
  const router = useRouter();

  const handlePress = (id: string) => {
    router.push({ pathname: "/business/[id]", params: { id: id } });
  };

  const handleGetStarted = () => router.push("/onboarding/business/intro");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <InnerContainer style={{ gap: 12, marginTop: 20 }}>
        <Header headerTitle="Your businesses" style={{ marginBottom: 18 }}>
          <Pressable style={styles.addButton} onPress={handleGetStarted}>
            <Ionicons name="add" size={20} color={Colors.light.black} />
          </Pressable>
        </Header>

        {business && business.length > 0 && (
          <FlatList
            data={business}
            keyExtractor={(item) => item.id}
            scrollEnabled
            horizontal={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => {
              return (
                <Pressable onPress={() => handlePress(item.id)}>
                  <BusinessCard
                    img={item.image}
                    title={item.name}
                    extra={`${getShortLocation(item.coordinates?.location)}`}
                    subtitle={
                      <View style={styles.arrange}>
                        <CustomText style={styles.text}>
                          {item.rating === 0 ? "New" : item.rating}
                        </CustomText>

                        <Ionicons
                          name="star"
                          size={14}
                          color={Colors.light.white}
                        />
                      </View>
                    }
                    tag={
                      <View style={styles.tag}>
                        <Ionicons name="ellipse" size={12} color="#12FF80" />
                        <CustomText style={styles.tagText}>Live</CustomText>
                      </View>
                    }
                  />
                </Pressable>
              );
            }}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <CustomHeading style={styles.headin}>
                  You have no businesses yet
                </CustomHeading>

                <CustomText style={styles.emptyText}>
                  Your businesses will show here once you create one.
                </CustomText>

                <Pressable style={styles.button} onPress={handleGetStarted}>
                  <CustomText style={styles.buttonText}>Get started</CustomText>
                </Pressable>
              </View>
            }
          />
        )}
      </InnerContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAF7",
  },
  listContent: {
    gap: 15,
    paddingBottom: 150,
  },
  text: {
    fontFamily: "CarosSoftLight",
    fontSize: 15,
    color: Colors.light.background,
  },
  emptyContainer: {
    flexDirection: "column",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
  },
  headin: {
    fontFamily: "CarosSoftBold",
    textAlign: "center",
    fontSize: 18,
    textTransform: "capitalize",
    color: Colors.light.black,
  },
  emptyText: {
    fontFamily: "Satoshi-Bold",
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
    color: Colors.light.textSecondary,
    maxWidth: 350,
  },
  button: {
    backgroundColor: Colors.light.black,
    paddingVertical: 14,
    paddingHorizontal: 14,
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 40,
  },
  buttonText: {
    color: Colors.light.white,
    fontFamily: "CarosSoftBold",
    fontSize: 15,
  },
  arrange: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  tagText: {
    fontFamily: "Satoshi-Bold",
    fontSize: 12,
    color: Colors.light.black,
  },
  tag: {
    borderRadius: 20,
    alignItems: "center",
    gap: 5,
    flexDirection: "row",
    backgroundColor: Colors.light.white,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  addButton: {
    borderRadius: 999,
    padding: 6,
    backgroundColor: Colors.light.muted,
  },
});

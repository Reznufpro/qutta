import { BusinessSelector } from "@/components/core/business/businessSelector";
import { ClientList } from "@/components/core/business/clientList";
import CustomHeading from "@/components/ui/customHeading";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { useSelectedBusiness } from "@/context/selectedBusinessContext";
import { useUserData } from "@/context/userContext";
import { useGetClientList } from "@/hooks/useBooking";
import { usegetBusinessesByUserId } from "@/hooks/useCreateBusiness";
import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

export default function WaitlistScreen() {
  const { userData } = useUserData();
  const { data: businesses } = usegetBusinessesByUserId(userData.id);
  const { selectedBusinessId, setSelectedBusinessId } = useSelectedBusiness();

  const { data: clientList, isLoading } = useGetClientList(
    selectedBusinessId as string
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <InnerContainer style={{ gap: 12, marginTop: 20 }}>
        <Header headerTitle="Client list" style={{ marginBottom: 12 }} />

        <CustomText style={styles.text}>Your Clients so far</CustomText>

        {businesses && (
          <BusinessSelector
            businesses={businesses}
            selectedBusinessId={selectedBusinessId}
            setSelectedBusinessId={setSelectedBusinessId}
          />
        )}

        {isLoading ? (
          <CustomText style={styles.emptyText}>Loading...</CustomText>
        ) : (
          <FlatList
            data={clientList?.clients}
            keyExtractor={(item) => item.id}
            scrollEnabled
            horizontal={false}
            contentContainerStyle={styles.scrollContent}
            renderItem={({ item }) => {
              return <ClientList clients={item} />;
            }}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <CustomHeading style={styles.headin}>
                  You have no client list yet
                </CustomHeading>

                <CustomText style={styles.emptyText}>
                  Once clients start booking with your business you will see
                  them here
                </CustomText>
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
  scrollContent: {
    paddingBottom: Platform.OS === "ios" ? 70 : 30,
  },
  text: {
    fontSize: 18,
    color: Colors.light.black,
    fontFamily: "CarosSoftBold",
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
});

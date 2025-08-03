import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { ClientsEntity } from "@/types";
import { getFirstName, handleOpenEmail, trimTextToOneLine } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

interface ClientListProps {
  clients: ClientsEntity;
}

export const ClientList = ({ clients }: ClientListProps) => {
  const { name, lastName, email } = clients;

  return (
    <View style={styles.card}>
      <View style={styles.cardInner}>
        <View>
          <CustomText style={[styles.confirmed, { color: Colors.light.black }]}>
            {getFirstName(name)} {getFirstName(lastName)}
          </CustomText>
        </View>

        <Pressable
          style={[
            styles.statusContainer,
            { backgroundColor: Colors.light.black },
          ]}
          onPress={() => handleOpenEmail(email)}
        >
          <Ionicons
            name="mail-outline"
            size={16}
            color={Colors.light.highlight}
          />
          <CustomText style={styles.confirmed}>
            {trimTextToOneLine(email, 10)}
          </CustomText>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: Colors.light.white,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusContainer: {
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    alignSelf: "flex-start",
  },
  confirmed: {
    fontFamily: "Satoshi-Bold",
    fontSize: 15,
    color: Colors.light.white,
  },
  text: {
    fontSize: 12,
    color: Colors.light.black,
    fontFamily: "CarosSoftLight",
  },
});

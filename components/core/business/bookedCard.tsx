import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { OwnerBookingReturnType } from "@/types";
import { capitalize, getFirstName, getInitials } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useMemo } from "react";
import {
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  UIManager,
  View,
} from "react-native";
import { ServiceSummary } from "../bookings/serviceSummary";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface BookedCardProps {
  item: OwnerBookingReturnType;
  index: number;
  expandedId: number | null;
  setExpandedId: React.Dispatch<React.SetStateAction<number | null>>;
  cancel: () => void;
}

export const BookedCard = ({
  item,
  index,
  expandedId,
  setExpandedId,
  cancel,
}: BookedCardProps) => {
  const isExpanded = expandedId === index;

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(isExpanded ? null : index);
  };

  const total = useMemo(() => {
    const prices = item.service?.map((s) => Number(s.price) || 0);
    return prices?.reduce((acc, curr) => acc + curr, 0);
  }, []);

  const statusMap = {
    confirmed: {
      icon: "checkmark-done-circle-outline" as keyof typeof Ionicons.glyphMap,
      color: Colors.light.black,
    },
    cancelled: {
      icon: "close-circle-outline" as keyof typeof Ionicons.glyphMap,
      color: "red",
    },
  };

  const { color: statusColor, icon: statusIcon } = statusMap[item.status];

  return (
    <Pressable style={styles.card} onPress={toggleExpand}>
      <View style={styles.cardInner}>
        <View>
          <CustomText style={[styles.confirmed, { color: Colors.light.black }]}>
            {getFirstName(item.client.name)}
          </CustomText>
        </View>

        <View>
          <CustomText style={styles.text}>{item.datetime}</CustomText>
        </View>

        <View
          style={[styles.statusContainer, { backgroundColor: statusColor }]}
        >
          <Ionicons
            name={statusIcon}
            size={16}
            color={Colors.light.highlight}
          />
          <CustomText style={styles.confirmed}>
            {capitalize(item.status)}
          </CustomText>
        </View>
      </View>

      {isExpanded && (
        <View style={{ paddingTop: 24 }}>
          <CustomText style={styles.sectionTitle}>
            - {item.business_name}
          </CustomText>

          {item.staff?.id && (
            <View style={{ paddingTop: 16, gap: 5 }}>
              <CustomText style={styles.sectionTitle}>Staff</CustomText>

              <View style={styles.itemContainer}>
                <View style={styles.avatar}>
                  {item.staff?.image ? (
                    <Image
                      source={item.staff?.image}
                      style={styles.avatarImg}
                    />
                  ) : (
                    <CustomText style={styles.avatarText}>
                      {getInitials(item.staff?.name || "")}
                    </CustomText>
                  )}
                </View>

                <View style={{ paddingTop: 10 }}>
                  <CustomText style={styles.staffText}>
                    {item.staff?.name}
                  </CustomText>
                </View>
              </View>
            </View>
          )}

          <View style={{ marginTop: 20, gap: 12 }}>
            <CustomText style={styles.sectionTitle}>Overview</CustomText>

            <View>
              {item.service?.map((s) => (
                <ServiceSummary
                  key={`${s.title}-${s.price}`}
                  serviceTitle={s.title}
                  price={s.price.toString()}
                />
              ))}
            </View>

            {/* Total */}
            <View style={styles.totalSection}>
              <CustomText style={styles.totalLabel}>Total</CustomText>
              <CustomText style={styles.totalLabel}>MX${total}</CustomText>
            </View>
          </View>

          <Pressable
            style={styles.cancelButton}
            onPress={() => {
              console.log("Cancel");
            }}
          >
            <CustomText style={styles.buttonText}>
              Cancel appointment
            </CustomText>
          </Pressable>
        </View>
      )}
    </Pressable>
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
  cancelButton: {
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
    marginTop: 15,
    gap: 5,
    alignSelf: "flex-start",
  },
  confirmed: {
    fontFamily: "Satoshi-Bold",
    fontSize: 15,
    color: Colors.light.white,
  },
  sectionTitle: {
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
  },
  totalSection: {
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
    paddingTop: 24,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: "CarosSoftBold",
  },
  text: {
    fontSize: 12,
    color: Colors.light.black,
    fontFamily: "CarosSoftLight",
  },
  itemContainer: {
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    maxWidth: 80,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 999,
    backgroundColor: Colors.light.highlight,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 999,
    objectFit: "cover",
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "600",
    color: "#fff",
    fontFamily: "CarosSoftBold",
  },
  staffText: {
    fontFamily: "CarosSoftMedium",
    fontSize: 15,
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
  },
});

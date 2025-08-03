import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { AvailabilityEntry, BusinessData } from "@/types";
import { getTodaySchedule, handleDirections } from "@/utils";
import { MotiView } from "moti";
import { FlatList } from "react-native";
import { businessCards, InfoRow } from "../bookings/infoRow";

interface ClientActionsProps {
  closeModal: () => void;
  toggleFavorite: () => void;
  isFavorited: boolean | undefined;
  businessData: BusinessData;
  availability: AvailabilityEntry[];
}

export const ClientActions = ({
  closeModal,
  isFavorited,
  availability,
  businessData,
  toggleFavorite,
}: ClientActionsProps) => {
  return (
    <InnerContainer style={{ paddingBottom: 20 }}>
      <FlatList
        data={businessCards}
        scrollEnabled={false}
        renderItem={({ item, index }) => {
          const subtitleItem =
            item.title === "Getting there"
              ? businessData.coordinates?.location
              : item.title === "Opening hours"
              ? getTodaySchedule(availability)
              : item.subtitle;

          return (
            <MotiView
              from={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                delay: index * 100,
                type: "timing",
                duration: 300,
              }}
              key={`${item.title}-${index}`}
            >
              <InfoRow
                materialicon={item.materialicon}
                ionicon={
                  item.favorite
                    ? isFavorited
                      ? "heart"
                      : "heart-outline"
                    : item.ionicon
                }
                title={
                  item.favorite
                    ? isFavorited
                      ? "Remove from favorite"
                      : "Add to favorite"
                    : item.title
                }
                subtitle={subtitleItem}
                index={index}
                item={businessCards}
                iconColor={
                  item.favorite && isFavorited ? "red" : Colors.light.highlight
                }
                onPress={() => {
                  if (item.link)
                    handleDirections({
                      location: businessData.coordinates?.location,
                    });
                  else if (item.favorite) toggleFavorite();
                  else if (item.calendar) console.log("calendar");
                }}
              />
            </MotiView>
          );
        }}
      />
    </InnerContainer>
  );
};

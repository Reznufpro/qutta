import { InnerContainer } from "@/components/ui/innerContainer";
import { BusinessData } from "@/types";
import { handleDirections } from "@/utils";
import { MotiView } from "moti";
import { FlatList } from "react-native";
import { businessCards, InfoRow } from "../bookings/infoRow";

interface ClientActionsProps {
  closeModal: () => void;
  businessData: BusinessData;
}

export const ClientActions = ({
  closeModal,
  businessData,
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
              : item.title === "Open until"
              ? businessData.closeTime
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
              key={item.title}
            >
              <InfoRow
                materialicon={item.materialicon}
                ionicon={item.ionicon}
                title={item.title}
                subtitle={subtitleItem}
                index={index}
                item={businessCards}
                onPress={() => {
                  if (item.link)
                    handleDirections({
                      location: businessData.coordinates?.location,
                    });
                  else if (item.favorite) console.log("favorited");
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

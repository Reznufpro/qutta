import { InnerContainer } from "@/components/ui/innerContainer";
import { fullBusinessT } from "@/utils";
import { MotiView } from "moti";
import { FlatList } from "react-native";
import { businessCards, InfoRow } from "../bookings/infoRow";

interface ClientActionsProps {
  closeModal: () => void;
  mockBusiness: fullBusinessT;
}

export const ClientActions = ({
  closeModal,
  mockBusiness,
}: ClientActionsProps) => {
  return (
    <InnerContainer style={{ marginVertical: 20 }}>
      <FlatList
        data={businessCards}
        scrollEnabled={false}
        renderItem={({ item, index }) => {
          const subtitleItem =
            item.title === "Getting there"
              ? mockBusiness.coordinates?.location
              : item.title === "Open until"
              ? mockBusiness.openTime
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
              />
            </MotiView>
          );
        }}
      />
    </InnerContainer>
  );
};

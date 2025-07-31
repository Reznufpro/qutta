import { AnimatePresence, MotiView } from "moti";
import { StyleProp, ViewStyle } from "react-native";

interface HoverButtonProps {
  children: React.ReactNode;
  keyId: string;
  styleContainer?: StyleProp<ViewStyle>;
}

export const HoverButton = ({
  children,
  keyId,
  styleContainer,
}: HoverButtonProps) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <MotiView
        key={keyId}
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: -20 }}
        transition={{ type: "timing", duration: 300 }}
        style={styleContainer}
      >
        {children}
      </MotiView>
    </AnimatePresence>
  );
};

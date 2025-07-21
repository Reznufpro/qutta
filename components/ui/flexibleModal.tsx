import { AnimatePresence, MotiView } from "moti";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { CustomModal } from "./customModal";

type FlexibleModalProps = {
  modalVisible: boolean;
  closeModal: () => void;
  content?: string;
  views?: Record<string, React.ReactNode>;
  children?: React.ReactNode;
  styles?: StyleProp<ViewStyle>;
};

export const FlexibleModal = ({
  modalVisible,
  closeModal,
  content,
  views,
  children,
  styles,
}: FlexibleModalProps) => {
  const renderContent = () => {
    if (views && content && views[content]) return views[content];
    return children ?? null;
  };

  return (
    <CustomModal
      modalVisible={modalVisible}
      closeModal={closeModal}
      style={styles}
    >
      <AnimatePresence exitBeforeEnter>
        {modalVisible && (
          <MotiView
            key={content || "single"}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -20 }}
            transition={{ type: "timing", duration: 300 }}
          >
            {renderContent()}
          </MotiView>
        )}
      </AnimatePresence>
    </CustomModal>
  );
};

// const [modalVisible, setModalVisible] = useState(false);
// const [content, setContent] = useState<"Login" | "Signup">("Login");

// const openModal = (view: "Login" | "Signup") => {
//   setModalVisible(true);
//   setContent(view);
// };

// <FlexibleModal
//   modalVisible={modalVisible}
//   closeModal={() => setModalVisible(false)}
//   content={content}
//   views={{
//     Login: <GetLoggedInModal closeModal={() => setModalVisible(false)} func={openModal} />,
//     Signup: <GetSiggnedUp closeModal={() => setModalVisible(false)} func={openModal} />,
//   }}
// />

// const [modalVisible, setModalVisible] = useState(false);

// <FlexibleModal modalVisible={modalVisible} closeModal={() => setModalVisible(false)}>
//   <GetLoggedInModal closeModal={() => setModalVisible(false)} func={() => {}} />
// </FlexibleModal>

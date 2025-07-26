import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { formState } from "./getLoggedIn";

const initialLoginState: formState = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  role: "Client",
};

interface PasswordInputProps {
  ref: React.RefObject<TextInput | null>;
  label: string;
  value: string | undefined;
  isPasswordVisible: boolean;
  focusedString: "name" | "lastName" | "email" | "password";
  focusedInput: "name" | "lastName" | "email" | "password" | null;
  setFocusedInput: (
    value: React.SetStateAction<
      "email" | "name" | "lastName" | "password" | null
    >
  ) => void;
  handleInputChange: (key: keyof formState, value: string) => void;
  setPasswordVisible: (value: React.SetStateAction<boolean>) => void;
  setErrors: (value: React.SetStateAction<formState>) => void;
}

export const PasswordInput = ({
  ref,
  label,
  value,
  isPasswordVisible,
  focusedString,
  focusedInput,
  setErrors,
  setFocusedInput,
  handleInputChange,
  setPasswordVisible,
}: PasswordInputProps) => {
  return (
    <>
      <CustomText style={[styles.label]}>{label}</CustomText>
      <View
        style={[
          styles.passwordInputContainer,
          focusedInput === focusedString && styles.focusedInput,
        ]}
      >
        <TextInput
          ref={ref}
          style={styles.passwordInput}
          placeholder={label}
          placeholderTextColor="#c7c7c7"
          selectionColor="#000"
          secureTextEntry={!isPasswordVisible}
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => setFocusedInput(focusedString)}
          onBlur={async () => {
            setFocusedInput(null);
          }}
          value={value}
          onChangeText={(text) => {
            handleInputChange(focusedString, text);
            setErrors(initialLoginState);
          }}
        />

        <TouchableOpacity
          onPress={() => setPasswordVisible(!isPasswordVisible)}
        >
          <CustomText style={styles.btnText}>
            {!isPasswordVisible ? "Show" : "Hide"}
          </CustomText>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.light.icon,
    borderWidth: 1,
    borderRadius: 5,
    height: 45.5,
    paddingHorizontal: 10,
    backgroundColor: "#fafafa",
  },
  passwordInput: {
    flex: 1,
    color: "#000",
    height: 45.5,
    fontSize: 16,
  },
  focusedInput: {
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 4,
  },
  btnText: {
    fontSize: 16,
    fontFamily: "Satoshi-Bold",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
});

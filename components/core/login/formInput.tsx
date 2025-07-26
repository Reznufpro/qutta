import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { KeyboardTypeOptions, StyleSheet, TextInput } from "react-native";
import { formState } from "./getLoggedIn";

const initialState: formState = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  role: "Client",
};

interface FormInputProps {
  ref: React.RefObject<TextInput | null>;
  label?: string;
  placeholder?: string;
  value: string | undefined;
  errors: formState;
  focusedInput: "name" | "lastName" | "email" | "password" | null;
  focusedString: "email" | "name" | "lastName" | "password";
  keyboardType?: KeyboardTypeOptions | undefined;
  setFocusedInput: (
    value: React.SetStateAction<
      "email" | "name" | "lastName" | "password" | null
    >
  ) => void;
  handleInputChange: (key: keyof formState, value: string) => void;
  setEmailExists?: (value: React.SetStateAction<boolean>) => void;
  setErrors: (value: React.SetStateAction<formState>) => void;
}

export const FormInput = ({
  ref,
  label,
  value,
  errors,
  placeholder,
  focusedString,
  focusedInput,
  keyboardType = "email-address",
  setFocusedInput,
  handleInputChange,
  setEmailExists,
  setErrors,
}: FormInputProps) => {
  return (
    <>
      {label && <CustomText style={[styles.label]}>{label}</CustomText>}
      <TextInput
        ref={ref}
        style={[
          styles.input,
          focusedInput === focusedString && styles.focusedInput,
          (focusedString === "lastName" && {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }) ||
            (focusedString === "name" && {
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }),
          errors[focusedString] && styles.errorInput,
        ]}
        placeholder={placeholder || label}
        placeholderTextColor="#c7c7c7"
        selectionColor="#000"
        keyboardType={keyboardType}
        autoCapitalize="none"
        autoCorrect={false}
        onFocus={() => setFocusedInput(focusedString)}
        onBlur={async () => {
          setFocusedInput(null);
        }}
        value={value}
        onChangeText={(text) => {
          handleInputChange(focusedString, text);
          setErrors(initialState);
          setEmailExists && setEmailExists(false);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.icon,
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    height: 45.5,
    backgroundColor: "#fafafa",
  },
  focusedInput: {
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 4,
  },
  errorInput: {
    borderColor: "red",
  },
});

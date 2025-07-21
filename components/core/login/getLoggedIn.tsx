import { CustomDivider } from "@/components/ui/customDivider";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { h3 } from "@/constants";
import { Colors } from "@/constants/Colors";
import { useRegisterUser } from "@/hooks/useAuth";
import { checkEmailExists, validateEmail } from "@/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Haptics from "expo-haptics";
import { AnimatePresence, MotiView } from "moti";
import { FC, useMemo, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { RoleSelector } from "./roleSelector";

interface GetLoggedInProps {
  closeModal: () => void;
  func: () => void;
}

export interface formState {
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: "Client" | "Business";
}

const initialState: formState = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  role: "Client",
};

export const GetLoggedIn: FC<GetLoggedInProps> = ({ closeModal, func }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState(initialState);
  const nameInputRef = useRef<TextInput>(null);
  const lastNameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [focusedInput, setFocusedInput] = useState<
    null | "name" | "lastName" | "email" | "password"
  >(null);
  const [errors, setErrors] = useState(initialState);
  const { mutateAsync: register, isPending, error } = useRegisterUser();

  const handleInputChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const emptyForm = useMemo(() => {
    const invalid =
      !formData.email ||
      !formData.lastName ||
      !formData.name ||
      !formData.password ||
      !formData.role;

    return invalid;
  }, [formData]);

  const validateInputs = () => {
    const newErrors = initialState;
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (!formData.name || !formData.lastName) {
      newErrors.name = "Names are required";
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleContinue = async () => {
    setErrors(initialState);

    if (!validateEmail(formData.email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
      Haptics.selectionAsync();
      return;
    }

    const exists = await checkEmailExists(formData.email);

    console.log(exists);

    if (!exists) {
      setStep(2);
      return;
    }

    try {
    } catch (error) {
      console.log("Error: logging in", error);
    }
  };

  const handleSubmitRegister = async () => {
    if (!validateInputs() && emptyForm) {
      Haptics.selectionAsync();
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
      Haptics.selectionAsync();
      return;
    }

    const exists = await checkEmailExists(formData.email);

    if (exists) {
      setErrors((prev) => ({
        ...prev,
        email: "Email already exists",
      }));
      return;
    }

    try {
      console.log(formData);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <InnerContainer>
      <View style={styles.modalHeader}>
        <CustomText style={[h3]}>Login or sign up</CustomText>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 45 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 45 }}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ justifyContent: "center", paddingBottom: 45 }}>
              <AnimatePresence exitBeforeEnter>
                {step === 1 && (
                  <MotiView
                    key="step1"
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    exit={{ opacity: 0, translateY: -20 }}
                    transition={{ type: "timing", duration: 300 }}
                  >
                    <CustomText style={[styles.label]}>Email</CustomText>
                    <TextInput
                      ref={emailInputRef}
                      style={[
                        styles.input,
                        focusedInput === "email" && styles.focusedInput,
                        errors.email && styles.errorInput,
                      ]}
                      placeholder="Email"
                      placeholderTextColor="#c7c7c7"
                      selectionColor="#000"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onFocus={() => setFocusedInput("email")}
                      onBlur={async () => {
                        setFocusedInput(null);
                      }}
                      value={formData.email}
                      onChangeText={(text) => {
                        handleInputChange("email", text);
                      }}
                    />

                    {errors.email && (
                      <MotiView
                        from={{
                          opacity: 0,
                          translateY: -6,
                        }}
                        animate={{
                          opacity: 1,
                          translateY: 0,
                        }}
                        transition={{
                          type: "timing",
                          duration: 300,
                        }}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 6,
                          marginTop: 5,
                        }}
                      >
                        <Ionicons name="alert-circle" color="red" />
                        <CustomText style={styles.error}>
                          {errors.email}
                        </CustomText>
                      </MotiView>
                    )}

                    <TouchableOpacity
                      style={[
                        styles.nextButton,
                        !formData.email && styles.disabledButton,
                        { marginVertical: 30 },
                      ]}
                      onPress={handleContinue}
                    >
                      <CustomText style={styles.buttonText}>
                        Continue
                      </CustomText>
                    </TouchableOpacity>

                    <CustomDivider text="OR" />

                    <AppleAuthentication.AppleAuthenticationButton
                      buttonType={
                        AppleAuthentication.AppleAuthenticationButtonType
                          .SIGN_IN
                      }
                      buttonStyle={
                        AppleAuthentication.AppleAuthenticationButtonStyle
                          .WHITE_OUTLINE
                      }
                      cornerRadius={5}
                      style={{
                        width: "100%",
                        height: 53,
                        marginVertical: 30,
                      }}
                      onPress={() => {}}
                    />
                  </MotiView>
                )}

                {step === 2 && (
                  <MotiView
                    key="step2"
                    from={{ opacity: 0, translateY: 30 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    exit={{ opacity: 0, translateY: -20 }}
                    transition={{ type: "timing", duration: 300 }}
                  >
                    {/* Back Button */}
                    <TouchableOpacity
                      onPress={() => setStep(1)}
                      style={{ marginBottom: 24, alignSelf: "flex-start" }}
                    >
                      <Ionicons
                        name="arrow-back-outline"
                        size={24}
                        color={Colors.light.black}
                      />
                    </TouchableOpacity>

                    <CustomText style={[styles.label]}>Full name</CustomText>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: Colors.light.textSecondary,
                        borderRadius: 5,
                        marginBottom: 30,
                      }}
                    >
                      {/* First Name */}
                      <TextInput
                        ref={nameInputRef}
                        style={[
                          styles.input,
                          {
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                          },
                          focusedInput === "name" && styles.focusedInput,
                          errors.name && styles.errorInput,
                        ]}
                        placeholder="First name"
                        placeholderTextColor="#c7c7c7"
                        selectionColor="#000"
                        keyboardType="name-phone-pad"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onFocus={() => setFocusedInput("name")}
                        onBlur={async () => {
                          setFocusedInput(null);
                        }}
                        value={formData.name}
                        onChangeText={(text) => {
                          handleInputChange("name", text);
                        }}
                      />

                      {/* Last Name */}
                      <TextInput
                        ref={lastNameInputRef}
                        style={[
                          styles.input,
                          { borderTopLeftRadius: 0, borderTopRightRadius: 0 },
                          focusedInput === "lastName" && styles.focusedInput,
                          errors.lastName && styles.errorInput,
                        ]}
                        placeholder="Last name"
                        placeholderTextColor="#c7c7c7"
                        selectionColor="#000"
                        keyboardType="name-phone-pad"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onFocus={() => setFocusedInput("lastName")}
                        onBlur={async () => {
                          setFocusedInput(null);
                        }}
                        value={formData.lastName}
                        onChangeText={(text) => {
                          handleInputChange("lastName", text);
                        }}
                      />
                    </View>

                    {errors.name && (
                      <MotiView
                        from={{
                          opacity: 0,
                          translateY: -6,
                        }}
                        animate={{
                          opacity: 1,
                          translateY: 0,
                        }}
                        transition={{
                          type: "timing",
                          duration: 300,
                        }}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 6,
                          marginTop: 5,
                        }}
                      >
                        <Ionicons name="alert-circle" color="red" />
                        <CustomText style={styles.error}>
                          {errors.name}
                        </CustomText>
                      </MotiView>
                    )}

                    <View style={{ marginBottom: 30 }}>
                      <CustomText style={[styles.label]}>Email</CustomText>
                      <TextInput
                        ref={emailInputRef}
                        style={[
                          styles.input,
                          focusedInput === "email" && styles.focusedInput,
                          errors.email && styles.errorInput,
                        ]}
                        placeholder="Email"
                        placeholderTextColor="#c7c7c7"
                        selectionColor="#000"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onFocus={() => setFocusedInput("email")}
                        onBlur={async () => {
                          setFocusedInput(null);
                        }}
                        value={formData.email}
                        onChangeText={(text) => {
                          handleInputChange("email", text);
                        }}
                      />

                      {errors.email && (
                        <MotiView
                          from={{
                            opacity: 0,
                            translateY: -6,
                          }}
                          animate={{
                            opacity: 1,
                            translateY: 0,
                          }}
                          transition={{
                            type: "timing",
                            duration: 300,
                          }}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 6,
                            marginTop: 5,
                          }}
                        >
                          <Ionicons name="alert-circle" color="red" />
                          <CustomText style={styles.error}>
                            {errors.email}
                          </CustomText>
                        </MotiView>
                      )}
                    </View>

                    <View style={{ marginBottom: 30 }}>
                      <CustomText style={[styles.label]}>Password</CustomText>

                      <View
                        style={[
                          styles.passwordInputContainer,
                          focusedInput === "password" && styles.focusedInput,
                        ]}
                      >
                        <TextInput
                          ref={passwordInputRef}
                          style={styles.passwordInput}
                          placeholder="Password"
                          placeholderTextColor="#c7c7c7"
                          selectionColor="#000"
                          secureTextEntry={!isPasswordVisible}
                          autoCapitalize="none"
                          autoCorrect={false}
                          onFocus={() => setFocusedInput("password")}
                          onBlur={async () => {
                            setFocusedInput(null);
                          }}
                          value={formData.password}
                          onChangeText={(text) => {
                            handleInputChange("password", text);
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
                    </View>

                    <RoleSelector
                      handleInputChange={handleInputChange}
                      currentRole={formData.role}
                    />

                    <TouchableOpacity
                      style={[
                        styles.nextButton,
                        emptyForm && styles.disabledButton,
                        { marginVertical: 30 },
                      ]}
                      disabled={emptyForm}
                      onPress={handleSubmitRegister}
                    >
                      <CustomText style={styles.buttonText}>
                        Continue
                      </CustomText>
                    </TouchableOpacity>
                  </MotiView>
                )}
              </AnimatePresence>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </InnerContainer>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    marginTop: 12,
    marginBottom: 24,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.textSecondary,
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    height: 45.5,
    backgroundColor: "#fafafa",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.light.textSecondary,
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
  btnText: {
    fontSize: 16,
    fontFamily: "Satoshi-Bold",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
  focusedInput: {
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 4,
  },
  disabledButton: {
    backgroundColor: Colors.light.muted,
  },
  error: {
    fontSize: 12,
    color: "red",
  },
  errorInput: {
    borderColor: "red",
  },
  nextButton: {
    backgroundColor: Colors.light.black,
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.light.white,
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
  },
});

import { CustomDivider } from "@/components/ui/customDivider";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { h3 } from "@/constants";
import { Colors } from "@/constants/Colors";
import { useUserData } from "@/context/userContext";
import { useLoginUser, useRegisterUser } from "@/hooks/useAuth";
import { checkEmailExists, validateEmail, validatePassword } from "@/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { AnimatePresence, MotiView } from "moti";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
import { Easing } from "react-native-reanimated";
import { ErrorIndicator } from "./errorIndicator";
import { FormInput } from "./formInput";
import { PasswordInput } from "./passwordInput";
import { RoleSelector } from "./roleSelector";

interface GetLoggedInProps {
  closeModal: () => void;
}

export interface formState {
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: "Client" | "Business";
}

export const initialLoginState: formState = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  role: "Client",
};

export const GetLoggedIn: FC<GetLoggedInProps> = ({ closeModal }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState(initialLoginState);
  const nameInputRef = useRef<TextInput>(null);
  const lastNameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const [emailExists, setEmailExists] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [focusedInput, setFocusedInput] = useState<
    null | "name" | "lastName" | "email" | "password"
  >(null);
  const [errors, setErrors] = useState(initialLoginState);
  const { mutateAsync: register, isPending: signUpPending } = useRegisterUser();
  const {
    mutateAsync: login,
    isPending: loginPending,
    error: loginError,
    isError,
  } = useLoginUser();
  const { setUser } = useUserData();
  const router = useRouter();

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
    const newErrors = initialLoginState;
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
    setErrors(initialLoginState);

    if (!validateEmail(formData.email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
      Haptics.selectionAsync();
      return;
    }

    if (!emailExists) {
      const exists = await checkEmailExists(formData.email);
      console.log("Email exists?", exists);

      if (exists) {
        setEmailExists(true); // Show password field
        return;
      } else {
        setStep(2); // Email doesn't exist, move to register step
        return;
      }
    }

    if (!formData.password) {
      setErrors((prev) => ({
        ...prev,
        password: "Please enter your password",
      }));
      Haptics.selectionAsync();
      return;
    }

    try {
      const { user, token } = await login({
        email: formData.email,
        password: formData.password,
      });

      setUser({ ...user, token });
      await SecureStore.setItemAsync("token", token);

      console.log("Logged in", user);
      closeModal();
      router.push("/home");
    } catch (error) {
      console.log("Error: logging in", error);
    }
  };

  const handleSubmitRegister = async () => {
    if (!validateInputs() && emptyForm) {
      Haptics.selectionAsync();
      return;
    }

    const emailError = validateEmail(formData.email)
      ? ""
      : "Invalid email format.";

    const passwordError = validatePassword(formData.password)
      ? ""
      : "Password must be at least 6 characters long, include uppercase, lowercase, a number, and a special character.";

    if (emailError || passwordError) {
      setErrors((prev) => ({
        ...prev,
        email: emailError,
        password: passwordError,
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

      const { user, token } = await register(formData);
      console.log("Created:", user, token);

      setUser({ ...user, token: token });

      await SecureStore.setItemAsync("token", token);
      closeModal();
      router.push("/onboarding/intro");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  useEffect(() => {
    if (isError) {
      Alert.alert(loginError.message);
    }
  }, [loginError?.message, isError]);

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
                    <FormInput
                      ref={emailInputRef}
                      label="Email"
                      errors={errors}
                      value={formData.email}
                      focusedInput={focusedInput}
                      focusedString="email"
                      setFocusedInput={setFocusedInput}
                      handleInputChange={handleInputChange}
                      setErrors={setErrors}
                    />

                    {errors.email && <ErrorIndicator errors={errors.email} />}

                    {emailExists && (
                      <MotiView
                        key="step3"
                        from={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        exit={{ opacity: 0, translateY: -20 }}
                        transition={{
                          type: "timing",
                          duration: 600,
                          easing: Easing.inOut(Easing.cubic),
                        }}
                      >
                        <View style={{ marginTop: 30 }}>
                          <PasswordInput
                            label="Password"
                            ref={passwordInputRef}
                            setErrors={setErrors}
                            value={formData.password}
                            focusedString="password"
                            focusedInput={focusedInput}
                            isPasswordVisible={isPasswordVisible}
                            setFocusedInput={setFocusedInput}
                            handleInputChange={handleInputChange}
                            setPasswordVisible={setPasswordVisible}
                          />
                        </View>
                      </MotiView>
                    )}

                    {errors.password && (
                      <ErrorIndicator errors={errors.password} />
                    )}

                    <TouchableOpacity
                      style={[
                        styles.nextButton,
                        !formData.email && styles.disabledButton,
                        { marginVertical: 30 },
                      ]}
                      disabled={loginPending || !formData.email}
                      onPress={handleContinue}
                    >
                      {loginPending ? (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <ActivityIndicator
                            size="small"
                            color={Colors.light.white}
                          />

                          <CustomText style={styles.buttonText}>
                            loading...
                          </CustomText>
                        </View>
                      ) : (
                        <CustomText style={styles.buttonText}>
                          Continue
                        </CustomText>
                      )}
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
                      onPress={() => {
                        setStep(1);
                        setFormData((prev) => ({
                          ...prev,
                          name: "",
                          lastName: "",
                          password: "",
                          role: "Client",
                        }));
                      }}
                      style={{ marginBottom: 24, alignSelf: "flex-start" }}
                    >
                      <Ionicons
                        name="arrow-back-outline"
                        size={24}
                        color={Colors.light.black}
                      />
                    </TouchableOpacity>

                    <CustomText style={[styles.label]}>Full name</CustomText>
                    <View style={styles.nameContainer}>
                      {/* First Name */}
                      <FormInput
                        ref={nameInputRef}
                        placeholder="First name"
                        errors={errors}
                        value={formData.name}
                        focusedInput={focusedInput}
                        focusedString="name"
                        setFocusedInput={setFocusedInput}
                        handleInputChange={handleInputChange}
                        setErrors={setErrors}
                      />

                      {/* Last Name */}
                      <FormInput
                        ref={lastNameInputRef}
                        placeholder="Last name"
                        errors={errors}
                        value={formData.lastName}
                        focusedInput={focusedInput}
                        focusedString="lastName"
                        setFocusedInput={setFocusedInput}
                        handleInputChange={handleInputChange}
                        setErrors={setErrors}
                      />
                    </View>

                    {errors.name && <ErrorIndicator errors={errors.name} />}

                    <View style={{ marginBottom: 30 }}>
                      <FormInput
                        ref={emailInputRef}
                        label="Email"
                        errors={errors}
                        value={formData.email}
                        focusedInput={focusedInput}
                        focusedString="email"
                        setFocusedInput={setFocusedInput}
                        handleInputChange={handleInputChange}
                        setErrors={setErrors}
                      />

                      {errors.email && <ErrorIndicator errors={errors.email} />}
                    </View>

                    <View style={{ marginBottom: 30 }}>
                      <PasswordInput
                        ref={passwordInputRef}
                        label="Password"
                        value={formData.password}
                        isPasswordVisible={isPasswordVisible}
                        focusedString="password"
                        focusedInput={focusedInput}
                        setErrors={setErrors}
                        setFocusedInput={setFocusedInput}
                        handleInputChange={handleInputChange}
                        setPasswordVisible={setPasswordVisible}
                      />

                      {errors.password && (
                        <ErrorIndicator errors={errors.password} />
                      )}
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
                      disabled={emptyForm || signUpPending}
                      onPress={handleSubmitRegister}
                    >
                      {signUpPending ? (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <ActivityIndicator color={Colors.light.white} />

                          <CustomText style={styles.buttonText}>
                            loading...
                          </CustomText>
                        </View>
                      ) : (
                        <CustomText style={styles.buttonText}>
                          Continue
                        </CustomText>
                      )}
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
  nameContainer: {
    borderWidth: 1,
    borderColor: Colors.light.textSecondary,
    borderRadius: 5,
    marginBottom: 30,
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

import { CustomDivider } from "@/components/ui/customDivider";
import CustomText from "@/components/ui/customText";
import { HoverError } from "@/components/ui/hoverError";
import { InnerContainer } from "@/components/ui/innerContainer";
import { BASE_URL, h3 } from "@/constants";
import { Colors } from "@/constants/Colors";
import { useUserData } from "@/context/userContext";
import { useAppleAuth, useLoginUser, useRegisterUser } from "@/hooks/useAuth";
import {
  checkEmailExists,
  registerPushToken,
  validateEmail,
  validatePassword,
} from "@/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { AnimatePresence, MotiView } from "moti";
import { FC, useEffect, useMemo, useRef, useState } from "react";
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
import { Easing } from "react-native-reanimated";
import { ActionButton } from "./actionButton";
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
  const { mutateAsync: appleLoginMutate, isPending } = useAppleAuth();
  const router = useRouter();
  const [showError, setShowError] = useState(false);

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

      if (user.role === "Client") {
        await registerPushToken();
        router.replace("/(client)/home");
      } else {
        await registerPushToken();
        router.replace("/(business)/dashboard");
      }
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
      await registerPushToken();

      closeModal();
      router.push("/onboarding/intro");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  useEffect(() => {
    if (isError) {
      setShowError(true);

      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isError]);

  return (
    <>
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
                        setEmailExists={setEmailExists}
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

                      <ActionButton
                        disabledFlag={loginPending || !formData.email}
                        loading={loginPending}
                        func={handleContinue}
                      />

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
                        onPress={async () => {
                          try {
                            const credential =
                              await AppleAuthentication.signInAsync({
                                requestedScopes: [
                                  AppleAuthentication.AppleAuthenticationScope
                                    .EMAIL,
                                  AppleAuthentication.AppleAuthenticationScope
                                    .FULL_NAME,
                                ],
                              });

                            console.log("Apple credential:", credential);

                            const fullName = `${
                              credential.fullName?.givenName ?? ""
                            } ${credential.fullName?.familyName ?? ""}`.trim();

                            if (!credential.identityToken) {
                              alert("Apple login failed: No token received");
                              return;
                            }

                            const res = await fetch(
                              `${BASE_URL}auth/appleLogin`,
                              {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  identityToken: credential.identityToken,
                                  fullName,
                                }),
                              }
                            );

                            if (!res.ok) {
                              const err = await res.json();
                              throw new Error(err.error || "Login failed");
                            }

                            const data = await res.json();

                            const { user, token, isNew } = data;

                            // Store token to SecureStore, etc
                            console.log("Created:", user, token);

                            setUser({ ...user, token: token });

                            await SecureStore.setItemAsync("token", token);

                            closeModal();

                            if (user.role === "Client") {
                              await registerPushToken();
                              closeModal();

                              router.replace("/(client)/home");
                            } else {
                              await registerPushToken();
                              closeModal();

                              router.replace("/(business)/dashboard");
                            }

                            if (isNew) {
                              // navigate to Role Picker
                              closeModal();
                              router.push("/onboarding/setRole");
                            } else {
                              // go to app
                              await registerPushToken();
                              closeModal();

                              if (user.role === "Client") {
                                router.replace("/(client)/home");
                              } else {
                                router.replace("/(business)/dashboard");
                              }
                            }
                          } catch (error: any) {
                            if (error.code === "ERR_CANCELED") {
                              console.log("Apple login canceled");
                            } else {
                              console.error("Apple login failed", error);
                            }
                          }
                        }}
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

                        {errors.email && (
                          <ErrorIndicator errors={errors.email} />
                        )}
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

                      <ActionButton
                        disabledFlag={emptyForm || signUpPending}
                        loading={signUpPending}
                        func={handleSubmitRegister}
                      />
                    </MotiView>
                  )}
                </AnimatePresence>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      </InnerContainer>

      {showError && loginError && <HoverError error={loginError.message} />}
    </>
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
});

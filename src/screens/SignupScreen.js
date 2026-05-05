import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithCredential,
} from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import VoyajLogo from "../components/VoyajLogo";
import api from "../utils/api";
import { saveToken, saveUserData } from "../utils/storage";

// Configure Google Sign-in
GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEBCLIENTID,
  scopes: ["profile", "email"],
  offlineAccess: true,
});

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);

  const handleSignup = async () => {
    if (!email.trim() || !password || !confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in all fields",
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Passwords do not match",
      });
      return;
    }

    setLoading(true);
    try {
      const authInstance = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        authInstance,
        email,
        password,
      );

      if (name.trim()) {
        await updateProfile(userCredential.user, { displayName: name });
      }

      const idToken = await userCredential.user.getIdToken();
      const response = await api.post("/auth/register", {
        idToken,
        username: name || email.split("@")[0],
        img: userCredential.user.photoURL || "",
      });

      if (response.data.success) {
        await saveToken(response.data.token);
        await saveUserData(response.data.user);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Account created successfully!",
        });
      } else {
        throw new Error("Backend synchronization failed");
      }
    } catch (error) {
      console.error(error);
      let errorMessage =
        error.message || "Something went wrong. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "That email address is already in use!";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "That email address is invalid!";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "The password is too weak.";
      }
      Toast.show({ type: "error", text1: "Signup Error", text2: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const { data } = await GoogleSignin.signIn();
      const { idToken, accessToken } = data;

      const googleCredential = GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      const authInstance = getAuth();
      const userCredential = await signInWithCredential(
        authInstance,
        googleCredential,
      );

      const firebaseToken = await userCredential.user.getIdToken();
      const response = await api
        .post("/auth/register", {
          idToken: firebaseToken,
          username:
            userCredential.user.displayName ||
            userCredential.user.email.split("@")[0],
          img: userCredential.user.photoURL || "",
        })
        .catch((err) => {
          if (err.response?.status === 400) {
            return api.post("/auth/login", { idToken: firebaseToken });
          }
          throw err;
        });

      if (response.data.success) {
        await saveToken(response.data.token);
        await saveUserData(response.data.user);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Signed in with Google!",
        });
      }
    } catch (error) {
      console.error(error);
      let errorMessage = "An error occurred during Google sign in";
      if (error.code === "SIGN_IN_CANCELLED") {
        errorMessage = "Sign in cancelled";
      } else if (error.code === "IN_PROGRESS") {
        errorMessage = "Sign in already in progress";
      } else if (error.code === "PLAY_SERVICES_NOT_AVAILABLE") {
        errorMessage = "Play services not available";
      }
      Toast.show({
        type: "error",
        text1: "Google Login Failed",
        text2: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Brand Header */}
          <View style={styles.brandHeader}>
            <VoyajLogo color="#111827" style={styles.logo} />
            <Text style={styles.tagline}>Explore the world, effortlessly.</Text>
          </View>

          {/* Welcome Text */}
          <View style={styles.welcomeBlock}>
            <Text style={styles.heading}>Create account</Text>
            <Text style={styles.subheading}>
              Join Voyaj and start your adventure
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formBlock}>
            {/* Full Name */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={[styles.input, nameFocused && styles.inputFocused]}
                placeholder="John Doe"
                placeholderTextColor="#c4c9d4"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
              />
            </View>

            {/* Email */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email address</Text>
              <TextInput
                style={[styles.input, emailFocused && styles.inputFocused]}
                placeholder="name@example.com"
                placeholderTextColor="#c4c9d4"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
            </View>

            {/* Password */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={[styles.input, passwordFocused && styles.inputFocused]}
                placeholder="••••••••"
                placeholderTextColor="#c4c9d4"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
            </View>

            {/* Confirm Password */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={[styles.input, confirmFocused && styles.inputFocused]}
                placeholder="••••••••"
                placeholderTextColor="#c4c9d4"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                onFocus={() => setConfirmFocused(true)}
                onBlur={() => setConfirmFocused(false)}
              />
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={[styles.signupButton, loading && { opacity: 0.7 }]}
              onPress={handleSignup}
              disabled={loading}
              activeOpacity={0.88}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.signupButtonText}>Create Account</Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Google Button */}
            <TouchableOpacity
              style={[styles.googleButton, loading && { opacity: 0.6 }]}
              onPress={handleGoogleLogin}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Image
                source={{
                  uri: "https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png",
                }}
                style={styles.googleIcon}
              />
              <Text style={styles.googleButtonText}>Sign up with Google</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 48,
    paddingBottom: 36,
  },

  // Brand Header
  brandHeader: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    fontSize: 52,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 13,
    color: "#b0b7c3",
    letterSpacing: 0.4,
    textAlign: "center",
  },

  // Welcome Block
  welcomeBlock: {
    marginBottom: 28,
  },
  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subheading: {
    fontSize: 15,
    color: "#94a3b8",
    fontWeight: "400",
  },

  // Form
  formBlock: {
    flex: 1,
  },
  fieldGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
    letterSpacing: 0.1,
  },
  input: {
    backgroundColor: "#f8fafc",
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 15,
    color: "#0f172a",
  },
  inputFocused: {
    borderColor: "#f26422",
    backgroundColor: "#ffffff",
    shadowColor: "#f26422",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },

  // Sign Up Button
  signupButton: {
    backgroundColor: "#f26422",
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 28,
    shadowColor: "#f26422",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 6,
  },
  signupButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  // Divider
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#f1f5f9",
  },
  dividerText: {
    marginHorizontal: 14,
    color: "#94a3b8",
    fontSize: 13,
    fontWeight: "500",
  },

  // Google Button
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    borderRadius: 14,
    paddingVertical: 15,
    marginBottom: 36,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    color: "#1e293b",
    fontSize: 15,
    fontWeight: "600",
  },

  // Footer
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "#94a3b8",
    fontSize: 14,
  },
  loginText: {
    color: "#f26422",
    fontSize: 14,
    fontWeight: "700",
  },
});

import {
  getAuth,
  signInWithEmailAndPassword,
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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter both email and password",
      });
      return;
    }

    setLoading(true);
    try {
      const authInstance = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        authInstance,
        email,
        password,
      );

      const idToken = await userCredential.user.getIdToken();
      const response = await api.post("/auth/login", { idToken });

      if (response.data.success) {
        await saveToken(response.data.token);
        await saveUserData(response.data.user);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Logged in successfully!",
        });
      } else {
        throw new Error("Backend login failed");
      }
    } catch (error) {
      console.error(error);
      let errorMessage =
        error.message || "Check your email and password and try again.";
      if (error.code === "auth/invalid-email") {
        errorMessage = "That email address is invalid!";
      } else if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        errorMessage = "Invalid email or password.";
      } else if (error.code === "auth/user-disabled") {
        errorMessage = "This user account has been disabled.";
      }
      Toast.show({ type: "error", text1: "Login Error", text2: errorMessage });
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
      let response;
      try {
        response = await api.post("/auth/login", { idToken: firebaseToken });
      } catch (err) {
        if (err.response?.status === 404) {
          response = await api.post("/auth/register", {
            idToken: firebaseToken,
            username:
              userCredential.user.displayName ||
              userCredential.user.email.split("@")[0],
            img: userCredential.user.photoURL || "",
          });
        } else {
          throw err;
        }
      }

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
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Brand Header */}
        <View style={styles.brandHeader}>
          <VoyajLogo color="#111827" style={styles.logo} />
          <Text style={styles.tagline}>Explore the world, effortlessly.</Text>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Welcome Text */}
          <View style={styles.welcomeBlock}>
            <Text style={styles.heading}>Welcome back</Text>
            <Text style={styles.subheading}>
              Sign in to continue your journey
            </Text>
          </View>

          {/* Email Field */}
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

          {/* Password Field */}
          <View style={styles.fieldGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Password</Text>
              <TouchableOpacity>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
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

          {/* Sign In Button */}
          <TouchableOpacity
            style={[styles.loginButton, loading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.88}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.loginButtonText}>Sign In</Text>
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
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>{"Don't have an account? "}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 24,
    justifyContent: "space-between",
  },

  // Brand Header
  brandHeader: {
    alignItems: "center",
    paddingTop: 8,
  },
  logo: {
    fontSize: 52,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 13,
    color: "#b0b7c3",
    letterSpacing: 0.4,
    textAlign: "center",
  },

  // Main content block
  content: {
    flex: 1,
    justifyContent: "center",
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

  // Fields
  fieldGroup: {
    marginBottom: 18,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  forgotText: {
    fontSize: 13,
    color: "#f26422",
    fontWeight: "600",
    marginBottom: 8,
  },

  // Login Button
  loginButton: {
    backgroundColor: "#f26422",
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
    shadowColor: "#f26422",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 6,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  // Divider
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
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
    paddingBottom: 4,
  },
  footerText: {
    color: "#94a3b8",
    fontSize: 14,
  },
  signupText: {
    color: "#f26422",
    fontSize: 14,
    fontWeight: "700",
  },
});

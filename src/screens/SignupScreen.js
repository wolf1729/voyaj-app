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

      // Update profile with name if provided
      if (name.trim()) {
        await updateProfile(userCredential.user, {
          displayName: name,
        });
      }

      // Sync with backend
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
          text2: "Account created and synced successfully!",
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

      // Sync with backend
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
          // If user already exists, try logging in instead
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
          text2: "Signed in and synced with Google!",
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <VoyajLogo />
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Join Voyaj and start your adventure today
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              placeholderTextColor="#9ca3af"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />

            <Text style={[styles.label, { marginTop: 16 }]}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="name@example.com"
              placeholderTextColor="#9ca3af"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={[styles.label, { marginTop: 16 }]}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#9ca3af"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Text style={[styles.label, { marginTop: 16 }]}>
              Confirm Password
            </Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#9ca3af"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            <TouchableOpacity
              style={[styles.signupButton, loading && { opacity: 0.7 }]}
              onPress={handleSignup}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.signupButtonText}>Sign up</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={[styles.googleButton, loading && { opacity: 0.7 }]}
            onPress={handleGoogleLogin}
            disabled={loading}
          >
            <Image
              source={{
                uri: "https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png",
              }}
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>Sign up with Google</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: "center",
  },
  header: {
    alignItems: "flex-start",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#6b7280",
  },
  form: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#111827",
  },
  signupButton: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 32,
  },
  signupButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  dividerText: {
    marginHorizontal: 16,
    color: "#9ca3af",
    fontSize: 14,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 32,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  googleButtonText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
  },
  footerText: {
    color: "#6b7280",
    fontSize: 15,
  },
  loginText: {
    color: "#2563eb",
    fontSize: 15,
    fontWeight: "bold",
  },
});

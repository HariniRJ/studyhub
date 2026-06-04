import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform,
  ActivityIndicator, Modal, Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../constants/firebaseConfig";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

// Required for expo-auth-session to work on Android/iOS
WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Forgot password modal state
  const [forgotVisible, setForgotVisible] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMessage, setForgotMessage] = useState("");

  // Google OAuth — replace these with your actual Expo/Google client IDs
  // Get them from: https://console.cloud.google.com/
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "20239469332-eb67aql2k1cko43amsh426tbagr98k8t.apps.googleusercontent.com",
    webClientId: "20239469332-rp387iujoeqah1kvq7hrb0h0f8t3l48o.apps.googleusercontent.com",
});

  // Handle Google sign-in response
  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await promptAsync();

      if (result?.type === "success") {
        const { id_token } = result.params;
        const credential = GoogleAuthProvider.credential(id_token);
        const userCredential = await signInWithCredential(auth, credential);
        await saveUserToStorage(userCredential.user);
        router.replace("/(tabs)/home");
      } else if (result?.type === "cancel") {
        setError("Google sign-in was cancelled.");
      } else {
        setError("Google sign-in failed. Please try again.");
      }
    } catch (e: any) {
      setError("Google sign-in failed. Please try again.");
      console.error("Google sign-in error:", e);
    } finally {
      setLoading(false);
    }
  };

  const saveUserToStorage = async (user: any, displayName?: string) => {
    const resolvedName = displayName || user.displayName || "Student";
    // Save to Firestore
    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        name: resolvedName,
        email: user.email,
        createdAt: new Date().toISOString(),
      },
      { merge: true }
    );
    // Save locally using AsyncStorage (replaces localStorage)
    await AsyncStorage.setItem("userName", resolvedName);
    await AsyncStorage.setItem("userEmail", user.email || "");
    await AsyncStorage.setItem("userId", user.uid || "");
  };

  const getErrorMessage = (code: string) => {
    switch (code) {
      case "auth/invalid-email": return "Invalid email address.";
      case "auth/user-not-found": return "No account found with this email.";
      case "auth/wrong-password": return "Incorrect password.";
      case "auth/email-already-in-use": return "Email already registered.";
      case "auth/weak-password": return "Password must be at least 6 characters.";
      case "auth/too-many-requests": return "Too many attempts. Try again later.";
      case "auth/invalid-credential": return "Wrong email or password.";
      default: return "Something went wrong. Please try again.";
    }
  };

  const handleSubmit = async () => {
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (!isLogin && !name) { setError("Please enter your name."); return; }
    setLoading(true);
    try {
      if (isLogin) {
        const result = await signInWithEmailAndPassword(auth, email, password);
        await saveUserToStorage(result.user);
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: name });
        await saveUserToStorage(result.user, name);
      }
      router.replace("/(tabs)/home");
    } catch (e: any) {
      setError(getErrorMessage(e.code));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail.trim()) {
      setForgotMessage("Please enter your email address.");
      return;
    }
    setForgotLoading(true);
    setForgotMessage("");
    try {
      await sendPasswordResetEmail(auth, forgotEmail.trim());
      setForgotMessage("✅ Reset link sent! Check your inbox.");
    } catch (e: any) {
      if (e.code === "auth/user-not-found") {
        setForgotMessage("No account found with this email.");
      } else if (e.code === "auth/invalid-email") {
        setForgotMessage("Please enter a valid email address.");
      } else {
        setForgotMessage("Failed to send reset email. Try again.");
      }
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <>
      {/* ── Forgot Password Modal ── */}
      <Modal
        visible={forgotVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setForgotVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Reset Password</Text>
              <TouchableOpacity onPress={() => { setForgotVisible(false); setForgotMessage(""); setForgotEmail(""); }}>
                <Ionicons name="close" size={22} color="#aaa" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSubtitle}>
              Enter your email and we'll send you a reset link.
            </Text>

            <View style={styles.inputRow}>
              <Ionicons name="mail-outline" size={20} color="#555" style={styles.inputIcon} />
              <TextInput
                style={styles.inputWithIcon}
                placeholder="your.email@example.com"
                placeholderTextColor="#555"
                keyboardType="email-address"
                autoCapitalize="none"
                value={forgotEmail}
                onChangeText={setForgotEmail}
              />
            </View>

            {forgotMessage !== "" && (
              <Text style={[
                styles.forgotMsg,
                forgotMessage.startsWith("✅") ? styles.forgotSuccess : styles.forgotError,
              ]}>
                {forgotMessage}
              </Text>
            )}

            <TouchableOpacity
              style={[styles.btn, forgotLoading && { opacity: 0.7 }]}
              onPress={handleForgotPassword}
              disabled={forgotLoading}
            >
              {forgotLoading
                ? <ActivityIndicator color="#000" />
                : <Text style={styles.btnText}>Send Reset Link</Text>
              }
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ── Main Screen ── */}
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#121212" }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.logoCircle}>
            <Ionicons name="book-outline" size={36} color="#000" />
          </View>
          <Text style={styles.appName}>StudyHub</Text>
          <Text style={styles.appTagline}>Focus. Connect. Achieve.</Text>

          <View style={styles.card}>
            <Text style={styles.heading}>{isLogin ? "Welcome Back" : "Join StudyHub"}</Text>
            <Text style={styles.subHeading}>
              {isLogin ? "Log in to continue your study journey" : "Create an account to get started"}
            </Text>

            {error !== "" && (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle-outline" size={16} color="#ff4444" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {!isLogin && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  placeholderTextColor="#555"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputRow}>
                <Ionicons name="mail-outline" size={20} color="#555" style={styles.inputIcon} />
                <TextInput
                  style={styles.inputWithIcon}
                  placeholder="your.email@example.com"
                  placeholderTextColor="#555"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputRow}>
                <Ionicons name="lock-closed-outline" size={20} color="#555" style={styles.inputIcon} />
                <TextInput
                  style={styles.inputWithIcon}
                  placeholder="Enter your password"
                  placeholderTextColor="#555"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#555" />
                </TouchableOpacity>
              </View>
            </View>

            {isLogin && (
              <TouchableOpacity
                style={{ alignSelf: "flex-end", marginBottom: 4 }}
                onPress={() => setForgotVisible(true)}
              >
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.btn, loading && { opacity: 0.7 }]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading
                ? <ActivityIndicator color="#000" />
                : <Text style={styles.btnText}>{isLogin ? "Login" : "Sign Up"}</Text>
              }
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity
              style={[styles.socialBtn, (!request || loading) && { opacity: 0.6 }]}
              onPress={handleGoogleSignIn}
              disabled={!request || loading}
            >
              <Ionicons name="logo-google" size={20} color="#333" />
              <Text style={styles.socialBtnText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.toggleText}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </Text>
            <TouchableOpacity onPress={() => { setIsLogin(!isLogin); setError(""); }}>
              <Text style={styles.toggleLink}>{isLogin ? "Sign Up" : "Log In"}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#121212", alignItems: "center", padding: 24, paddingTop: 60 },
  logoCircle: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: "#1DB954", alignItems: "center", justifyContent: "center", marginBottom: 10,
  },
  appName: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 4 },
  appTagline: { fontSize: 14, color: "#aaa", marginBottom: 24 },
  card: {
    width: "100%", backgroundColor: "#1a1a1a",
    borderRadius: 20, padding: 24,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.08)",
  },
  heading: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 4 },
  subHeading: { fontSize: 13, color: "#888", marginBottom: 16 },
  errorBox: {
    flexDirection: "row", alignItems: "center", gap: 8,
    backgroundColor: "rgba(255,68,68,0.1)", borderRadius: 10,
    padding: 12, marginBottom: 14,
    borderWidth: 1, borderColor: "rgba(255,68,68,0.3)",
  },
  errorText: { color: "#ff4444", fontSize: 13, flex: 1 },
  inputGroup: { marginBottom: 14 },
  label: { color: "#ccc", fontSize: 13, fontWeight: "500", marginBottom: 6 },
  input: {
    backgroundColor: "#2a2a2a", color: "#fff",
    borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", fontSize: 14,
  },
  inputRow: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#2a2a2a", borderRadius: 12,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.08)",
  },
  inputIcon: { paddingLeft: 14 },
  inputWithIcon: { flex: 1, color: "#fff", paddingHorizontal: 12, paddingVertical: 12, fontSize: 14 },
  eyeIcon: { paddingRight: 14 },
  forgotText: { color: "#1DB954", fontSize: 13 },
  btn: {
    backgroundColor: "#1DB954", borderRadius: 12,
    paddingVertical: 14, alignItems: "center", marginTop: 8,
  },
  btnText: { color: "#000", fontWeight: "bold", fontSize: 16 },
  dividerRow: { flexDirection: "row", alignItems: "center", marginVertical: 18 },
  dividerLine: { flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.08)" },
  dividerText: { color: "#555", marginHorizontal: 10, fontSize: 13 },
  socialBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    backgroundColor: "#fff", borderRadius: 12, paddingVertical: 12, gap: 8,
  },
  socialBtnText: { fontWeight: "500", fontSize: 14, color: "#333" },
  toggleRow: { flexDirection: "row", marginTop: 20 },
  toggleText: { color: "#888", fontSize: 14 },
  toggleLink: { color: "#1DB954", fontWeight: "600", fontSize: 14 },
  // Modal styles
  modalOverlay: {
    flex: 1, backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center", alignItems: "center", padding: 24,
  },
  modalCard: {
    width: "100%", backgroundColor: "#1a1a1a",
    borderRadius: 20, padding: 24,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.08)",
  },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  modalTitle: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  modalSubtitle: { color: "#888", fontSize: 13, marginBottom: 16 },
  forgotMsg: { fontSize: 13, marginTop: 10, marginBottom: 4 },
  forgotSuccess: { color: "#1DB954" },
  forgotError: { color: "#ff4444" },
});

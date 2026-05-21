import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#121212" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Logo */}
        <View style={styles.logoCircle}>
          <Ionicons name="book-outline" size={36} color="#000" />
        </View>
        <Text style={styles.appName}>StudyHub</Text>
        <Text style={styles.appTagline}>Focus. Connect. Achieve.</Text>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.heading}>{isLogin ? "Welcome Back" : "Join StudyHub"}</Text>
          <Text style={styles.subHeading}>
            {isLogin ? "Log in to continue your study journey" : "Create an account to get started"}
          </Text>

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
            <TouchableOpacity style={{ alignSelf: "flex-end", marginBottom: 4 }}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.btn}
            onPress={() => router.replace("/home")}
          >
            <Text style={styles.btnText}>{isLogin ? "Login" : "Sign Up"}</Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.socialBtn}>
            <Ionicons name="logo-google" size={20} color="#333" />
            <Text style={styles.socialBtnText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.socialBtn, styles.socialBtnDark]}>
            <Ionicons name="logo-github" size={20} color="#fff" />
            <Text style={[styles.socialBtnText, { color: "#fff" }]}>Continue with GitHub</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleText}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </Text>
          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.toggleLink}>{isLogin ? "Sign Up" : "Log In"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  subHeading: { fontSize: 13, color: "#888", marginBottom: 20 },
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
    backgroundColor: "#fff", borderRadius: 12, paddingVertical: 12, gap: 8, marginBottom: 10,
  },
  socialBtnDark: { backgroundColor: "#2a2a2a", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  socialBtnText: { fontWeight: "500", fontSize: 14, color: "#333" },
  toggleRow: { flexDirection: "row", marginTop: 20 },
  toggleText: { color: "#888", fontSize: 14 },
  toggleLink: { color: "#1DB954", fontWeight: "600", fontSize: 14 },
});
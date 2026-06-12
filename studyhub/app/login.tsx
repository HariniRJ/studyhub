import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    if (!email.trim()) { setError("Please enter your email."); return; }
    if (!password.trim()) { setError("Please enter your password."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (!isLogin && !name.trim()) { setError("Please enter your name."); return; }

    setLoading(true);

    try {
      if (!isLogin) {
        // SIGN UP — save name, email, password
        await AsyncStorage.setItem("userName", name.trim());
        await AsyncStorage.setItem("userEmail", email.trim());
        await AsyncStorage.setItem("userPassword", password);
      } else {
        // LOGIN — check email + password match what was saved
        const savedEmail = await AsyncStorage.getItem("userEmail");
        const savedPassword = await AsyncStorage.getItem("userPassword");

        if (!savedEmail || !savedPassword) {
          setError("No account found. Please sign up first.");
          setLoading(false);
          return;
        }

        if (email.trim() !== savedEmail || password !== savedPassword) {
          setError("Wrong email or password.");
          setLoading(false);
          return;
        }
      }

      router.replace("/(tabs)/home");
    } catch (e: any) {
      setError("Something went wrong. Please try again.");
      console.log("Login error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#121212" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>StudyHub</Text>
        <Text style={styles.tagline}>Focus. Connect. Achieve.</Text>

        <View style={styles.card}>
          <Text style={styles.heading}>{isLogin ? "Welcome Back" : "Create Account"}</Text>
          <Text style={styles.subHeading}>
            {isLogin ? "Log in to continue your journey" : "Sign up to get started"}
          </Text>

          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Name — Sign Up only */}
          {!isLogin && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#666"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>
          )}

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="your.email@example.com"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordRow}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor="#666"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
              >
                <Text style={{ color: "#888", fontSize: 13 }}>
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Submit */}
          <TouchableOpacity
            style={[styles.btn, loading && { opacity: 0.7 }]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.btnText}>{isLogin ? "Login" : "Sign Up"}</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Toggle */}
        <TouchableOpacity
          style={styles.toggleRow}
          onPress={() => {
            setIsLogin(!isLogin);
            setError("");
            setName("");
            setEmail("");
            setPassword("");
          }}
        >
          <Text style={styles.toggleText}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </Text>
          <Text style={styles.toggleLink}>{isLogin ? "Sign Up" : "Log In"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 4,
  },
  tagline: {
    fontSize: 14,
    color: "#aaa",
    textAlign: "center",
    marginBottom: 32,
  },
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  subHeading: {
    fontSize: 13,
    color: "#888",
    marginBottom: 20,
  },
  errorBox: {
    backgroundColor: "rgba(255,68,68,0.12)",
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(255,68,68,0.3)",
  },
  errorText: { color: "#ff4444", fontSize: 13 },
  inputGroup: { marginBottom: 16 },
  label: {
    color: "#ccc",
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#2a2a2a",
    color: "#fff",
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  passwordInput: {
    flex: 1,
    color: "#fff",
    padding: 14,
    fontSize: 14,
  },
  eyeBtn: {
    paddingHorizontal: 14,
  },
  btn: {
    backgroundColor: "#1DB954",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 4,
  },
  btnText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  toggleText: { color: "#888", fontSize: 14 },
  toggleLink: { color: "#1DB954", fontWeight: "600", fontSize: 14 },
});

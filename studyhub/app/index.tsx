import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Onboarding() {
  const router = useRouter();

  const features = [
    { icon: "people-outline", title: "Live Study Rooms", desc: "Join collaborative study sessions" },
    { icon: "trending-up-outline", title: "Track Progress", desc: "Monitor hours and streaks" },
    { icon: "trophy-outline", title: "Earn Achievements", desc: "Level up as you study" },
  ];

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoCircle}>
        <Ionicons name="book-outline" size={48} color="#000" />
      </View>

      {/* Title */}
      <Text style={styles.title}>StudyHub</Text>
      <Text style={styles.tagline}>Focus. Connect. Achieve.</Text>

      {/* Feature Cards */}
      <View style={styles.featuresContainer}>
        {features.map((f, i) => (
          <View key={i} style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Ionicons name={f.icon as any} size={24} color="#1DB954" />
            </View>
            <View>
              <Text style={styles.featureTitle}>{f.title}</Text>
              <Text style={styles.featureDesc}>{f.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.btn} onPress={() => router.push("/login")}>
        <Text style={styles.btnText}>Get Started</Text>
      </TouchableOpacity>

      <Text style={styles.subText}>Join thousands of students improving their habits</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#1DB954",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: { fontSize: 40, fontWeight: "bold", color: "#fff", marginBottom: 6 },
  tagline: { fontSize: 18, color: "#ccc", marginBottom: 36 },
  featuresContainer: { width: "100%", gap: 12, marginBottom: 36 },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: 16,
    gap: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "rgba(29,185,84,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  featureTitle: { color: "#fff", fontWeight: "600", fontSize: 15 },
  featureDesc: { color: "#aaa", fontSize: 13, marginTop: 2 },
  btn: {
    width: "100%",
    backgroundColor: "#1DB954",
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  btnText: { color: "#000", fontWeight: "bold", fontSize: 17 },
  subText: { color: "#888", fontSize: 13 },
});
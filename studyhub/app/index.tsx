import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Onboarding() {
  const router = useRouter();

  const features = [
    { icon: "people-outline", title: "Live Study Rooms", desc: "Join collaborative study sessions" },
    { icon: "trending-up-outline", title: "Track Progress", desc: "Monitor hours and streaks" },
    { icon: "trophy-outline", title: "Earn Achievements", desc: "Level up as you study" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.logoCircle}>
        <Ionicons name="book-outline" size={48} color="#ffffff" />
      </View>

      <Text style={styles.title}>StudyHub</Text>
      <Text style={styles.tagline}>Focus. Connect. Achieve.</Text>

      <View style={styles.featuresContainer}>
        {features.map((f, i) => (
          <View key={i} style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Ionicons name={f.icon as any} size={24} color="#ffffff" />
            </View>

            <View>
              <Text style={styles.featureTitle}>{f.title}</Text>
              <Text style={styles.featureDesc}>{f.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.btnText}>Get Started</Text>
      </TouchableOpacity>

      <Text style={styles.subText}>
        Join thousands of students improving their habits
      </Text>
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
    backgroundColor: "#2d2d2d",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#404040",
  },

  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 6,
  },

  tagline: {
    fontSize: 18,
    color: "#9ca3af",
    marginBottom: 36,
  },

  featuresContainer: {
    width: "100%",
    gap: 12,
    marginBottom: 36,
  },

  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    borderRadius: 16,
    padding: 16,
    gap: 14,
    borderWidth: 1,
    borderColor: "#333333",
  },

  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#2d2d2d",
    alignItems: "center",
    justifyContent: "center",
  },

  featureTitle: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 15,
  },

  featureDesc: {
    color: "#9ca3af",
    fontSize: 13,
    marginTop: 2,
  },

  btn: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
  },

  btnText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 17,
  },

  subText: {
    color: "#6b7280",
    fontSize: 13,
  },
});
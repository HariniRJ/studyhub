import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const interests = ["Data Structures", "Operating Systems", "DBMS", "Computer Networks"];

const weekSummary = [
  { label: "Study Sessions", value: "32 sessions" },
  { label: "Total Study Time", value: "37h 0m" },
  { label: "Rooms Joined", value: "18 rooms" },
  { label: "Avg. Session", value: "2h 15m" },
];

export default function Profile() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("Student");
  const [email, setEmail] = useState("");
  const [initials, setInitials] = useState("S");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedName = await AsyncStorage.getItem("userName");
        const storedEmail = await AsyncStorage.getItem("userEmail");

        if (storedName && storedName.trim()) {
          setDisplayName(storedName.trim());
          // Build initials from name (e.g. "John Doe" → "JD", "John" → "J")
          const parts = storedName.trim().split(" ").filter(Boolean);
          const built = parts.length >= 2
            ? parts[0][0].toUpperCase() + parts[1][0].toUpperCase()
            : parts[0][0].toUpperCase();
          setInitials(built);
        }

        if (storedEmail && storedEmail.trim()) {
          setEmail(storedEmail.trim());
        }
      } catch (e) {
        console.log("Failed to load user data:", e);
      }
    };

    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userName");
      await AsyncStorage.removeItem("userEmail");
    } catch (_) {}
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.name}>{displayName}</Text>
          {email ? (
            <View style={styles.emailRow}>
              <Ionicons name="mail-outline" size={14} color="rgba(255,255,255,0.8)" />
              <Text style={styles.email}>{email}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.statsCard}>
          {[
            { icon: "flame", color: "#7c3aed", value: "12", label: "Day Streak" },
            { icon: "time-outline", color: "#16a34a", value: "156h", label: "Study Hours" },
            { icon: "trophy-outline", color: "#6d28d9", value: "Lv 8", label: "XP: 2,450" },
          ].map((s, i) => (
            <View key={i} style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: s.color }]}>
                <Ionicons name={s.icon as any} size={20} color="#fff" />
              </View>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Study Interests</Text>
          </View>
          <View style={styles.tagsRow}>
            {interests.map((interest, i) => (
              <View key={i} style={styles.tag}>
                <Text style={styles.tagText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  scroll: { paddingBottom: 32 },
  banner: {
    backgroundColor: "#5b21b6",
    paddingTop: 60,
    paddingBottom: 48,
    alignItems: "center",
  },
  avatarCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#000",
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarText: { color: "#fff", fontSize: 32, fontWeight: "bold" },
  name: { color: "#fff", fontSize: 26, fontWeight: "bold", marginBottom: 6 },
  emailRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  email: { color: "rgba(255,255,255,0.85)", fontSize: 13 },
  statsCard: {
    flexDirection: "row",
    backgroundColor: "#0d0d0d",
    borderRadius: 16,
    margin: 16,
    marginTop: -24,
    padding: 16,
    justifyContent: "space-around",
  },
  statItem: { alignItems: "center" },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  statValue: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  statLabel: { color: "#888", fontSize: 11 },
  card: {
    backgroundColor: "#0d0d0d",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 14,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "rgba(20,83,45,0.3)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: {
    color: "#86efac",
    fontSize: 12,
    fontWeight: "500",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#0d0d0d",
    borderRadius: 16,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 14,
  },
});

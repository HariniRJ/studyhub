import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const subjects = [
  { id: 1, name: "Data Structures & Algorithms", emoji: "💻", members: 12 },
  { id: 2, name: "Operating Systems", emoji: "⚙️", members: 8 },
  { id: 3, name: "Database Management", emoji: "🗄️", members: 15 },
  { id: 4, name: "Analysis & Design of Algorithms", emoji: "📊", members: 10 },
  { id: 5, name: "Mathematics", emoji: "📐", members: 6 },
  { id: 6, name: "Chemistry", emoji: "🧪", members: 9 },
  { id: 7, name: "Physics", emoji: "⚛️", members: 11 },
];

export default function Home() {
  const router = useRouter();
  const [userName, setUserName] = useState("Student");

  useEffect(() => {
    AsyncStorage.getItem("userName").then(val => {
      if (val) setUserName(val.split(" ")[0]);
    });
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>{getGreeting()}, {userName} 👋</Text>
        <Text style={styles.subGreeting}>Ready to continue your study journey?</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="flame" size={18} color="#f5c842" />
            <Text style={styles.statLabel}>STREAK</Text>
            <Text style={styles.statValue}>12 Days</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="time-outline" size={18} color="#a8c5a0" />
            <Text style={styles.statLabel}>TODAY</Text>
            <Text style={styles.statValue}>5h 15m</Text>
          </View>
        </View>

        {/* Section title */}
        <Text style={styles.sectionTitle}>Your Subjects</Text>
        <Text style={styles.sectionSub}>Tap a subject to join the session & view resources</Text>

        {/* Subject Cards */}
        {subjects.map((subject) => (
          <TouchableOpacity
            key={subject.id}
            style={styles.subjectCard}
            onPress={() => router.push(`/subject?id=${subject.id}`)}
            activeOpacity={0.7}
          >
            <View style={styles.emojiBox}>
              <Text style={styles.emoji}>{subject.emoji}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.subjectName}>{subject.name}</Text>
              <View style={styles.metaRow}>
                <View style={styles.liveDot} />
                <Text style={styles.metaText}>{subject.members} studying now</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#8a8a7a" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f0e8" },
  header: {
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 22,
    paddingTop: 56,
    paddingBottom: 22,
  },
  greeting: { fontSize: 22, fontWeight: "700", color: "#f5f0e8" },
  subGreeting: { fontSize: 13, color: "#8a8a7a", marginTop: 4 },
  scroll: { padding: 16, paddingBottom: 32 },
  statsRow: { flexDirection: "row", gap: 12, marginBottom: 24 },
  statCard: {
    flex: 1, backgroundColor: "#2d2d2d",
    borderRadius: 14, padding: 14, gap: 4,
  },
  statLabel: { color: "#888", fontSize: 10, fontWeight: "600", letterSpacing: 1, textTransform: "uppercase", marginTop: 6 },
  statValue: { color: "#f5f0e8", fontSize: 20, fontWeight: "700" },
  sectionTitle: { fontSize: 17, fontWeight: "700", color: "#1a1a1a", marginBottom: 4 },
  sectionSub: { fontSize: 12, color: "#8a8a7a", marginBottom: 16 },
  subjectCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  emojiBox: {
    width: 52, height: 52, borderRadius: 14,
    backgroundColor: "#f5f0e8",
    alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: "#e0d8cc",
  },
  emoji: { fontSize: 26 },
  subjectName: { color: "#1a1a1a", fontWeight: "600", fontSize: 15, marginBottom: 4 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: "#5a7a5a" },
  metaText: { color: "#8a8a7a", fontSize: 12 },
});

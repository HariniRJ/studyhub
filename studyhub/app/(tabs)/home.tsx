import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const subjects = [
  { id: 1, name: "Data Structures & Algorithms", emoji: "💻", members: 12, meetLink: "https://meet.google.com/vwg-hios-zrp" },
  { id: 2, name: "Operating Systems", emoji: "⚙️", members: 8, meetLink: "https://meet.google.com/zgn-nwwf-yzh" },
  { id: 3, name: "Database Management", emoji: "🗄️", members: 15, meetLink: "https://meet.google.com/jja-hfrc-ypq" },
  { id: 4, name: "Analysis & Design of Algorithms", emoji: "📊", members: 10, meetLink: "https://meet.google.com/uei-gszm-ope" },
  { id: 5, name: "Mathematics", emoji: "📐", members: 6, meetLink: "https://meet.google.com/aor-emxa-epv" },
  { id: 6, name: "Chemistry", emoji: "🧪", members: 9, meetLink: "https://meet.google.com/kyn-osvu-ywo" },
  { id: 7, name: "Physics", emoji: "⚛️", members: 11, meetLink: "https://meet.google.com/xms-cthz-xrq" },
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
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { borderColor: "rgba(139,92,246,0.4)" }]}>
            <Ionicons name="flame" size={20} color="#f5c842" />
            <Text style={styles.statLabel}>STREAK</Text>
            <Text style={styles.statValue}>12 Days</Text>
            <Text style={styles.statSub}>Keep it going! 🔥</Text>
          </View>
          <View style={[styles.statCard, { borderColor: "rgba(96,165,250,0.4)" }]}>
            <Ionicons name="time-outline" size={20} color="#93c5fd" />
            <Text style={styles.statLabel}>TODAY</Text>
            <Text style={styles.statValue}>5h 15m</Text>
            <Text style={styles.statSub}>Great progress!</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.createBtn} onPress={() => router.push("/study-room")}>
          <Ionicons name="add-circle-outline" size={22} color="#fff" />
          <Text style={styles.createBtnText}>Create Study Room</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>📚 Study Subjects</Text>
        <Text style={styles.sectionSub}>Tap a subject to join the room & access resources</Text>

        {subjects.map((subject) => (
          <TouchableOpacity
            key={subject.id}
            style={styles.subjectCard}
            onPress={() => router.push(`/subject?id=${subject.id}`)}
          >
            <View style={styles.subjectLeft}>
              <Text style={styles.subjectEmoji}>{subject.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.subjectName}>{subject.name}</Text>
                <View style={styles.metaRow}>
                  <View style={styles.liveDot} />
                  <Text style={styles.metaText}>{subject.members} studying now</Text>
                </View>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#a78bfa" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#07051a" },
  header: {
    backgroundColor: "rgba(139,92,246,0.25)",
    paddingHorizontal: 22, paddingTop: 56, paddingBottom: 22,
    borderBottomWidth: 1, borderBottomColor: "rgba(139,92,246,0.4)",
  },
  greeting: { fontSize: 22, fontWeight: "700", color: "#e8e0ff" },
  subGreeting: { fontSize: 13, color: "#9b8ec4", marginTop: 4 },
  scroll: { padding: 16, paddingBottom: 32 },
  statsRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
  statCard: {
    flex: 1, backgroundColor: "#12093a", borderRadius: 16, padding: 16,
    borderWidth: 1,
  },
  statLabel: { color: "#9b8ec4", fontSize: 10, fontWeight: "600", marginTop: 8, letterSpacing: 1 },
  statValue: { color: "#e8e0ff", fontSize: 22, fontWeight: "700", marginTop: 4 },
  statSub: { color: "#6d6d8a", fontSize: 11, marginTop: 2 },
  createBtn: {
    backgroundColor: "#7c3aed", borderRadius: 14, padding: 16,
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 8, marginBottom: 24,
  },
  createBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  sectionTitle: { color: "#e8e0ff", fontSize: 18, fontWeight: "700", marginBottom: 4 },
  sectionSub: { color: "#9b8ec4", fontSize: 13, marginBottom: 16 },
  subjectCard: {
    backgroundColor: "#12093a", borderRadius: 16, padding: 16,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    marginBottom: 10, borderWidth: 1, borderColor: "rgba(139,92,246,0.35)",
  },
  subjectLeft: { flexDirection: "row", alignItems: "center", gap: 14, flex: 1 },
  subjectEmoji: { fontSize: 32 },
  subjectName: { color: "#e8e0ff", fontWeight: "600", fontSize: 15, marginBottom: 4 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: "#a78bfa" },
  metaText: { color: "#9b8ec4", fontSize: 12 },
});
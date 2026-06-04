import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";

const liveRooms = [
  {
    id: 1, subject: "Data Structures & Algorithms", emoji: "💻",
    members: 12, duration: "2h 15m",
    meetLink: "https://meet.google.com/vwg-hios-zrp",
    participants: [
      { avatar: "AJ", color: "#3b82f6" },
      { avatar: "SC", color: "#a855f7" },
      { avatar: "MB", color: "#ec4899" },
    ],
    othersCount: 9,
  },
  {
    id: 2, subject: "Operating Systems", emoji: "⚙️",
    members: 8, duration: "1h 45m",
    meetLink: "https://meet.google.com/zgn-nwwf-yzh",
    participants: [
      { avatar: "EW", color: "#22c55e" },
      { avatar: "PK", color: "#6366f1" },
      { avatar: "ME", color: "#f97316" },
    ],
    othersCount: 5,
  },
  {
    id: 3, subject: "Database Management", emoji: "🗄️",
    members: 15, duration: "3h 20m",
    meetLink: "https://meet.google.com/jja-hfrc-ypq",
    participants: [
      { avatar: "TL", color: "#06b6d4" },
      { avatar: "VN", color: "#14b8a6" },
      { avatar: "KS", color: "#f43f5e" },
    ],
    othersCount: 12,
  },
  {
    id: 4, subject: "Analysis & Design of Algorithms", emoji: "📊",
    members: 10, duration: "1h 30m",
    meetLink: "https://meet.google.com/uei-gszm-ope",
    participants: [
      { avatar: "RK", color: "#8b5cf6" },
      { avatar: "NP", color: "#ec4899" },
      { avatar: "AS", color: "#f59e0b" },
    ],
    othersCount: 7,
  },
  {
    id: 5, subject: "Mathematics", emoji: "📐",
    members: 6, duration: "2h 00m",
    meetLink: "https://meet.google.com/aor-emxa-epv",
    participants: [
      { avatar: "JD", color: "#10b981" },
      { avatar: "MS", color: "#3b82f6" },
      { avatar: "AL", color: "#f97316" },
    ],
    othersCount: 3,
  },
  {
    id: 6, subject: "Chemistry", emoji: "🧪",
    members: 9, duration: "1h 15m",
    meetLink: "https://meet.google.com/kyn-osvu-ywo",
    participants: [
      { avatar: "PQ", color: "#a855f7" },
      { avatar: "RS", color: "#22c55e" },
      { avatar: "TU", color: "#ef4444" },
    ],
    othersCount: 6,
  },
  {
    id: 7, subject: "Physics", emoji: "⚛️",
    members: 11, duration: "2h 45m",
    meetLink: "https://meet.google.com/xms-cthz-xrq",
    participants: [
      { avatar: "VW", color: "#06b6d4" },
      { avatar: "XY", color: "#f59e0b" },
      { avatar: "ZA", color: "#8b5cf6" },
    ],
    othersCount: 8,
  },
];

export default function Home() {
  const router = useRouter();
  const [userName, setUserName] = useState("Student");

  useEffect(() => {
    const user = auth.currentUser;
    if (user?.displayName) {
      setUserName(user.displayName.split(" ")[0]);
    }
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
        <Text style={styles.greeting}>{getGreeting()}, {userName}! 👋</Text>
        <Text style={styles.subGreeting}>Ready to continue your study journey?</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: "#7c3aed" }]}>
            <Ionicons name="flame" size={22} color="#fff" />
            <Text style={styles.statLabel}>Streak</Text>
            <Text style={styles.statValue}>12 Days</Text>
            <Text style={styles.statSub}>Keep it going! 🔥</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: "#16a34a" }]}>
            <Ionicons name="time-outline" size={22} color="#fff" />
            <Text style={styles.statLabel}>Today</Text>
            <Text style={styles.statValue}>5h 15m</Text>
            <Text style={styles.statSub}>Great progress!</Text>
          </View>
        </View>

        {/* Create Room */}
        <TouchableOpacity style={styles.createBtn} onPress={() => router.push("/study-room")}>
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.createBtnText}>Create Study Room</Text>
        </TouchableOpacity>

        {/* Live Rooms Header */}
        <View style={styles.sectionHeader}>
          <View style={styles.liveRow}>
            <View style={styles.liveDot} />
            <Text style={styles.sectionTitle}>Live Study Rooms</Text>
          </View>
          <Text style={styles.activeCount}>{liveRooms.length} active</Text>
        </View>

        {/* Room Cards */}
        {liveRooms.map((room) => (
          <View key={room.id} style={styles.roomCard}>
            <View style={styles.roomCardHeader}>
              <View style={{ flex: 1 }}>
                <View style={styles.roomTitleRow}>
                  <Text style={styles.roomEmoji}>{room.emoji}</Text>
                  <Text style={styles.roomSubject}>{room.subject}</Text>
                </View>
                <View style={styles.roomMeta}>
                  <Ionicons name="people-outline" size={14} color="#a78bfa" />
                  <Text style={styles.roomMetaText}>{room.members} members</Text>
                  <Ionicons name="time-outline" size={14} color="#4ade80" style={{ marginLeft: 8 }} />
                  <Text style={styles.roomMetaText}>{room.duration}</Text>
                </View>
              </View>
              <View style={styles.liveBadge}>
                <View style={styles.liveBadgeDot} />
                <Text style={styles.liveBadgeText}>Live</Text>
              </View>
            </View>

            {/* Avatars */}
            <View style={styles.avatarRow}>
              {room.participants.map((p, i) => (
                <View key={i} style={[styles.avatar, { backgroundColor: p.color }]}>
                  <Text style={styles.avatarText}>{p.avatar}</Text>
                </View>
              ))}
              {room.othersCount > 0 && (
                <View style={[styles.avatar, styles.avatarExtra]}>
                  <Text style={styles.avatarExtraText}>+{room.othersCount}</Text>
                </View>
              )}
            </View>

            {/* Join Button — opens Google Meet */}
            <TouchableOpacity
              style={styles.joinBtn}
              onPress={() => Linking.openURL(room.meetLink)}
            >
              <Ionicons name="videocam" size={18} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.joinBtnText}>Join on Google Meet</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  header: {
    backgroundColor: "rgba(88,28,235,0.3)",
    paddingHorizontal: 20, paddingTop: 56, paddingBottom: 16,
  },
  greeting: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  subGreeting: { fontSize: 13, color: "#ccc", marginTop: 4 },
  scroll: { padding: 16, paddingBottom: 20 },
  statsRow: { flexDirection: "row", gap: 12, marginBottom: 14 },
  statCard: { flex: 1, borderRadius: 16, padding: 16 },
  statLabel: { color: "#fff", fontSize: 12, fontWeight: "500", marginTop: 4 },
  statValue: { color: "#fff", fontSize: 24, fontWeight: "bold", marginTop: 4 },
  statSub: { color: "rgba(255,255,255,0.7)", fontSize: 11, marginTop: 2 },
  createBtn: {
    backgroundColor: "#16a34a", borderRadius: 16, padding: 16,
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 8, marginBottom: 20,
  },
  createBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  sectionHeader: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", marginBottom: 12,
  },
  liveRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  liveDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#22c55e" },
  sectionTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  activeCount: { color: "#888", fontSize: 13 },
  roomCard: {
    backgroundColor: "#0d0d0d", borderRadius: 16, padding: 16,
    marginBottom: 14, borderWidth: 1, borderColor: "rgba(88,28,235,0.25)",
  },
  roomCardHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  roomTitleRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4 },
  roomEmoji: { fontSize: 18 },
  roomSubject: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  roomMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
  roomMetaText: { color: "#888", fontSize: 12 },
  liveBadge: {
    flexDirection: "row", alignItems: "center", gap: 5,
    backgroundColor: "rgba(20,83,45,0.5)", paddingHorizontal: 10,
    paddingVertical: 5, borderRadius: 20, borderWidth: 1,
    borderColor: "rgba(34,197,94,0.3)", alignSelf: "flex-start",
  },
  liveBadgeDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: "#22c55e" },
  liveBadgeText: { color: "#4ade80", fontSize: 11, fontWeight: "600" },
  avatarRow: { flexDirection: "row", gap: 6, marginBottom: 12 },
  avatar: { width: 38, height: 38, borderRadius: 19, alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#fff", fontSize: 11, fontWeight: "bold" },
  avatarExtra: {
    backgroundColor: "rgba(88,28,235,0.4)",
    borderWidth: 1, borderColor: "rgba(167,139,250,0.3)",
  },
  avatarExtraText: { color: "#c4b5fd", fontSize: 11, fontWeight: "bold" },
  joinBtn: {
    backgroundColor: "#16a34a", borderRadius: 12,
    paddingVertical: 12, alignItems: "center",
    flexDirection: "row", justifyContent: "center",
  },
  joinBtnText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
});
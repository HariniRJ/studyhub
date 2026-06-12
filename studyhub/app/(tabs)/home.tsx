import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const liveRooms = [
  {
    id: 1, subject: "Data Structures & Algorithms", emoji: "💻",
    members: 12, duration: "2h 15m",
    meetLink: "https://meet.google.com/vwg-hios-zrp",
    participants: [{ avatar: "AJ" }, { avatar: "SC" }, { avatar: "MB" }],
    othersCount: 9,
  },
  {
    id: 2, subject: "Operating Systems", emoji: "⚙️",
    members: 8, duration: "1h 45m",
    meetLink: "https://meet.google.com/zgn-nwwf-yzh",
    participants: [{ avatar: "EW" }, { avatar: "PK" }, { avatar: "ME" }],
    othersCount: 5,
  },
  {
    id: 3, subject: "Database Management", emoji: "🗄️",
    members: 15, duration: "3h 20m",
    meetLink: "https://meet.google.com/jja-hfrc-ypq",
    participants: [{ avatar: "TL" }, { avatar: "VN" }, { avatar: "KS" }],
    othersCount: 12,
  },
  {
    id: 4, subject: "Analysis & Design of Algorithms", emoji: "📊",
    members: 10, duration: "1h 30m",
    meetLink: "https://meet.google.com/uei-gszm-ope",
    participants: [{ avatar: "RK" }, { avatar: "NP" }, { avatar: "AS" }],
    othersCount: 7,
  },
  {
    id: 5, subject: "Mathematics", emoji: "📐",
    members: 6, duration: "2h 00m",
    meetLink: "https://meet.google.com/aor-emxa-epv",
    participants: [{ avatar: "JD" }, { avatar: "MS" }, { avatar: "AL" }],
    othersCount: 3,
  },
  {
    id: 6, subject: "Chemistry", emoji: "🧪",
    members: 9, duration: "1h 15m",
    meetLink: "https://meet.google.com/kyn-osvu-ywo",
    participants: [{ avatar: "PQ" }, { avatar: "RS" }, { avatar: "TU" }],
    othersCount: 6,
  },
  {
    id: 7, subject: "Physics", emoji: "⚛️",
    members: 11, duration: "2h 45m",
    meetLink: "https://meet.google.com/xms-cthz-xrq",
    participants: [{ avatar: "VW" }, { avatar: "XY" }, { avatar: "ZA" }],
    othersCount: 8,
  },
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
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{getGreeting()}, {userName} 👋</Text>
          <Text style={styles.subGreeting}>Ready to continue your study journey?</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: "#2d2d2d" }]}>
            <Ionicons name="flame" size={20} color="#f5c842" />
            <Text style={styles.statLabel}>STREAK</Text>
            <Text style={styles.statValue}>12 Days</Text>
            <Text style={styles.statSub}>Keep it going! 🔥</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: "#2d2d2d" }]}>
            <Ionicons name="time-outline" size={20} color="#a8c5a0" />
            <Text style={styles.statLabel}>TODAY</Text>
            <Text style={styles.statValue}>5h 15m</Text>
            <Text style={styles.statSub}>Great progress!</Text>
          </View>
        </View>

        {/* Create Room */}
        <TouchableOpacity style={styles.createBtn} onPress={() => router.push("/study-room")}>
          <Ionicons name="add-circle-outline" size={22} color="#f5f0e8" />
          <Text style={styles.createBtnText}>Create Study Room</Text>
        </TouchableOpacity>

        {/* Section Header */}
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
                  <Ionicons name="people-outline" size={13} color="#8a8a7a" />
                  <Text style={styles.roomMetaText}>{room.members} members</Text>
                  <Text style={styles.metaDivider}>·</Text>
                  <Ionicons name="time-outline" size={13} color="#8a8a7a" />
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
                <View key={i} style={styles.avatar}>
                  <Text style={styles.avatarText}>{p.avatar}</Text>
                </View>
              ))}
              {room.othersCount > 0 && (
                <View style={[styles.avatar, styles.avatarExtra]}>
                  <Text style={styles.avatarExtraText}>+{room.othersCount}</Text>
                </View>
              )}
            </View>

            {/* Join Button */}
            <TouchableOpacity
              style={styles.joinBtn}
              onPress={() => Linking.openURL(room.meetLink)}
            >
              <Ionicons name="videocam-outline" size={16} color="#f5f0e8" style={{ marginRight: 6 }} />
              <Text style={styles.joinBtnText}>Join on Google Meet</Text>
            </TouchableOpacity>
          </View>
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

  statsRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
  },
  statLabel: {
    color: "#aaa",
    fontSize: 10,
    fontWeight: "600",
    marginTop: 8,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  statValue: { color: "#f5f0e8", fontSize: 22, fontWeight: "700", marginTop: 4 },
  statSub: { color: "#888", fontSize: 11, marginTop: 2 },

  createBtn: {
    backgroundColor: "#1a1a1a",
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 24,
  },
  createBtnText: { color: "#f5f0e8", fontWeight: "700", fontSize: 15 },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  liveRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#5a7a5a" },
  sectionTitle: { color: "#1a1a1a", fontSize: 16, fontWeight: "700" },
  activeCount: { color: "#8a8a7a", fontSize: 12 },

  roomCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  roomCardHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  roomTitleRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 5 },
  roomEmoji: { fontSize: 16 },
  roomSubject: { color: "#1a1a1a", fontWeight: "600", fontSize: 14, flex: 1 },
  roomMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
  roomMetaText: { color: "#8a8a7a", fontSize: 12 },
  metaDivider: { color: "#ccc", marginHorizontal: 4 },

  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#eef4ee",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  liveBadgeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#5a7a5a" },
  liveBadgeText: { color: "#5a7a5a", fontSize: 11, fontWeight: "600" },

  avatarRow: { flexDirection: "row", gap: 6, marginBottom: 14 },
  avatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: "#2d2d2d",
    alignItems: "center", justifyContent: "center",
  },
  avatarText: { color: "#f5f0e8", fontSize: 11, fontWeight: "700" },
  avatarExtra: { backgroundColor: "#e8e3db" },
  avatarExtraText: { color: "#8a8a7a", fontSize: 11, fontWeight: "700" },

  joinBtn: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  joinBtnText: { color: "#f5f0e8", fontWeight: "600", fontSize: 14 },
});

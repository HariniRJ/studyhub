import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const weeklyData = [
  { day: "Mon", hours: 4.5 },
  { day: "Tue", hours: 5.2 },
  { day: "Wed", hours: 3.8 },
  { day: "Thu", hours: 6.1 },
  { day: "Fri", hours: 5.5 },
  { day: "Sat", hours: 7.2 },
  { day: "Sun", hours: 4.8 },
];

const achievements = [
  { emoji: "🔥", name: "Streak Master", unlocked: true },
  { emoji: "⏰", name: "Early Bird", unlocked: true },
  { emoji: "🎯", name: "Goal Crusher", unlocked: true },
  { emoji: "💯", name: "100 Hours", unlocked: false },
  { emoji: "👥", name: "Social Learner", unlocked: true },
  { emoji: "📚", name: "Bookworm", unlocked: false },
];

const recentSessions = [
  { subject: "Data Structures", duration: "2h 30m", date: "Today", color: "#3b82f6" },
  { subject: "Operating Systems", duration: "1h 45m", date: "Yesterday", color: "#a855f7" },
  { subject: "DBMS", duration: "3h 15m", date: "2 days ago", color: "#22c55e" },
  { subject: "Computer Networks", duration: "1h 20m", date: "3 days ago", color: "#f97316" },
];

const maxHours = Math.max(...weeklyData.map((d) => d.hours));

export default function Analytics() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Progress</Text>
        <Text style={styles.subtitle}>Keep up the great work!</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: "#7c3aed" }]}>
            <Ionicons name="flame" size={20} color="#fff" />
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: "#16a34a" }]}>
            <Ionicons name="time-outline" size={20} color="#fff" />
            <Text style={styles.statValue}>156h</Text>
            <Text style={styles.statLabel}>Total Hours</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: "#6d28d9" }]}>
            <Ionicons name="flag-outline" size={20} color="#fff" />
            <Text style={styles.statValue}>5.3h</Text>
            <Text style={styles.statLabel}>Daily Avg</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>This Week</Text>
            <View style={styles.trendBadge}>
              <Ionicons name="trending-up" size={14} color="#4ade80" />
              <Text style={styles.trendText}>+15%</Text>
            </View>
          </View>

          <View style={styles.chartContainer}>
            {weeklyData.map((d, i) => {
              const heightPct = (d.hours / maxHours) * 140;
              return (
                <View key={i} style={styles.barWrapper}>
                  <Text style={styles.barLabel}>{d.hours}h</Text>
                  <View style={styles.barBg}>
                    <View style={[styles.bar, { height: heightPct }]} />
                  </View>
                  <Text style={styles.dayLabel}>{d.day}</Text>
                </View>
              );
            })}
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total this week</Text>
            <Text style={styles.totalValue}>37h 0m</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Ionicons name="trophy-outline" size={18} color="#22c55e" />
            <Text style={[styles.cardTitle, { marginLeft: 6 }]}>Achievements</Text>
          </View>
          <View style={styles.achievementsGrid}>
            {achievements.map((a, i) => (
              <View key={i} style={[styles.achievementItem, a.unlocked ? styles.achievementUnlocked : styles.achievementLocked]}>
                <Text style={{ fontSize: 28, marginBottom: 6 }}>{a.emoji}</Text>
                <Text style={styles.achievementName}>{a.name}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent Sessions</Text>
          {recentSessions.map((s, i) => (
            <View key={i} style={styles.sessionRow}>
              <View style={[styles.sessionIcon, { backgroundColor: s.color }]}>
                <Ionicons name="time-outline" size={18} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.sessionSubject}>{s.subject}</Text>
                <Text style={styles.sessionDate}>{s.date}</Text>
              </View>
              <Text style={styles.sessionDuration}>{s.duration}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  header: { backgroundColor: "rgba(88,28,235,0.3)", paddingHorizontal: 20, paddingTop: 56, paddingBottom: 16 },
  title: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  subtitle: { color: "#ccc", fontSize: 13, marginTop: 4 },
  scroll: { padding: 16, paddingBottom: 24 },
  statsRow: { flexDirection: "row", gap: 10, marginBottom: 14 },
  statCard: { flex: 1, borderRadius: 14, padding: 12, alignItems: "center", gap: 4 },
  statValue: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  statLabel: { color: "rgba(255,255,255,0.7)", fontSize: 10, textAlign: "center" },
  card: { backgroundColor: "#0d0d0d", borderRadius: 16, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: "rgba(88,28,235,0.25)" },
  cardHeaderRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  cardTitle: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  trendBadge: {
    flexDirection: "row", alignItems: "center", gap: 4,
    backgroundColor: "rgba(20,83,45,0.5)", paddingHorizontal: 10,
    paddingVertical: 4, borderRadius: 20, borderWidth: 1, borderColor: "rgba(34,197,94,0.3)",
  },
  trendText: { color: "#4ade80", fontSize: 12, fontWeight: "600" },
  chartContainer: { flexDirection: "row", alignItems: "flex-end", height: 180, gap: 6, marginBottom: 12 },
  barWrapper: { flex: 1, alignItems: "center", justifyContent: "flex-end", height: "100%" },
  barLabel: { color: "#fff", fontSize: 9, marginBottom: 4 },
  barBg: { width: "100%", height: 140, justifyContent: "flex-end" },
  bar: { width: "100%", backgroundColor: "#16a34a", borderRadius: 4 },
  dayLabel: { color: "#888", fontSize: 10, marginTop: 4 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: "rgba(88,28,235,0.25)", paddingTop: 12 },
  totalLabel: { color: "#888" },
  totalValue: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  achievementsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  achievementItem: { width: "30%", borderRadius: 12, padding: 12, alignItems: "center" },
  achievementUnlocked: { backgroundColor: "rgba(20,83,45,0.3)", borderWidth: 2, borderColor: "rgba(34,197,94,0.4)" },
  achievementLocked: { backgroundColor: "rgba(30,30,30,0.5)", borderWidth: 1, borderColor: "#222", opacity: 0.5 },
  achievementName: { color: "#fff", fontSize: 10, fontWeight: "500", textAlign: "center", marginTop: 2 },
  sessionRow: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 12 },
  sessionIcon: { width: 40, height: 40, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  sessionSubject: { color: "#fff", fontWeight: "600", fontSize: 14 },
  sessionDate: { color: "#888", fontSize: 12, marginTop: 2 },
  sessionDuration: { color: "#4ade80", fontWeight: "bold", fontSize: 14 },
});
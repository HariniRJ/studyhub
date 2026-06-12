import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const weeklyData = [
  { day: "Mon", hours: 4.5 },
  { day: "Tue", hours: 5.2 },
  { day: "Wed", hours: 3.8 },
  { day: "Thu", hours: 6.1 },
  { day: "Fri", hours: 5.5 },
  { day: "Sat", hours: 7.2 },
  { day: "Sun", hours: 4.8 },
];

const recentSessions = [
  { subject: "Data Structures", duration: "2h 30m", date: "Today" },
  { subject: "Operating Systems", duration: "1h 45m", date: "Yesterday" },
  { subject: "DBMS", duration: "3h 15m", date: "2 days ago" },
  { subject: "Computer Networks", duration: "1h 20m", date: "3 days ago" },
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

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="flame" size={18} color="#f5c842" />
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="time-outline" size={18} color="#a8c5a0" />
            <Text style={styles.statValue}>156h</Text>
            <Text style={styles.statLabel}>Total Hours</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="flag-outline" size={18} color="#aaa" />
            <Text style={styles.statValue}>5.3h</Text>
            <Text style={styles.statLabel}>Daily Avg</Text>
          </View>
        </View>

        {/* Weekly Chart */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>This Week</Text>
            <View style={styles.trendBadge}>
              <Ionicons name="trending-up" size={13} color="#5a7a5a" />
              <Text style={styles.trendText}>+15%</Text>
            </View>
          </View>

          <View style={styles.chartContainer}>
            {weeklyData.map((d, i) => {
              const heightPct = (d.hours / maxHours) * 130;
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

        {/* Recent Sessions */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent Sessions</Text>
          {recentSessions.map((s, i) => (
            <View key={i} style={[styles.sessionRow, i > 0 && { borderTopWidth: 1, borderTopColor: "#f0ebe3" }]}>
              <View style={styles.sessionIcon}>
                <Ionicons name="time-outline" size={16} color="#1a1a1a" />
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
  container: { flex: 1, backgroundColor: "#f5f0e8" },

  header: {
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 22,
    paddingTop: 56,
    paddingBottom: 22,
  },
  title: { fontSize: 22, fontWeight: "700", color: "#f5f0e8" },
  subtitle: { color: "#8a8a7a", fontSize: 13, marginTop: 4 },

  scroll: { padding: 16, paddingBottom: 32 },

  statsRow: { flexDirection: "row", gap: 10, marginBottom: 16 },
  statCard: {
    flex: 1,
    backgroundColor: "#2d2d2d",
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
    gap: 4,
  },
  statValue: { color: "#f5f0e8", fontSize: 20, fontWeight: "700" },
  statLabel: { color: "#888", fontSize: 10, textAlign: "center", textTransform: "uppercase", letterSpacing: 0.5 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  cardTitle: { color: "#1a1a1a", fontSize: 16, fontWeight: "700" },

  trendBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#eef4ee",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  trendText: { color: "#5a7a5a", fontSize: 12, fontWeight: "600" },

  chartContainer: { flexDirection: "row", alignItems: "flex-end", height: 170, gap: 6, marginBottom: 12 },
  barWrapper: { flex: 1, alignItems: "center", justifyContent: "flex-end", height: "100%" },
  barLabel: { color: "#8a8a7a", fontSize: 9, marginBottom: 4 },
  barBg: { width: "100%", height: 130, justifyContent: "flex-end" },
  bar: { width: "100%", backgroundColor: "#2d2d2d", borderRadius: 4 },
  dayLabel: { color: "#8a8a7a", fontSize: 10, marginTop: 4 },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#f0ebe3",
    paddingTop: 12,
  },
  totalLabel: { color: "#8a8a7a", fontSize: 13 },
  totalValue: { color: "#1a1a1a", fontWeight: "700", fontSize: 16 },

  sessionRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12 },
  sessionIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#f5f0e8",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e0d8cc",
  },
  sessionSubject: { color: "#1a1a1a", fontWeight: "600", fontSize: 14 },
  sessionDate: { color: "#8a8a7a", fontSize: 12, marginTop: 2 },
  sessionDuration: { color: "#5a7a5a", fontWeight: "700", fontSize: 14 },
});

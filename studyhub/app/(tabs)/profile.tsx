import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const interests = ["Data Structures", "Operating Systems", "DBMS", "Computer Networks"];

const menuItems = [
  { icon: "settings-outline", label: "Settings" },
  { icon: "notifications-outline", label: "Notifications", badge: "3" },
  { icon: "shield-outline", label: "Privacy & Security" },
  { icon: "help-circle-outline", label: "Help & Support" },
];

const weekSummary = [
  { label: "Study Sessions", value: "32 sessions" },
  { label: "Total Study Time", value: "37h 0m" },
  { label: "Rooms Joined", value: "18 rooms" },
  { label: "Avg. Session", value: "2h 15m" },
];

export default function Profile() {
  const router = useRouter();

  // GET USER DATA FROM LOGIN
  const params = useLocalSearchParams();

  const username =
    typeof params.username === "string" ? params.username : "User";

  const email =
    typeof params.email === "string"
      ? params.email
      : "user@gmail.com";

  // AVATAR LETTERS
  const avatarLetters = username
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Banner */}
        <View style={styles.banner}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{avatarLetters}</Text>
          </View>

          {/* USERNAME */}
          <Text style={styles.name}>{username}</Text>

          {/* EMAIL */}
          <View style={styles.emailRow}>
            <Ionicons
              name="mail-outline"
              size={14}
              color="rgba(255,255,255,0.8)"
            />
            <Text style={styles.email}>{email}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsCard}>
          {[
            {
              icon: "flame",
              color: "#7c3aed",
              value: "12",
              label: "Day Streak",
            },
            {
              icon: "time-outline",
              color: "#16a34a",
              value: "156h",
              label: "Study Hours",
            },
            {
              icon: "trophy-outline",
              color: "#6d28d9",
              value: "Lv 8",
              label: "XP: 2,450",
            },
          ].map((s, i) => (
            <View key={i} style={styles.statItem}>
              <View
                style={[styles.statIcon, { backgroundColor: s.color }]}
              >
                <Ionicons name={s.icon as any} size={20} color="#fff" />
              </View>

              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Study Interests */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Study Interests</Text>

            <TouchableOpacity>
              <Text style={styles.editBtn}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tagsRow}>
            {interests.map((interest, i) => (
              <View key={i} style={styles.tag}>
                <Text style={styles.tagText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Week Summary */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Ionicons
              name="trophy-outline"
              size={18}
              color="#22c55e"
            />

            <Text
              style={[styles.cardTitle, { marginLeft: 6 }]}
            >
              This Week Summary
            </Text>
          </View>

          {weekSummary.map((item, i) => (
            <View key={i} style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>{item.label}</Text>

              <Text style={styles.summaryValue}>
                {item.value}
              </Text>
            </View>
          ))}
        </View>

        {/* Menu */}
        <View style={styles.menuCard}>
          {menuItems.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.menuItem,
                i < menuItems.length - 1 &&
                  styles.menuBorder,
              ]}
            >
              <View style={styles.menuLeft}>
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color="#888"
                />

                <Text style={styles.menuLabel}>
                  {item.label}
                </Text>
              </View>

              <View style={styles.menuRight}>
                {item.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {item.badge}
                    </Text>
                  </View>
                )}

                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color="#555"
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => router.replace("/")}
        >
          <Ionicons
            name="log-out-outline"
            size={20}
            color="#fff"
          />

          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  scroll: {
    paddingBottom: 32,
  },

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

  avatarText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },

  name: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 6,
  },

  emailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  email: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
  },

  statsCard: {
    flexDirection: "row",
    backgroundColor: "#0d0d0d",
    borderRadius: 16,
    margin: 16,
    marginTop: -24,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(88,28,235,0.25)",
    justifyContent: "space-around",
  },

  statItem: {
    alignItems: "center",
    gap: 6,
  },

  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  statValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  statLabel: {
    color: "#888",
    fontSize: 11,
  },

  card: {
    backgroundColor: "#0d0d0d",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(88,28,235,0.25)",
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
    flex: 1,
  },

  editBtn: {
    color: "#22c55e",
    fontSize: 13,
    fontWeight: "500",
  },

  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  tag: {
    backgroundColor: "rgba(20,83,45,0.3)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.3)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  tagText: {
    color: "#86efac",
    fontSize: 12,
    fontWeight: "500",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(88,28,235,0.15)",
  },

  summaryLabel: {
    color: "#888",
    fontSize: 13,
  },

  summaryValue: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },

  menuCard: {
    backgroundColor: "#0d0d0d",
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(88,28,235,0.25)",
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  menuBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(88,28,235,0.2)",
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  menuLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },

  menuRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  badge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#22c55e",
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
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
    borderWidth: 2,
    borderColor: "rgba(88,28,235,0.3)",
  },

  logoutText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 14,
  },
});
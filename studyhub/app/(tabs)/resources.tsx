import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const categories = [
  { name: "Notes", icon: "document-text-outline", color: "#3b82f6" },
  { name: "PYQs", icon: "download-outline", color: "#a855f7" },
  { name: "Videos", icon: "logo-youtube", color: "#ef4444" },
];

const subjects = [
  { id: 1, name: "Data Structures & Algorithms", emoji: "💻", items: 45, color: "#3b82f6" },
  { id: 2, name: "Operating Systems", emoji: "⚙️", items: 38, color: "#a855f7" },
  { id: 3, name: "Database Management", emoji: "🗄️", items: 32, color: "#22c55e" },
  { id: 4, name: "Computer Networks", emoji: "🌐", items: 28, color: "#f97316" },
  { id: 5, name: "Mathematics", emoji: "📐", items: 42, color: "#6366f1" },
  { id: 6, name: "Software Engineering", emoji: "🛠️", items: 35, color: "#f43f5e" },
];

export default function Resources() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Study Resources</Text>
        <View style={styles.searchRow}>
          <Ionicons name="search-outline" size={18} color="#555" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for notes, videos..."
            placeholderTextColor="#555"
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Browse by Type</Text>
        <View style={styles.categoriesRow}>
          {categories.map((c) => (
            <TouchableOpacity key={c.name} style={styles.categoryCard}>
              <View style={[styles.categoryIcon, { backgroundColor: c.color + "33" }]}>
                <Ionicons name={c.icon as any} size={24} color={c.color} />
              </View>
              <Text style={styles.categoryName}>{c.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Engineering Subjects</Text>
        {subjects.map((s) => (
          <TouchableOpacity key={s.id} style={styles.subjectCard}>
            <View style={[styles.subjectEmoji, { backgroundColor: s.color + "33" }]}>
              <Text style={{ fontSize: 24 }}>{s.emoji}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.subjectName}>{s.name}</Text>
              <Text style={styles.subjectItems}>{s.items} resources</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#a78bfa" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  header: { backgroundColor: "rgba(88,28,235,0.3)", paddingHorizontal: 20, paddingTop: 56, paddingBottom: 16 },
  title: { fontSize: 22, fontWeight: "bold", color: "#fff", marginBottom: 12 },
  searchRow: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#111", borderRadius: 12,
    borderWidth: 1, borderColor: "rgba(88,28,235,0.3)",
  },
  searchIcon: { paddingLeft: 14 },
  searchInput: { flex: 1, color: "#fff", padding: 12, fontSize: 14 },
  scroll: { padding: 16, paddingBottom: 24 },
  sectionTitle: { color: "#fff", fontSize: 17, fontWeight: "bold", marginBottom: 12, marginTop: 4 },
  categoriesRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
  categoryCard: {
    flex: 1, backgroundColor: "#0d0d0d", borderRadius: 14,
    padding: 14, alignItems: "center",
    borderWidth: 1, borderColor: "rgba(88,28,235,0.25)",
  },
  categoryIcon: { width: 48, height: 48, borderRadius: 12, alignItems: "center", justifyContent: "center", marginBottom: 8 },
  categoryName: { color: "#fff", fontWeight: "600", fontSize: 13 },
  subjectCard: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#0d0d0d", borderRadius: 14, padding: 14,
    marginBottom: 10, gap: 12,
    borderWidth: 1, borderColor: "rgba(88,28,235,0.25)",
  },
  subjectEmoji: { width: 52, height: 52, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  subjectName: { color: "#fff", fontWeight: "600", fontSize: 14 },
  subjectItems: { color: "#888", fontSize: 12, marginTop: 2 },
});
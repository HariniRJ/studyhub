import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const subjects = [
  {
    id: 1, name: "Database Management", emoji: "🗄️", color: "#a78bfa",
    units: [
      {
        unit: "Unit 1",
        notes: "https://drive.google.com/file/d/1y9rr8NWDC6slOpajp3SIMvbypqB6d8hP/preview",
        youtube: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y",
      },
      {
        unit: "Unit 2",
        notes: "https://drive.google.com/file/d/1axg3M8smtgZ2vgAyCKW0jKKOsV5mu9aX/preview",
        youtube: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRiyryTrbKHX1Sh9luYI0dhX",
      },
      {
        unit: "Unit 3",
        notes: "https://drive.google.com/file/d/1-Zr892djM9d5iixg-jqJv432vsbQSvKR/preview",
        youtube: "https://www.youtube.com/playlist?list=PLdo5W4Nhv31b33kF46f9aFjoJPOkdlsRc",
      },
    ],
  },
  {
    id: 2, name: "Operating Systems", emoji: "⚙️", color: "#60a5fa",
    units: [
      {
        unit: "Unit 1",
        notes: "https://drive.google.com/file/d/1bcFHHcYCMT3F8A29Sy4kxfOqigJMhFu5/preview",
        youtube: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i",
      },
      {
        unit: "Unit 2",
        notes: "https://drive.google.com/file/d/1mN6kQ_XWonhUoCgYlrZFKCRaX2H4yfaZ/preview",
        youtube: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRiVhbXDGLXDk_OQAeuVcp2O",
      },
      {
        unit: "Unit 3",
        notes: "https://drive.google.com/file/d/1kc20kve9oyGJNJpSOr02JMj45KRtA0AW/preview",
        youtube: "https://www.youtube.com/playlist?list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV",
      },
    ],
  },
  {
    id: 3, name: "Analysis & Design of Algorithms", emoji: "📊", color: "#818cf8",
    units: [
      {
        unit: "Unit 1",
        notes: "https://drive.google.com/file/d/1zoQY3Yms62CtwJhm_VR_4wTgvQAJCEIv/preview",
        youtube: "https://www.youtube.com/playlist?list=PLfqMhTWNBTe0b2nM6JHVCnAkhQRGiZMSJ",
      },
      {
        unit: "Unit 2",
        notes: "https://drive.google.com/file/d/1zAXiioEBWGNfJH9621t0Al0-bEWmk1RH/preview",
        youtube: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiEwaANNt3O2Jf3g3Xf4QxZr",
      },
      {
        unit: "Unit 3",
        notes: "https://drive.google.com/file/d/1ETeL6kyBRi5G0XiSuI6ofOgAl4gidcpX/preview",
        youtube: "https://www.youtube.com/results?search_query=Neso+Academy+Design+and+Analysis+of+Algorithms",
      },
    ],
  },
];

export default function Resources() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const toggle = (id: number) => setExpandedId(expandedId === id ? null : id);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Study Resources</Text>
        <View style={styles.searchRow}>
          <Ionicons name="search-outline" size={18} color="#9b8ec4" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for notes, videos..."
            placeholderTextColor="#6d6d8a"
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Engineering Subjects</Text>
        {subjects.map((s) => (
          <View key={s.id}>
            <TouchableOpacity style={styles.subjectCard} onPress={() => toggle(s.id)}>
              <View style={[styles.subjectEmoji, { backgroundColor: s.color + "33" }]}>
                <Text style={{ fontSize: 24 }}>{s.emoji}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.subjectName}>{s.name}</Text>
                <Text style={styles.subjectItems}>{s.units.length} units</Text>
              </View>
              <Ionicons name={expandedId === s.id ? "chevron-down" : "chevron-forward"} size={20} color="#a78bfa" />
            </TouchableOpacity>

            {expandedId === s.id && (
              <View style={styles.unitsContainer}>
                {s.units.map((u) => (
                  <View key={u.unit} style={styles.unitCard}>
                    <Text style={styles.unitTitle}>{u.unit}</Text>
                    <View style={styles.btnRow}>
                      <TouchableOpacity style={styles.notesBtn} onPress={() => Linking.openURL(u.notes)}>
                        <Ionicons name="document-text-outline" size={16} color="#fff" />
                        <Text style={styles.btnText}>Notes PDF</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.youtubeBtn} onPress={() => Linking.openURL(u.youtube)}>
                        <Ionicons name="logo-youtube" size={16} color="#fff" />
                        <Text style={styles.btnText}>YouTube</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#07051a" },
  header: {
    backgroundColor: "rgba(139,92,246,0.25)", paddingHorizontal: 20,
    paddingTop: 56, paddingBottom: 16,
    borderBottomWidth: 1, borderBottomColor: "rgba(139,92,246,0.3)",
  },
  title: { fontSize: 22, fontWeight: "bold", color: "#e8e0ff", marginBottom: 12 },
  searchRow: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#12093a", borderRadius: 12,
    borderWidth: 1, borderColor: "rgba(139,92,246,0.3)",
  },
  searchIcon: { paddingLeft: 14 },
  searchInput: { flex: 1, color: "#e8e0ff", padding: 12, fontSize: 14 },
  scroll: { padding: 16, paddingBottom: 24 },
  sectionTitle: { color: "#e8e0ff", fontSize: 17, fontWeight: "bold", marginBottom: 12, marginTop: 4 },
  subjectCard: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#12093a", borderRadius: 14, padding: 14,
    marginBottom: 10, gap: 12,
    borderWidth: 1, borderColor: "rgba(139,92,246,0.3)",
  },
  subjectEmoji: { width: 52, height: 52, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  subjectName: { color: "#e8e0ff", fontWeight: "600", fontSize: 14 },
  subjectItems: { color: "#9b8ec4", fontSize: 12, marginTop: 2 },
  unitsContainer: { marginBottom: 10, marginTop: -6 },
  unitCard: {
    backgroundColor: "#1a0f4a", borderRadius: 12, padding: 14,
    marginBottom: 6, borderWidth: 1, borderColor: "rgba(139,92,246,0.25)",
  },
  unitTitle: { color: "#c4b5fd", fontWeight: "600", fontSize: 14, marginBottom: 10 },
  btnRow: { flexDirection: "row", gap: 10 },
  notesBtn: {
    flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center",
    backgroundColor: "#4f46e5", borderRadius: 8, padding: 10, gap: 6,
  },
  youtubeBtn: {
    flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center",
    backgroundColor: "#ef4444", borderRadius: 8, padding: 10, gap: 6,
  },
  btnText: { color: "#fff", fontWeight: "600", fontSize: 13 },
});
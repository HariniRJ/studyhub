import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, TextInput, Alert, Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function StudyRoom() {
  const router = useRouter();
  const [tab, setTab] = useState<"create" | "join">("create");
  const [meetLink, setMeetLink] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [roomCode] = useState(Math.random().toString(36).substring(2, 8).toUpperCase());
  const [roomCreated, setRoomCreated] = useState(false);

  const handleCreate = () => {
    if (!meetLink.trim()) {
      Alert.alert("Missing Link", "Please enter your Google Meet link");
      return;
    }
    setRoomCreated(true);
  };

  const handleJoin = () => {
    if (joinCode.length < 4) {
      Alert.alert("Invalid Code", "Please enter a valid room code");
      return;
    }
    Alert.alert("Joined!", `Opening study room ${joinCode}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Study Room</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Toggle tabs */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tabBtn, tab === "create" && styles.tabBtnActive]}
            onPress={() => { setTab("create"); setRoomCreated(false); }}
          >
            <Ionicons name="add-circle-outline" size={18} color={tab === "create" ? "#000" : "#aaa"} />
            <Text style={[styles.tabText, tab === "create" && styles.tabTextActive]}>Create Room</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, tab === "join" && styles.tabBtnActive]}
            onPress={() => setTab("join")}
          >
            <Ionicons name="enter-outline" size={18} color={tab === "join" ? "#000" : "#aaa"} />
            <Text style={[styles.tabText, tab === "join" && styles.tabTextActive]}>Join Room</Text>
          </TouchableOpacity>
        </View>

        {/* CREATE tab */}
        {tab === "create" && !roomCreated && (
          <View style={styles.card}>
            <Ionicons name="videocam-outline" size={48} color="#1DB954" style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Enter Google Meet Link</Text>
            <Text style={styles.cardSubtitle}>Paste your Google Meet link below. Your friends will join using the room code.</Text>

            <Text style={styles.label}>Google Meet Link</Text>
            <TextInput
              style={styles.input}
              placeholder="https://meet.google.com/xxx-xxxx-xxx"
              placeholderTextColor="#555"
              value={meetLink}
              onChangeText={setMeetLink}
              autoCapitalize="none"
            />

            <TouchableOpacity style={styles.primaryBtn} onPress={handleCreate}>
              <Text style={styles.primaryBtnText}>Create Study Room</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => Linking.openURL("https://meet.google.com/new")}
            >
              <Ionicons name="open-outline" size={16} color="#1DB954" />
              <Text style={styles.secondaryBtnText}>Create new Google Meet</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Room created — show code */}
        {tab === "create" && roomCreated && (
          <View style={styles.card}>
            <Ionicons name="checkmark-circle" size={56} color="#1DB954" style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Room Created!</Text>
            <Text style={styles.cardSubtitle}>Share this code with your friends so they can join your study room.</Text>

            <View style={styles.codeBox}>
              <Text style={styles.codeLabel}>Your Room Code</Text>
              <Text style={styles.codeText}>{roomCode}</Text>
            </View>

            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => Linking.openURL(meetLink)}
            >
              <Ionicons name="videocam" size={18} color="#000" />
              <Text style={styles.primaryBtnText}>Open Google Meet</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryBtn} onPress={() => setRoomCreated(false)}>
              <Text style={styles.secondaryBtnText}>Change Meet Link</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* JOIN tab */}
        {tab === "join" && (
          <View style={styles.card}>
            <Ionicons name="enter" size={48} color="#a78bfa" style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Join a Study Room</Text>
            <Text style={styles.cardSubtitle}>Enter the room code shared by your friend to join their study session.</Text>

            <Text style={styles.label}>Room Code</Text>
            <TextInput
              style={[styles.input, styles.codeInput]}
              placeholder="e.g. ABC123"
              placeholderTextColor="#555"
              value={joinCode}
              onChangeText={(t) => setJoinCode(t.toUpperCase())}
              maxLength={8}
              autoCapitalize="characters"
            />

            <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: "#a78bfa" }]} onPress={handleJoin}>
              <Text style={styles.primaryBtnText}>Join Room</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  header: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "rgba(88,28,235,0.3)",
    paddingHorizontal: 16, paddingTop: 56, paddingBottom: 16, gap: 12,
  },
  backBtn: { padding: 4 },
  headerTitle: { flex: 1, color: "#fff", fontSize: 18, fontWeight: "bold" },
  scroll: { padding: 20, paddingBottom: 40 },
  tabRow: {
    flexDirection: "row", backgroundColor: "#111",
    borderRadius: 14, padding: 4, marginBottom: 24,
    borderWidth: 1, borderColor: "rgba(88,28,235,0.25)",
  },
  tabBtn: {
    flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center",
    paddingVertical: 12, borderRadius: 10, gap: 6,
  },
  tabBtnActive: { backgroundColor: "#1DB954" },
  tabText: { color: "#aaa", fontWeight: "600", fontSize: 14 },
  tabTextActive: { color: "#000" },
  card: {
    backgroundColor: "#0d0d0d", borderRadius: 20, padding: 24,
    borderWidth: 1, borderColor: "rgba(88,28,235,0.25)", alignItems: "center",
  },
  cardIcon: { marginBottom: 16 },
  cardTitle: { color: "#fff", fontSize: 20, fontWeight: "bold", marginBottom: 8, textAlign: "center" },
  cardSubtitle: { color: "#888", fontSize: 14, textAlign: "center", marginBottom: 24, lineHeight: 20 },
  label: { color: "#ccc", fontSize: 13, fontWeight: "500", alignSelf: "flex-start", marginBottom: 8 },
  input: {
    width: "100%", backgroundColor: "#1a1a1a", color: "#fff",
    borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14,
    borderWidth: 1, borderColor: "rgba(88,28,235,0.3)", fontSize: 14, marginBottom: 16,
  },
  codeInput: { fontSize: 22, textAlign: "center", letterSpacing: 6 },
  primaryBtn: {
    width: "100%", backgroundColor: "#1DB954", borderRadius: 12,
    paddingVertical: 16, alignItems: "center", flexDirection: "row",
    justifyContent: "center", gap: 8, marginBottom: 12,
  },
  primaryBtnText: { color: "#000", fontWeight: "bold", fontSize: 16 },
  secondaryBtn: {
    flexDirection: "row", alignItems: "center", gap: 6, paddingVertical: 8,
  },
  secondaryBtnText: { color: "#1DB954", fontSize: 14, fontWeight: "500" },
  codeBox: {
    width: "100%", backgroundColor: "#111", borderRadius: 14, padding: 20,
    alignItems: "center", marginBottom: 20,
    borderWidth: 1, borderColor: "rgba(29,185,84,0.3)",
  },
  codeLabel: { color: "#888", fontSize: 13, marginBottom: 8 },
  codeText: { color: "#1DB954", fontSize: 40, fontWeight: "bold", letterSpacing: 8 },
});
import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, TextInput, Alert, ActivityIndicator,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";

const subjects = [
  { id: 1, name: "Data Structures", emoji: "💻", participants: 12 },
  { id: 2, name: "Operating Systems", emoji: "⚙️", participants: 8 },
  { id: 3, name: "Mathematics", emoji: "📐", participants: 15 },
  { id: 4, name: "Computer Networks", emoji: "🌐", participants: 6 },
  { id: 5, name: "Database Management", emoji: "🗄️", participants: 10 },
  { id: 6, name: "Software Engineering", emoji: "🛠️", participants: 9 },
];

const messages = [
  { id: 1, user: "Alex", text: "Hey everyone! Let's focus on trees today 🌳", time: "10:02" },
  { id: 2, user: "Sara", text: "Sure! I have some doubts on AVL trees", time: "10:03" },
  { id: 3, user: "Mike", text: "Same here, let's go through it together", time: "10:04" },
];

export default function StudyRoom() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
  const [mode, setMode] = useState<"select" | "create" | "join" | "room">("select");
  const [joinCode, setJoinCode] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [micOn, setMicOn] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [activeTab, setActiveTab] = useState<"public" | "private">("public");
  const [loading, setLoading] = useState(false);

  const generateCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

  const handleCreateRoom = async () => {
    if (!selectedSubject) {
      Alert.alert("Please select a subject first!");
      return;
    }
    setLoading(true);
    try {
      const code = generateCode();
      const subject = subjects.find(s => s.id === selectedSubject);
      await addDoc(collection(db, "rooms"), {
        code: code,
        subject: subject?.name,
        createdBy: auth.currentUser?.uid,
        createdByName: auth.currentUser?.displayName,
        createdAt: new Date().toISOString(),
        participants: [auth.currentUser?.uid],
      });
      setRoomCode(code);
      setMode("room");
    } catch (e) {
      Alert.alert("Error", "Could not create room. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    if (joinCode.length < 4) {
      Alert.alert("Invalid Code", "Please enter a valid room code");
      return;
    }
    setLoading(true);
    try {
      const q = query(collection(db, "rooms"), where("code", "==", joinCode));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        Alert.alert("Room Not Found", "No room found with this code. Check and try again!");
      } else {
        setRoomCode(joinCode);
        setMode("room");
      }
    } catch (e) {
      Alert.alert("Error", "Could not join room. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleEnableCamera = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (result.granted) setCameraOn(true);
    } else {
      setCameraOn(!cameraOn);
    }
  };

  // Subject Selection Screen
  if (mode === "select") {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Study Rooms</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionCard} onPress={() => setMode("create")}>
              <Ionicons name="add-circle" size={32} color="#1DB954" />
              <Text style={styles.actionTitle}>Create Room</Text>
              <Text style={styles.actionDesc}>Start a new session</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard} onPress={() => setMode("join")}>
              <Ionicons name="enter" size={32} color="#a78bfa" />
              <Text style={styles.actionTitle}>Join Room</Text>
              <Text style={styles.actionDesc}>Enter with a code</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Or join a live room</Text>
          {subjects.map((s) => (
            <TouchableOpacity
              key={s.id}
              style={styles.subjectCard}
              onPress={() => { setSelectedSubject(s.id); setMode("room"); }}
            >
              <View style={styles.subjectEmoji}>
                <Text style={{ fontSize: 28 }}>{s.emoji}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.subjectName}>{s.name}</Text>
                <Text style={styles.subjectParticipants}>{s.participants} studying now</Text>
              </View>
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>Live</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  // Create Room Screen
  if (mode === "create") {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setMode("select")} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Room</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.sectionTitle}>Select Subject</Text>
          {subjects.map((s) => (
            <TouchableOpacity
              key={s.id}
              style={[styles.subjectCard, selectedSubject === s.id && styles.subjectCardSelected]}
              onPress={() => setSelectedSubject(s.id)}
            >
              <Text style={{ fontSize: 24 }}>{s.emoji}</Text>
              <Text style={[styles.subjectName, { flex: 1 }]}>{s.name}</Text>
              {selectedSubject === s.id && (
                <Ionicons name="checkmark-circle" size={20} color="#1DB954" />
              )}
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[styles.startBtn, loading && { opacity: 0.7 }]}
            onPress={handleCreateRoom}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.startBtnText}>Create Room & Get Code</Text>}
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // Join Room Screen
  if (mode === "join") {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setMode("select")} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Join Room</Text>
        </View>

        <View style={styles.centerContent}>
          <Ionicons name="enter" size={60} color="#a78bfa" style={{ marginBottom: 20 }} />
          <Text style={styles.joinTitle}>Enter Room Code</Text>
          <Text style={styles.joinSubtitle}>Ask your friend for the room code</Text>

          <TextInput
            style={styles.codeInput}
            placeholder="Enter code e.g. ABC123"
            placeholderTextColor="#555"
            value={joinCode}
            onChangeText={(t) => setJoinCode(t.toUpperCase())}
            maxLength={8}
            autoCapitalize="characters"
          />

          <TouchableOpacity
            style={[styles.startBtn, loading && { opacity: 0.7 }]}
            onPress={handleJoinRoom}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.startBtnText}>Join Room</Text>}
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Room Screen
  const subject = subjects.find((s) => s.id === selectedSubject);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMode("select")} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{subject?.name ?? "Study Room"}</Text>
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>Live</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Room Code */}
        {roomCode ? (
          <View style={styles.roomCodeBar}>
            <Ionicons name="key-outline" size={16} color="#1DB954" />
            <Text style={styles.roomCodeText}>Room Code: <Text style={styles.roomCodeValue}>{roomCode}</Text></Text>
            <Text style={styles.roomCodeHint}>Share with friends!</Text>
          </View>
        ) : null}

        {/* Video Grid */}
        <View style={styles.videoGrid}>
          <View style={styles.videoCard}>
            {cameraOn && permission?.granted ? (
              <CameraView style={styles.camera} facing="front" />
            ) : (
              <View style={styles.videoPlaceholder}>
                <Text style={styles.videoInitials}>
                  {auth.currentUser?.displayName?.charAt(0).toUpperCase() || "Y"}
                </Text>
              </View>
            )}
            <Text style={styles.videoName}>You {cameraOn ? "📹" : ""}</Text>
          </View>

          {[
            { name: "Alex J.", initials: "AJ", color: "#3b82f6" },
            { name: "Sara C.", initials: "SC", color: "#a855f7" },
            { name: "Mike B.", initials: "MB", color: "#ec4899" },
          ].map((p, i) => (
            <View key={i} style={styles.videoCard}>
              <View style={[styles.videoPlaceholder, { backgroundColor: p.color + "33" }]}>
                <Text style={styles.videoInitials}>{p.initials}</Text>
              </View>
              <Text style={styles.videoName}>{p.name}</Text>
            </View>
          ))}
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.controlBtn, micOn && styles.controlBtnActive]}
            onPress={() => setMicOn(!micOn)}
          >
            <Ionicons name={micOn ? "mic" : "mic-off"} size={24} color={micOn ? "#1DB954" : "#fff"} />
            <Text style={styles.controlLabel}>{micOn ? "Mute" : "Unmute"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlBtn, cameraOn && styles.controlBtnActive]}
            onPress={handleEnableCamera}
          >
            <Ionicons name={cameraOn ? "videocam" : "videocam-off"} size={24} color={cameraOn ? "#1DB954" : "#fff"} />
            <Text style={styles.controlLabel}>{cameraOn ? "Cam Off" : "Cam On"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.controlBtn, styles.leaveBtn]} onPress={() => router.back()}>
            <Ionicons name="call" size={24} color="#fff" />
            <Text style={styles.controlLabel}>Leave</Text>
          </TouchableOpacity>
        </View>

        {/* Chat */}
        <View style={styles.chatContainer}>
          <View style={styles.chatTabs}>
            <TouchableOpacity
              style={[styles.chatTab, activeTab === "public" && styles.chatTabActive]}
              onPress={() => setActiveTab("public")}
            >
              <Text style={[styles.chatTabText, activeTab === "public" && styles.chatTabTextActive]}>
                🌐 Public Chat
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.chatTab, activeTab === "private" && styles.chatTabActive]}
              onPress={() => setActiveTab("private")}
            >
              <Text style={[styles.chatTabText, activeTab === "private" && styles.chatTabTextActive]}>
                🔒 Private
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.messages}>
            {activeTab === "public" ? messages.map((m) => (
              <View key={m.id} style={styles.messageRow}>
                <View style={styles.messageAvatar}>
                  <Text style={styles.messageAvatarText}>{m.user[0]}</Text>
                </View>
                <View style={styles.messageBubble}>
                  <Text style={styles.messageUser}>{m.user}</Text>
                  <Text style={styles.messageText}>{m.text}</Text>
                </View>
                <Text style={styles.messageTime}>{m.time}</Text>
              </View>
            )) : (
              <Text style={styles.privateHint}>🔒 Private messages are only visible to you and the recipient</Text>
            )}
          </View>

          <View style={styles.chatInputRow}>
            <TextInput
              style={styles.chatInput}
              placeholder={activeTab === "public" ? "Message everyone..." : "Private message..."}
              placeholderTextColor="#555"
              value={chatMsg}
              onChangeText={setChatMsg}
            />
            <TouchableOpacity style={styles.sendBtn}>
              <Ionicons name="send" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
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
  scroll: { padding: 16, paddingBottom: 32 },
  actionRow: { flexDirection: "row", gap: 12, marginBottom: 24 },
  actionCard: {
    flex: 1, backgroundColor: "#0d0d0d", borderRadius: 16, padding: 20,
    alignItems: "center", gap: 8,
    borderWidth: 1, borderColor: "rgba(88,28,235,0.25)",
  },
  actionTitle: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  actionDesc: { color: "#888", fontSize: 12, textAlign: "center" },
  sectionTitle: { color: "#aaa", fontSize: 14, marginBottom: 12 },
  subjectCard: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#0d0d0d", borderRadius: 14, padding: 14,
    marginBottom: 10, gap: 12,
    borderWidth: 1, borderColor: "rgba(88,28,235,0.25)",
  },
  subjectCardSelected: { borderColor: "#1DB954", backgroundColor: "rgba(29,185,84,0.1)" },
  subjectEmoji: {
    width: 52, height: 52, borderRadius: 12,
    backgroundColor: "rgba(88,28,235,0.2)",
    alignItems: "center", justifyContent: "center",
  },
  subjectName: { color: "#fff", fontWeight: "600", fontSize: 15 },
  subjectParticipants: { color: "#888", fontSize: 12, marginTop: 2 },
  liveBadge: {
    flexDirection: "row", alignItems: "center", gap: 5,
    backgroundColor: "rgba(20,83,45,0.5)", paddingHorizontal: 8,
    paddingVertical: 4, borderRadius: 20, borderWidth: 1, borderColor: "rgba(34,197,94,0.3)",
  },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: "#22c55e" },
  liveText: { color: "#4ade80", fontSize: 11, fontWeight: "600" },
  centerContent: { padding: 16, alignItems: "center" },
  joinTitle: { color: "#fff", fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 8 },
  joinSubtitle: { color: "#888", fontSize: 14, textAlign: "center", marginBottom: 24 },
  codeInput: {
    backgroundColor: "#1a1a1a", color: "#fff", borderRadius: 12,
    paddingHorizontal: 20, paddingVertical: 16, fontSize: 24,
    textAlign: "center", letterSpacing: 6, marginBottom: 16,
    borderWidth: 1, borderColor: "rgba(88,28,235,0.3)", width: "100%",
  },
  startBtn: {
    backgroundColor: "#1DB954", borderRadius: 12,
    paddingVertical: 16, alignItems: "center", marginTop: 8, width: "100%",
  },
  startBtnText: { color: "#000", fontWeight: "bold", fontSize: 16 },
  roomCodeBar: {
    flexDirection: "row", alignItems: "center", gap: 8,
    backgroundColor: "rgba(29,185,84,0.1)", borderRadius: 12, padding: 12,
    marginBottom: 16, borderWidth: 1, borderColor: "rgba(29,185,84,0.3)",
    flexWrap: "wrap",
  },
  roomCodeText: { color: "#fff", fontSize: 14 },
  roomCodeValue: { color: "#1DB954", fontWeight: "bold", letterSpacing: 2 },
  roomCodeHint: { color: "#888", fontSize: 12 },
  videoGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 16 },
  videoCard: { width: "47%", alignItems: "center" },
  camera: { width: "100%", height: 120, borderRadius: 12 },
  videoPlaceholder: {
    width: "100%", height: 120, borderRadius: 12,
    backgroundColor: "rgba(88,28,235,0.2)",
    alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: "rgba(88,28,235,0.3)",
  },
  videoInitials: { color: "#fff", fontSize: 28, fontWeight: "bold" },
  videoName: { color: "#ccc", fontSize: 12, marginTop: 4 },
  controls: { flexDirection: "row", justifyContent: "center", gap: 20, marginBottom: 20 },
  controlBtn: {
    alignItems: "center", backgroundColor: "#1a1a1a",
    borderRadius: 16, padding: 16, gap: 6, width: 90,
    borderWidth: 1, borderColor: "rgba(88,28,235,0.3)",
  },
  controlBtnActive: { borderColor: "#1DB954", backgroundColor: "rgba(29,185,84,0.1)" },
  leaveBtn: { backgroundColor: "#dc2626", borderColor: "#dc2626" },
  controlLabel: { color: "#fff", fontSize: 11 },
  chatContainer: {
    backgroundColor: "#0d0d0d", borderRadius: 16,
    borderWidth: 1, borderColor: "rgba(88,28,235,0.25)", overflow: "hidden",
  },
  chatTabs: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "rgba(88,28,235,0.25)" },
  chatTab: { flex: 1, paddingVertical: 12, alignItems: "center" },
  chatTabActive: { borderBottomWidth: 2, borderBottomColor: "#1DB954" },
  chatTabText: { color: "#888", fontWeight: "500" },
  chatTabTextActive: { color: "#1DB954" },
  messages: { padding: 12, gap: 12 },
  messageRow: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  messageAvatar: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: "#7c3aed", alignItems: "center", justifyContent: "center",
  },
  messageAvatarText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  messageBubble: { flex: 1, backgroundColor: "#1a1a1a", borderRadius: 10, padding: 8 },
  messageUser: { color: "#1DB954", fontSize: 11, fontWeight: "600", marginBottom: 2 },
  messageText: { color: "#fff", fontSize: 13 },
  messageTime: { color: "#555", fontSize: 10, marginTop: 4 },
  privateHint: { color: "#555", fontSize: 13, textAlign: "center", padding: 16 },
  chatInputRow: {
    flexDirection: "row", padding: 12, gap: 8,
    borderTopWidth: 1, borderTopColor: "rgba(88,28,235,0.25)",
  },
  chatInput: {
    flex: 1, backgroundColor: "#1a1a1a", color: "#fff",
    borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10,
    borderWidth: 1, borderColor: "rgba(88,28,235,0.3)", fontSize: 14,
  },
  sendBtn: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: "#1DB954", alignItems: "center", justifyContent: "center",
  },
});
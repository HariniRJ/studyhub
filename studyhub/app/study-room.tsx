import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

const subjects = [
  { id: 1, name: "Data Structures", emoji: "💻", participants: 12 },
  { id: 2, name: "Operating Systems", emoji: "⚙️", participants: 8 },
  { id: 3, name: "Mathematics", emoji: "📐", participants: 15 },
  { id: 4, name: "Computer Networks", emoji: "🌐", participants: 6 },
  { id: 5, name: "Database Management", emoji: "🗄️", participants: 10 },
  { id: 6, name: "Software Engineering", emoji: "🛠️", participants: 9 },
];

const initialMessages = [
  {
    id: 1,
    user: "Alex",
    text: "Hey everyone! Let's focus on trees today 🌳",
    time: "10:02",
  },
  {
    id: 2,
    user: "Sara",
    text: "Sure! I have some doubts on AVL trees",
    time: "10:03",
  },
  {
    id: 3,
    user: "Mike",
    text: "Same here, let's go through it together",
    time: "10:04",
  },
];

export default function StudyRoom() {
  const router = useRouter();

  const [permission, requestPermission] = useCameraPermissions();

  const [selectedSubject, setSelectedSubject] =
    useState<number | null>(null);

  const [mode, setMode] = useState<
    "select" | "create" | "join" | "room"
  >("select");

  const [joinCode, setJoinCode] = useState("");

  const [roomCode] = useState(
    Math.random().toString(36).substring(2, 8).toUpperCase()
  );

  const [cameraOn, setCameraOn] = useState(false);

  const [chatMsg, setChatMsg] = useState("");

  const [activeTab, setActiveTab] = useState<
    "public" | "private"
  >("public");

  const [chatMessages, setChatMessages] =
    useState(initialMessages);

  const [selectedPrivateUser, setSelectedPrivateUser] =
    useState("Alex");

  const [isRecording, setIsRecording] = useState(false);

  const handleJoinRoom = () => {
    if (joinCode.length < 4) {
      Alert.alert(
        "Invalid Code",
        "Please enter a valid room code"
      );
      return;
    }

    setMode("room");
  };

  const handleEnableCamera = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();

      if (result.granted) {
        setCameraOn(true);
      }
    } else {
      setCameraOn(!cameraOn);
    }
  };

  const sendMessage = () => {
    if (!chatMsg.trim()) return;

    const newMessage = {
      id: Date.now(),
      user: "You",
      text:
        activeTab === "private"
          ? `(Private to ${selectedPrivateUser}) ${chatMsg}`
          : chatMsg,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChatMessages((prev) => [...prev, newMessage]);

    setChatMsg("");
  };

  const handleRecord = async () => {
    try {
      if (!isRecording) {
        const { granted } =
          await Audio.requestPermissionsAsync();

        if (!granted) {
          Alert.alert("Permission needed");
          return;
        }

        setIsRecording(true);
      } else {
        setIsRecording(false);

        const newMessage = {
          id: Date.now(),
          user: "You",
          text:
            activeTab === "private"
              ? `🎤 Voice message to ${selectedPrivateUser}`
              : "🎤 Voice message",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setChatMessages((prev) => [...prev, newMessage]);
      }
    } catch (err) {
      Alert.alert("Recording failed");
    }
  };

  // SELECT SCREEN
  if (mode === "select") {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Study Rooms
          </Text>
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => setMode("create")}
            >
              <Ionicons
                name="add-circle"
                size={32}
                color="#1DB954"
              />

              <Text style={styles.actionTitle}>
                Create Room
              </Text>

              <Text style={styles.actionDesc}>
                Start a new study session
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => setMode("join")}
            >
              <Ionicons
                name="enter"
                size={32}
                color="#a78bfa"
              />

              <Text style={styles.actionTitle}>
                Join Room
              </Text>

              <Text style={styles.actionDesc}>
                Enter with a room code
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>
            Or join a live room
          </Text>

          {subjects.map((s) => (
            <TouchableOpacity
              key={s.id}
              style={styles.subjectCard}
              onPress={() => {
                setSelectedSubject(s.id);
                setMode("room");
              }}
            >
              <View style={styles.subjectEmoji}>
                <Text style={{ fontSize: 28 }}>
                  {s.emoji}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.subjectName}>
                  {s.name}
                </Text>

                <Text
                  style={styles.subjectParticipants}
                >
                  {s.participants} studying now
                </Text>
              </View>

              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />

                <Text style={styles.liveText}>
                  Live
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  // ROOM SCREEN
  const subject = subjects.find(
    (s) => s.id === selectedSubject
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setMode("select")}
          style={styles.backBtn}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="#fff"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {subject?.name ?? "Study Room"}
        </Text>

        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />

          <Text style={styles.liveText}>
            Live
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* VIDEO GRID */}
        <View style={styles.videoGrid}>
          <View style={styles.videoCard}>
            {cameraOn && permission?.granted ? (
              <CameraView
                style={styles.camera}
                facing="front"
              />
            ) : (
              <View style={styles.videoPlaceholder}>
                <Text style={styles.videoInitials}>
                  YOU
                </Text>
              </View>
            )}

            <Text style={styles.videoName}>
              You {cameraOn ? "📹" : "🚫"}
            </Text>
          </View>

          {[
            {
              name: "Alex J.",
              initials: "AJ",
              color: "#3b82f6",
            },
            {
              name: "Sara C.",
              initials: "SC",
              color: "#a855f7",
            },
            {
              name: "Mike B.",
              initials: "MB",
              color: "#ec4899",
            },
          ].map((p, i) => (
            <View key={i} style={styles.videoCard}>
              <View
                style={[
                  styles.videoPlaceholder,
                  {
                    backgroundColor:
                      p.color + "33",
                  },
                ]}
              >
                <Text style={styles.videoInitials}>
                  {p.initials}
                </Text>
              </View>

              <Text style={styles.videoName}>
                {p.name}
              </Text>
            </View>
          ))}
        </View>

        {/* CONTROLS */}
        <View style={styles.controls}>
          <TouchableOpacity
            style={[
              styles.controlBtn,
              cameraOn &&
                styles.controlBtnActive,
            ]}
            onPress={handleEnableCamera}
          >
            <Ionicons
              name={
                cameraOn
                  ? "videocam"
                  : "videocam-off"
              }
              size={24}
              color={
                cameraOn ? "#1DB954" : "#fff"
              }
            />

            <Text style={styles.controlLabel}>
              {cameraOn
                ? "Cam Off"
                : "Cam On"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.controlBtn,
              styles.leaveBtn,
            ]}
            onPress={() => router.back()}
          >
            <Ionicons
              name="call"
              size={24}
              color="#fff"
            />

            <Text style={styles.controlLabel}>
              Leave
            </Text>
          </TouchableOpacity>
        </View>

        {/* CHAT */}
        <View style={styles.chatContainer}>
          <View style={styles.chatTabs}>
            <TouchableOpacity
              style={[
                styles.chatTab,
                activeTab === "public" &&
                  styles.chatTabActive,
              ]}
              onPress={() =>
                setActiveTab("public")
              }
            >
              <Text
                style={[
                  styles.chatTabText,
                  activeTab === "public" &&
                    styles.chatTabTextActive,
                ]}
              >
                🌐 Public Chat
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.chatTab,
                activeTab === "private" &&
                  styles.chatTabActive,
              ]}
              onPress={() =>
                setActiveTab("private")
              }
            >
              <Text
                style={[
                  styles.chatTabText,
                  activeTab === "private" &&
                    styles.chatTabTextActive,
                ]}
              >
                🔒 Private
              </Text>
            </TouchableOpacity>
          </View>

          {/* PRIVATE USER SELECT */}
          {activeTab === "private" && (
            <View style={styles.privateSelector}>
              <Text style={styles.privateTitle}>
                Select Person
              </Text>

              <View style={styles.privateUsers}>
                {["Alex", "Sara", "Mike"].map(
                  (user) => (
                    <TouchableOpacity
                      key={user}
                      onPress={() =>
                        setSelectedPrivateUser(
                          user
                        )
                      }
                      style={[
                        styles.privateUserBtn,
                        selectedPrivateUser ===
                          user &&
                          styles.privateUserBtnActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.privateUserText,
                          selectedPrivateUser ===
                            user &&
                            styles.privateUserTextActive,
                        ]}
                      >
                        {user}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            </View>
          )}

          {/* MESSAGES */}
          <View style={styles.messages}>
            {chatMessages.map((m: any) => (
              <View
                key={m.id}
                style={styles.messageRow}
              >
                <View
                  style={styles.messageAvatar}
                >
                  <Text
                    style={
                      styles.messageAvatarText
                    }
                  >
                    {m.user[0]}
                  </Text>
                </View>

                <View
                  style={styles.messageBubble}
                >
                  <Text
                    style={styles.messageUser}
                  >
                    {m.user}
                  </Text>

                  <Text
                    style={styles.messageText}
                  >
                    {m.text}
                  </Text>
                </View>

                <Text
                  style={styles.messageTime}
                >
                  {m.time}
                </Text>
              </View>
            ))}
          </View>

          {/* INPUT */}
          <View style={styles.chatInputRow}>
            <TextInput
              style={styles.chatInput}
              placeholder={
                activeTab === "public"
                  ? "Message everyone..."
                  : `Message ${selectedPrivateUser}...`
              }
              placeholderTextColor="#555"
              value={chatMsg}
              onChangeText={setChatMsg}
            />

            <TouchableOpacity
              style={[
                styles.sendBtn,
                {
                  backgroundColor:
                    isRecording
                      ? "#ff4444"
                      : "#333",
                },
              ]}
              onPress={handleRecord}
            >
              <Ionicons
                name={
                  isRecording
                    ? "stop"
                    : "mic"
                }
                size={18}
                color="#fff"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sendBtn}
              onPress={sendMessage}
            >
              <Ionicons
                name="send"
                size={18}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor:
      "rgba(88,28,235,0.3)",
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 16,
    gap: 12,
  },

  backBtn: {
    padding: 4,
  },

  headerTitle: {
    flex: 1,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  scroll: {
    padding: 16,
    paddingBottom: 32,
  },

  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },

  actionCard: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    gap: 8,
  },

  actionTitle: {
    color: "#fff",
    fontWeight: "bold",
  },

  actionDesc: {
    color: "#888",
    fontSize: 12,
    textAlign: "center",
  },

  sectionTitle: {
    color: "#aaa",
    marginBottom: 12,
  },

  subjectCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0d0d0d",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    gap: 12,
  },

  subjectEmoji: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor:
      "rgba(88,28,235,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },

  subjectName: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
    flex: 1,
  },

  subjectParticipants: {
    color: "#888",
    fontSize: 12,
    marginTop: 2,
  },

  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor:
      "rgba(20,83,45,0.5)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },

  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#22c55e",
  },

  liveText: {
    color: "#4ade80",
    fontSize: 11,
    fontWeight: "600",
  },

  videoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
  },

  videoCard: {
    width: "47%",
    alignItems: "center",
  },

  camera: {
    width: "100%",
    height: 120,
    borderRadius: 12,
  },

  videoPlaceholder: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    backgroundColor:
      "rgba(88,28,235,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },

  videoInitials: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

  videoName: {
    color: "#ccc",
    fontSize: 12,
    marginTop: 4,
  },

  controls: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },

  controlBtn: {
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 14,
    gap: 4,
    minWidth: 72,
  },

  controlBtnActive: {
    borderColor: "#1DB954",
    backgroundColor:
      "rgba(29,185,84,0.1)",
  },

  leaveBtn: {
    backgroundColor: "#dc2626",
  },

  controlLabel: {
    color: "#fff",
    fontSize: 11,
  },

  chatContainer: {
    backgroundColor: "#0d0d0d",
    borderRadius: 16,
    overflow: "hidden",
  },

  chatTabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor:
      "rgba(88,28,235,0.25)",
  },

  chatTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },

  chatTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: "#1DB954",
  },

  chatTabText: {
    color: "#888",
  },

  chatTabTextActive: {
    color: "#1DB954",
  },

  privateSelector: {
    padding: 12,
  },

  privateTitle: {
    color: "#aaa",
    marginBottom: 10,
  },

  privateUsers: {
    flexDirection: "row",
    gap: 8,
  },

  privateUserBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#1a1a1a",
  },

  privateUserBtnActive: {
    backgroundColor: "#1DB954",
  },

  privateUserText: {
    color: "#fff",
  },

  privateUserTextActive: {
    color: "#000",
    fontWeight: "bold",
  },

  messages: {
    padding: 12,
    gap: 12,
  },

  messageRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },

  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#7c3aed",
    alignItems: "center",
    justifyContent: "center",
  },

  messageAvatarText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  messageBubble: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    padding: 8,
  },

  messageUser: {
    color: "#1DB954",
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 2,
  },

  messageText: {
    color: "#fff",
    fontSize: 13,
  },

  messageTime: {
    color: "#555",
    fontSize: 10,
    marginTop: 4,
  },

  chatInputRow: {
    flexDirection: "row",
    padding: 12,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor:
      "rgba(88,28,235,0.25)",
  },

  chatInput: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    color: "#fff",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
  },

  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#1DB954",
    alignItems: "center",
    justifyContent: "center",
  },
});
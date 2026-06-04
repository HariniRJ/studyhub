import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const subjects = [
  {
    id: 1, name: "Database Management", emoji: "🗄️", color: "#22c55e",
    units: [
      {
        unit: "Unit 1",
        notes: "https://ucee054939a54aebad18e04d1bdc.dl.dropboxusercontent.com/cd/0/inline2/DBuAnlAD0DZyZZaGbm-6ntHLsWbBi3I3ZNDh7hYOljj3g_JybeOei4SHz23EoYIqH2RZ19xD8fkFLWwFv-wTE6-PksJqxwZUFfQ1xeLpBg5IH7yt9Dk_g0Gi2NpLw3k0RoHepXllXELoG3nnMPdJZeJUKbvWjHh9421EUrwqREcOrEsuk5PBLJwYTdPj-CNwOAf0HugMvtTONBPQK9cVCKtOpC_F4I-MtqLsTdLCMeP6Oa8VROQRNDSyp16l8VC3ERQ-ZUBcKT2RiacshIFHtan8Q0oYz-jIo9E_iKfPxHX_glflG9utWq7R25G4R7rQNfVXP5OmY57JMMT80fFfaYqzN9-gZi6uk2-WAOXg6PMvL19cep4q3NuZvL0bRCiRF8/file",
        youtube: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y",
      },
      {
        unit: "Unit 2",
        notes: "https://uc4362ce7bd32c5c5e10966637fb.dl.dropboxusercontent.com/cd/0/inline2/DBs-Og_Vb72T-O7TDTY2whAwtR70wXIEo7o7CF84t8WHITDR52bTUdyIIYQarSlMTIMpIXP8Ej0v7Y8x-WMmGeHyRiNsjLMk6MuK698bKrx-qXCrJku_c01W78Vid-F16F3duTOtBkUbIMczY_qRaCZdudGB9FZhMe3fUj4lZ6P7fhlp41KwVbCByB-QCRmSlbhgZNPFeinPylGcjIFjHKVp3rXNbyQ_AI02_Mej3T_Iyd-hhYJ4z0Q0El6vWeJ14-f_30Ex3vtC13JK6fn6ivWrjdpj8s4Dr5khRqjdLM2TcDsEZAvsp_RDp_KVKnk2cheF3SM4EHhpWTw85yYumA2x9JbJRABKxitqJnb-pMC6UF6I4XklXegFggoVEnnGGtM/file",
        youtube: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRiyryTrbKHX1Sh9luYI0dhX",
      },
      {
        unit: "Unit 3",
        notes: "https://uc6d2f7b81bd4b15f8640b34c820.dl.dropboxusercontent.com/cd/0/inline2/DBvlklZr8Syiib3O_E8gRPpfyOlxBO850ZPjTcOTGK7vzcEob07q8KK3_tJh7ozSnkbqSBvcctO9ZzHKtU_XsChWb3JWt4NpSqrahXp5Mn5u76XNvQmhp_jklJfHbHb9hE6b8T05Knfs2kXWDMU11n55mQhWZ8oEfY9ZR-flrQAZvfMYCOU8pUMYQNVs8U7SAbONRljo-RZd7_MDsQjybmztlJAvg8eH4fS5qZM8LRwpPVIYl4m8RBfRFwhf1Y0SWe30R2ezzvTytpnMvjmyAObjL_zdK-aXAcZOC3QhiNyhGaaam1KUNK4bqGzjmvbbTFbuHQKkWmOsWJncTO1CBTMEJv2eE2spDM2XEocVet5V5FvsKSeVmk7zBs52QNTQrKk/file",
        youtube: "https://www.youtube.com/playlist?list=PLdo5W4Nhv31b33kF46f9aFjoJPOkdlsRc",
      },
    ],
  },
  {
    id: 2, name: "Operating Systems", emoji: "⚙️", color: "#a855f7",
    units: [
      {
        unit: "Unit 1",
        notes: "https://uc16f7c4a2b4e98a600cb4e0cc56.dl.dropboxusercontent.com/cd/0/inline2/DBshxe_M17qRuYJRSzfe2-kx2YXBquI3MENYZJ-BbuSbNdMuDTfRo1VigRhBukyCcGUQkb3xNuuo_EiPGEnYknkqMzvriBYSWKfKQXV27XJsxcbkuCKGlp-mNpCfWJtjLgiVVQ-Zj_-A2yxPgG6V0O6--gvvg5_81FywXj20tucDu-1fLU7Tdc2pgtF7KlFhUYRailb80K7jm2LbB7Q_1iAPOXX4625beUcyI-nNK6mdEW5zXdSnQQtdZEVZ5a5Ss-RLPspy-6tH6gm2gaf-9hMqhp3AODcKz-lLKlOn9cFPS66KmA9ddVZCfhn5y44PsoIPyJZ69kn2cTdWLU6w8rY9P8SMfVVgnxe62XnA2eJ5m_gYiBIIQy05o4BjHJzh1v4/file",
        youtube: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i",
      },
      {
        unit: "Unit 2",
        notes: "https://uc858355b10d2777fc5ed198f414.dl.dropboxusercontent.com/cd/0/inline2/DBv7I9S4qCPqT0IUvFWMeihwLNXysUmtM1pkEdXPXFYmORrBXuHaKV2uOrb5JqqWFocuQV_okEwvW55_34AVDE1oEY-tkW6HxeHiLeEYXaeYQJGLq84roWzS7PIJDEFqLlOUqow-lN2U28UVMmrebBUOtsIm40aIRj9u_7pV_nfVAST9obdvFhBrS_1LNd-0-4MF2vKXbWDPUqugJKIqp8naXAc7naDKzFk6qhTLE8NusGirjqHzE2EG9h5cgk4CUOp7I3cVOIyhcQmSdF2YmGB3tKwVk_XTIjfx5J798KU-H60QTFUs9IV5GuKqrYaPa1foiuV59I30LTdDq0eygTQT7L1UMyaLo61kAOAxCoNDSMMzE6tdp-qgXOblCg3mf20/file",
        youtube: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRiVhbXDGLXDk_OQAeuVcp2O",
      },
      {
        unit: "Unit 3",
        notes: "https://uce6176c2423643bcc936a213906.dl.dropboxusercontent.com/cd/0/inline2/DButk1ondFzsgfyn8rmGhzo11wdHT3oHFa7kdbiZqRKRENdh4hOjevFQy2zqOpp_0PQqcpuxzr9qS14Fd3soeBFL06jHMfDCGITPII7W9cmI-wxcvxPYPqGdVEMvix_3eiyJWGjymLcrY5fXHjGd2AAAe5WXoDSdKgPxmEcqhOu37LUiQZ4c8m6heoMqQycxnBXoFZJHMMsHGQDy4ux-EucBU9wVZYKOcGA4GgwfWEIe6n6HxEtlWv6TExRsyGMXWWzo6SCkITpcQUxEV8zcr-Is0tjM-WZxfIG8nIM8Bk53nd3ZbEWLrF02vRRy3HgPRSLbWkUVFhy99suBDWv1pXx2WGGx819ZA9HQeWl_oyZXW_J_HaJNg9vWQYLnFrLbSuQ/file",
        youtube: "https://www.youtube.com/playlist?list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV",
      },
    ],
  },
  {
    id: 3, name: "Analysis & Design of Algorithms", emoji: "📊", color: "#3b82f6",
    units: [
      {
        unit: "Unit 1",
        notes: "https://uc3ff0eb336a808a358d4423697e.dl.dropboxusercontent.com/cd/0/inline2/DBte00iVk7EyjWFw5U79MpL-Kpl9wJpx_mRI6KERsokpks09aOhxcw0089kwsYBTFx-uxjxJuLSPoCJtxaS9hveMYKfUvF5bHHqY0sTfG3_An6-mzOLBFci1RD7sUVr18_yL0nyteRaeOY24HnlYsBtjjhnFIoPdA6Bke4bDthyp25ck2mPrnkYNoJ9JA2yQEkVUcO5OZ8EiqaW2uGy1EPwrsbqj8gBZ1SafERfhripDP_Us4ZSXyP2yCbVfrcRmvV1X7ziXIOY1e6zrkzfpEkqmiZQu0Hn4nV0dlGvUyINh3oTxoSSH6M80ye6vanr5aY6gX1kt0cAF2e6xEGXGmnkRdv3OCu5IrV02rJM6AoCuqAp3Dv3wJeK2Npl3NqksBtw/file",
        youtube: "https://www.youtube.com/playlist?list=PLfqMhTWNBTe0b2nM6JHVCnAkhQRGiZMSJ",
      },
      {
        unit: "Unit 2",
        notes: "https://uc280919944306bd6a4541640acb.dl.dropboxusercontent.com/cd/0/inline2/DBsgVNEbBocmI8X5d2x9B2QMKJLlXk8jxZSgqsiYQJV5n9XWpMTPfOcDT3q0Glonz2tyy4wpwhhggHzmEuglMVxBXfk7r6Bpg_VmfQNkXJT0pX_b0clxpoybSe8ZTad4Y0QerfmPfqE5eIZMvEdjb2a5_gaaj03m-ZXJmZ9ZdaD9bq1wtZTIGr48CaoUbRA7v5x5BtuVCBG4FaKNhsMjAiozW7Lgzmw84dkO7WMAONHAr93zjCjPj10dd0c-U3DrcBVpzrd5yGlz6dHfLTt9OCYXCDMkGRuOZ6XRMc4Y701Eobs33x5wM5lrGE1YTh6CQsXKTqpAa16vQmtpZBI56oDCe5mxsHeRD-bL1AZUYd1zcTA5HVfKc1cH6p4jmIfqTmo/file",
        youtube: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiEwaANNt3O2Jf3g3Xf4QxZr",
      },
      {
        unit: "Unit 3",
        notes: "https://ucb96b2aca85b130172c9d1780cb.dl.dropboxusercontent.com/cd/0/inline2/DBuDWPtgPoss-7rJ0nhg9AaqQFJXdpI1M4Yg4EDau0Uc9bb9TBiiHJEcWsviOJs8_jzsSeOe4VL59w_hUALMwMAufeDOUPsESAM5ROt_fSDB559nP_kExhyHgjnktCb6QVbavAM6qyjIMNNaM71ByKHEb1DhO36UL-imHUVp0OUC8WNlscWdscbirxdxSPJLPjZOpQPfTy5zFE6UGtnmXFTLeAjYS0430h1V_ngAtT10m-HTQrsqK4M2Opc5j2RtrJ5hRmYOaM6hlEOnMGUyvdcxKKMMW-q_meeAj9b7fdQXegHKM51rPgzKJTv7dvMHVnDyFC9qhA_ERINkGg2ZiJOsI5e1oGdA3i-W2p7QIQdhLsvgYVcXdXdGZ1cWrQJ5Ep4/file",
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
          <Ionicons name="search-outline" size={18} color="#555" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for notes, videos..."
            placeholderTextColor="#555"
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
  subjectCard: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#0d0d0d", borderRadius: 14, padding: 14,
    marginBottom: 10, gap: 12,
    borderWidth: 1, borderColor: "rgba(88,28,235,0.25)",
  },
  subjectEmoji: { width: 52, height: 52, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  subjectName: { color: "#fff", fontWeight: "600", fontSize: 14 },
  subjectItems: { color: "#888", fontSize: 12, marginTop: 2 },
  unitsContainer: { marginBottom: 10, marginTop: -6 },
  unitCard: {
    backgroundColor: "#111", borderRadius: 12, padding: 14,
    marginBottom: 6, borderWidth: 1, borderColor: "rgba(88,28,235,0.2)",
  },
  unitTitle: { color: "#a78bfa", fontWeight: "600", fontSize: 14, marginBottom: 10 },
  btnRow: { flexDirection: "row", gap: 10 },
  notesBtn: {
    flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center",
    backgroundColor: "#3b82f6", borderRadius: 8, padding: 10, gap: 6,
  },
  youtubeBtn: {
    flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center",
    backgroundColor: "#ef4444", borderRadius: 8, padding: 10, gap: 6,
  },
  btnText: { color: "#fff", fontWeight: "600", fontSize: 13 },
});
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { router } from "expo-router";
import ClickableObject from "../../components/ClickableObject";
import { useGameStore } from "../../store/useGamingStore";

const GESTURE_HINTS = [
    { icon: "👆", label: "Tap: +1 point" },
    { icon: "✌️", label: "Double-tap: +2 points" },
    { icon: "⏳", label: "Long-press (3s): +5 points" },
    { icon: "↔️", label: "Swipe: +1-10 random points" },
    { icon: "🔍", label: "Pinch: +3 points" },
    { icon: "✋", label: "Drag: move the object" },
];

export default function HomeScreen() {
    const { score, isDark } = useGameStore();

    const c = isDark ? dark : light;

    return (
        <View style={[styles.container, { backgroundColor: c.bg }]}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: c.text }]}>
                    ≡ Gesture Clicker
                </Text>
                <TouchableOpacity>
                    <Text style={[styles.headerIcon, { color: c.text }]}>🔍</Text>
                </TouchableOpacity>
            </View>

            {/* Score */}
            <View style={styles.scoreSection}>
                <Text style={[styles.scoreLabel, { color: c.subtext }]}>SCORE</Text>
                <Text style={[styles.scoreValue, { color: c.accent }]}>{score}</Text>
            </View>

            {/* Clickable object in center */}
            <View style={styles.objectArea}>
                <ClickableObject />
            </View>

            {/* Gesture hints */}
            <ScrollView
                style={styles.hintsScroll}
                contentContainerStyle={styles.hintsContainer}
            >
                {GESTURE_HINTS.map((hint) => (
                    <View
                        key={hint.label}
                        style={[styles.hintRow, { backgroundColor: c.card }]}
                    >
                        <Text style={styles.hintIcon}>{hint.icon}</Text>
                        <Text style={[styles.hintText, { color: c.text }]}>
                            {hint.label}
                        </Text>
                    </View>
                ))}
            </ScrollView>

            {/* Bottom nav */}
            <View style={[styles.bottomNav, { backgroundColor: c.card, borderTopColor: c.border }]}>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => router.push("/screens/HomeScreen")}
                >
                    <Text style={styles.navIcon}>▶</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => router.push("/screens/TasksScreen")}
                >
                    <Text style={styles.navIcon}>☰</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => router.push("/screens/SettingsScreen")}
                >
                    <Text style={styles.navIcon}>⚙</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 56,
        paddingBottom: 10,
    },
    headerTitle: { fontSize: 20, fontWeight: "700" },
    headerIcon: { fontSize: 20 },
    scoreSection: {
        alignItems: "center",
        marginVertical: 8,
    },
    scoreLabel: { fontSize: 12, letterSpacing: 2, fontWeight: "600" },
    scoreValue: { fontSize: 56, fontWeight: "800" },
    objectArea: {
        alignItems: "center",
        justifyContent: "center",
        height: 180,
    },
    hintsScroll: { flex: 1, paddingHorizontal: 20 },
    hintsContainer: { paddingBottom: 8 },
    hintRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 10,
        marginBottom: 6,
    },
    hintIcon: { fontSize: 18, marginRight: 10 },
    hintText: { fontSize: 14, fontWeight: "500" },
    bottomNav: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 14,
        borderTopWidth: 1,
    },
    navItem: { alignItems: "center", paddingHorizontal: 24 },
    navIcon: { fontSize: 22, color: "#6c63ff" },
});

const dark = {
    bg: "#12121f",
    card: "#1e1e2e",
    text: "#ffffff",
    subtext: "#888",
    accent: "#6c63ff",
    border: "#2a2a3e",
};
const light = {
    bg: "#f5f5fa",
    card: "#ffffff",
    text: "#1a1a2e",
    subtext: "#888",
    accent: "#4f46e5",
    border: "#e0e0e0",
};
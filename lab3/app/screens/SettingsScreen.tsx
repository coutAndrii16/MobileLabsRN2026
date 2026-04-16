import React from "react";
import {
    View,
    Text,
    Switch,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { useGameStore } from "../../store/useGamingStore";

export default function SettingsScreen() {
    const {
        isDark,
        toggleTheme,
        score,
        taps,
        doubleTaps,
        longPressDone,
        panDone,
        swipeRightDone,
        swipeLeftDone,
        pinchDone,
    } = useGameStore();

    const c = isDark ? dark : light;

    const completedTasks = [
        taps >= 10,
        doubleTaps >= 5,
        longPressDone,
        panDone,
        swipeRightDone,
        swipeLeftDone,
        pinchDone,
        score >= 100,
        score >= 50,
    ].filter(Boolean).length;

    return (
        <View style={[styles.container, { backgroundColor: c.bg }]}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: c.text }]}>⚙ Settings</Text>
            </View>

            {/* Theme toggle */}
            <View style={[styles.section, { backgroundColor: c.card }]}>
                <Text style={[styles.sectionTitle, { color: c.subtext }]}>
                    APPEARANCE
                </Text>
                <View style={styles.row}>
                    <Text style={[styles.rowLabel, { color: c.text }]}>
                        {isDark ? "🌙  Dark Mode" : "☀️  Light Mode"}
                    </Text>
                    <Switch
                        value={isDark}
                        onValueChange={toggleTheme}
                        trackColor={{ false: "#e0e0e0", true: "#6c63ff" }}
                        thumbColor={isDark ? "#fff" : "#f4f4f4"}
                    />
                </View>
            </View>

            {/* Stats */}
            <View style={[styles.section, { backgroundColor: c.card }]}>
                <Text style={[styles.sectionTitle, { color: c.subtext }]}>STATS</Text>

                {[
                    { label: "Total Score", value: score },
                    { label: "Taps", value: taps },
                    { label: "Double Taps", value: doubleTaps },
                    { label: "Tasks Completed", value: `${completedTasks}/9` },
                ].map((stat) => (
                    <View
                        key={stat.label}
                        style={[styles.statRow, { borderBottomColor: c.border }]}
                    >
                        <Text style={[styles.statLabel, { color: c.subtext }]}>
                            {stat.label}
                        </Text>
                        <Text style={[styles.statValue, { color: c.accent }]}>
                            {stat.value}
                        </Text>
                    </View>
                ))}
            </View>

            {/* Bottom nav */}
            <View
                style={[
                    styles.bottomNav,
                    { backgroundColor: c.card, borderTopColor: c.border },
                ]}
            >
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
                <TouchableOpacity style={styles.navItem}>
                    <Text style={[styles.navIcon, { color: c.accent }]}>⚙</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        paddingHorizontal: 20,
        paddingTop: 56,
        paddingBottom: 16,
    },
    headerTitle: { fontSize: 22, fontWeight: "700" },
    section: {
        marginHorizontal: 20,
        borderRadius: 14,
        padding: 16,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 1.5,
        marginBottom: 12,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    rowLabel: { fontSize: 16, fontWeight: "500" },
    statRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    statLabel: { fontSize: 14 },
    statValue: { fontSize: 14, fontWeight: "700" },
    bottomNav: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
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
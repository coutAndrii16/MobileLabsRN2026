import React from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { useGameStore } from "../../store/useGamingStore";

export default function TasksScreen() {
    const {
        score,
        taps,
        doubleTaps,
        longPressDone,
        panDone,
        swipeRightDone,
        swipeLeftDone,
        pinchDone,
        isDark,
    } = useGameStore();

    const c = isDark ? dark : light;

    const tasks = [
        {
            id: 1,
            icon: "👆",
            title: "Tap 10 times",
            desc: "Tap on the clicker object 10 times",
            done: taps >= 10,
            progress: Math.min(taps, 10),
            total: 10,
        },
        {
            id: 2,
            icon: "✌️",
            title: "Double-tap 5 times",
            desc: "Double-tap on the clicker 5 times",
            done: doubleTaps >= 5,
            progress: Math.min(doubleTaps, 5),
            total: 5,
        },
        {
            id: 3,
            icon: "⏳",
            title: "Long press 3 seconds",
            desc: "Hold the clicker for 3 seconds",
            done: longPressDone,
            progress: longPressDone ? 1 : 0,
            total: 1,
        },
        {
            id: 4,
            icon: "✋",
            title: "Drag the object",
            desc: "Drag the clicker around the screen",
            done: panDone,
            progress: panDone ? 1 : 0,
            total: 1,
        },
        {
            id: 5,
            icon: "👉",
            title: "Swipe right",
            desc: "Perform a quick swipe right gesture",
            done: swipeRightDone,
            progress: swipeRightDone ? 1 : 0,
            total: 1,
        },
        {
            id: 6,
            icon: "👈",
            title: "Swipe left",
            desc: "Perform a quick swipe left gesture",
            done: swipeLeftDone,
            progress: swipeLeftDone ? 1 : 0,
            total: 1,
        },
        {
            id: 7,
            icon: "🔍",
            title: "Pinch to resize",
            desc: "Use pinch gesture to resize the clicker",
            done: pinchDone,
            progress: pinchDone ? 1 : 0,
            total: 1,
        },
        {
            id: 8,
            icon: "💯",
            title: "Reach 100 points",
            desc: "Accumulate 100 points total",
            done: score >= 100,
            progress: Math.min(score, 100),
            total: 100,
        },
        {
            id: 9,
            icon: "⭐",
            title: "Reach 50 points",
            desc: "Custom challenge: get 50 points",
            done: score >= 50,
            progress: Math.min(score, 50),
            total: 50,
        },
    ];

    const completedCount = tasks.filter((t) => t.done).length;

    return (
        <View style={[styles.container, { backgroundColor: c.bg }]}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: c.text }]}>
                    ≡ Challenges
                </Text>
                <TouchableOpacity>
                    <Text style={[styles.headerIcon, { color: c.text }]}>🔍</Text>
                </TouchableOpacity>
            </View>

            {/* Progress summary */}
            <View style={[styles.summary, { backgroundColor: c.card }]}>
                <Text style={[styles.summaryText, { color: c.subtext }]}>
                    Completed
                </Text>
                <Text style={[styles.summaryCount, { color: c.accent }]}>
                    {completedCount}/{tasks.length}
                </Text>
                <View style={[styles.progressTrack, { backgroundColor: c.border }]}>
                    <View
                        style={[
                            styles.progressFill,
                            {
                                backgroundColor: c.accent,
                                width: `${(completedCount / tasks.length) * 100}%`,
                            },
                        ]}
                    />
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.list}>
                {tasks.map((task) => (
                    <View
                        key={task.id}
                        style={[styles.taskCard, { backgroundColor: c.card }]}
                    >
                        <View style={styles.taskLeft}>
                            <Text style={styles.taskIcon}>{task.icon}</Text>
                            <View style={styles.taskInfo}>
                                <Text style={[styles.taskTitle, { color: c.text }]}>
                                    {task.title}
                                </Text>
                                <Text style={[styles.taskDesc, { color: c.subtext }]}>
                                    {task.desc}
                                </Text>
                                {/* Progress bar */}
                                <View
                                    style={[
                                        styles.taskProgressTrack,
                                        { backgroundColor: c.border },
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.taskProgressFill,
                                            {
                                                backgroundColor: task.done ? "#22c55e" : c.accent,
                                                width: `${(task.progress / task.total) * 100}%`,
                                            },
                                        ]}
                                    />
                                </View>
                                <Text style={[styles.taskProgressLabel, { color: c.subtext }]}>
                                    {task.progress}/{task.total}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={[
                                styles.statusCircle,
                                {
                                    borderColor: task.done ? "#22c55e" : c.border,
                                    backgroundColor: task.done ? "#22c55e" : "transparent",
                                },
                            ]}
                        >
                            {task.done && <Text style={styles.checkmark}>✓</Text>}
                        </View>
                    </View>
                ))}
            </ScrollView>

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
                <TouchableOpacity style={styles.navItem}>
                    <Text style={[styles.navIcon, { color: c.accent }]}>☰</Text>
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
        paddingBottom: 12,
    },
    headerTitle: { fontSize: 20, fontWeight: "700" },
    headerIcon: { fontSize: 20 },
    summary: {
        marginHorizontal: 20,
        borderRadius: 14,
        padding: 16,
        marginBottom: 10,
        alignItems: "center",
    },
    summaryText: { fontSize: 12, letterSpacing: 1 },
    summaryCount: { fontSize: 28, fontWeight: "800", marginVertical: 4 },
    progressTrack: {
        width: "100%",
        height: 6,
        borderRadius: 3,
        overflow: "hidden",
        marginTop: 4,
    },
    progressFill: { height: 6, borderRadius: 3 },
    list: { paddingHorizontal: 20, paddingBottom: 16 },
    taskCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 14,
        padding: 14,
        marginBottom: 10,
    },
    taskLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
    taskIcon: { fontSize: 24, marginRight: 12 },
    taskInfo: { flex: 1 },
    taskTitle: { fontSize: 14, fontWeight: "700" },
    taskDesc: { fontSize: 12, marginTop: 2 },
    taskProgressTrack: {
        height: 4,
        borderRadius: 2,
        overflow: "hidden",
        marginTop: 6,
    },
    taskProgressFill: { height: 4, borderRadius: 2 },
    taskProgressLabel: { fontSize: 10, marginTop: 2 },
    statusCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 8,
    },
    checkmark: { color: "#fff", fontSize: 12, fontWeight: "700" },
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
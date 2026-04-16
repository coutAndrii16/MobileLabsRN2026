import React from "react";
import { View, Text, ScrollView } from "react-native";
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

    const bg = isDark ? "bg-gray-900" : "bg-white";
    const card = isDark ? "bg-gray-800" : "bg-gray-200";
    const text = isDark ? "text-white" : "text-black";

    const tasks = [
        { id: 1, title: "10 taps", done: taps >= 10 },
        { id: 2, title: "5 double taps", done: doubleTaps >= 5 },
        { id: 3, title: "Hold 3 sec", done: longPressDone },
        { id: 4, title: "Drag object", done: panDone },
        { id: 5, title: "Swipe right", done: swipeRightDone },
        { id: 6, title: "Swipe left", done: swipeLeftDone },
        { id: 7, title: "Pinch", done: pinchDone },
        { id: 8, title: "100 score", done: score >= 100 },
        { id: 9, title: "Custom: 50 score", done: score >= 50 },
    ];

    return (
        <ScrollView className={`flex-1 p-5 ${bg}`}>
            <Text className={`text-2xl mb-5 ${text}`}>
                Tasks
            </Text>

            {tasks.map(task => (
                <View
                    key={task.id}
                    className={`p-4 rounded-xl mb-3 flex-row justify-between ${card}`}
                >
                    <Text className={text}>{task.title}</Text>
                    <Text>{task.done ? "✅" : "❌"}</Text>
                </View>
            ))}
        </ScrollView>
    );
}
import React from "react";
import { View, Text, Button } from "react-native";
import ClickableObject from "../../components/ClickableObject";
import { useGameStore } from "../../store/useGamingStore";
import { router } from "expo-router";

export default function HomeScreen({ navigation }: any) {
    const { score, isDark } = useGameStore();

    const bg = isDark ? "bg-gray-900" : "bg-white";
    const text = isDark ? "text-white" : "text-black";
    return (
        <View className={`flex-1 justify-center items-center ${bg}`}>
            <Text className={`text-3xl mb-5 ${text}`}>
                Score: {score}
            </Text>

            <ClickableObject />

            <Button title="Tasks" onPress={() => router.push("/screens/TasksScreen")} />
            <Button title="Settings" onPress={() => router.push("/screens/SettingsScreen")} />
        </View>
    );
}
import React from "react";
import { View, Text, Button } from "react-native";
import { useGameStore } from "../../store/useGamingStore";

export default function SettingsScreen() {
    const { isDark, toggleTheme } = useGameStore();

    const bg = isDark ? "bg-gray-900" : "bg-white";
    const card = isDark ? "bg-gray-800" : "bg-gray-200";
    const text = isDark ? "text-white" : "text-black";

    return (
        <View className={`flex-1 justify-center items-center ${bg}`}>

            <View className={`p-6 rounded-2xl ${card}`}>
                <Text className={`text-xl mb-4 ${text}`}>
                    Theme: {isDark ? "Dark" : "Light️"}
                </Text>

                <Button title="Toggle Theme" onPress={toggleTheme} />
            </View>

        </View>
    );
}
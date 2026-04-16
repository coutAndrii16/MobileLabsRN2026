import React from "react";
import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function Home() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 24 }}>🎮 Clicker Game</Text>

            <Button title="Go to Tasks" onPress={() => router.push("/screens/TasksScreen")} />
            <Button title="Settings" onPress={() => router.push("/screens/SettingsScreen")} />
        </View>
    );
}
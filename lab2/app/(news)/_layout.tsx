import { Stack } from "expo-router";

export default function NewsLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Новини" }} />
            <Stack.Screen
                name="details"
                options={({ route }: any) => ({
                    title: route?.params?.title || "Деталі"
                })}
            />
        </Stack>
    );
}
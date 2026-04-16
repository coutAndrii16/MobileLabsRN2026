import React from "react";
import { View, Text } from "react-native";
import {
    TapGestureHandler,
    LongPressGestureHandler,
    FlingGestureHandler,
    PinchGestureHandler,
    Directions,
} from "react-native-gesture-handler";

import { useGameStore } from "../store/useGamingStore";

export default function ClickableObject() {
    const {
        addTap,
        addDoubleTap,
        setLongPressDone,
        setSwipeRightDone,
        setSwipeLeftDone,
        setPinchDone,
        isDark,
    } = useGameStore();

    const card = isDark ? "bg-gray-800" : "bg-gray-200";
    const text = isDark ? "text-white" : "text-black";

    return (
        <View>

            <TapGestureHandler onActivated={addTap}>
                <View className={`p-4 rounded-xl mb-3 ${card}`}>
                    <Text className={text}>Tap</Text>
                </View>
            </TapGestureHandler>

            <TapGestureHandler numberOfTaps={2} onActivated={addDoubleTap}>
                <View className={`p-4 rounded-xl mb-3 ${card}`}>
                    <Text className={text}>Double Tap</Text>
                </View>
            </TapGestureHandler>

            <LongPressGestureHandler
                minDurationMs={3000}
                onActivated={setLongPressDone}
            >
                <View className={`p-4 rounded-xl mb-3 ${card}`}>
                    <Text className={text}>Hold 3 sec</Text>
                </View>
            </LongPressGestureHandler>

            <FlingGestureHandler
                direction={Directions.RIGHT}
                onActivated={setSwipeRightDone}
            >
                <View className={`p-4 rounded-xl mb-3 ${card}`}>
                    <Text className={text}>Swipe →</Text>
                </View>
            </FlingGestureHandler>

            <FlingGestureHandler
                direction={Directions.LEFT}
                onActivated={setSwipeLeftDone}
            >
                <View className={`p-4 rounded-xl mb-3 ${card}`}>
                    <Text className={text}>Swipe ←</Text>
                </View>
            </FlingGestureHandler>

            <PinchGestureHandler onActivated={setPinchDone}>
                <View className={`p-4 rounded-xl mb-3 ${card}`}>
                    <Text className={text}>Pinch</Text>
                </View>
            </PinchGestureHandler>

        </View>
    );
}
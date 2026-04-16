import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import {
    TapGestureHandler,
    LongPressGestureHandler,
    FlingGestureHandler,
    PinchGestureHandler,
    PanGestureHandler,
    Directions,
    State,
    HandlerStateChangeEvent,
    PanGestureHandlerEventPayload,
    PinchGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { useGameStore } from "../store/useGamingStore";

export default function ClickableObject() {
    const {
        addTap,
        addDoubleTap,
        setLongPressDone,
        setPanDone,
        setSwipeRightDone,
        setSwipeLeftDone,
        setPinchDone,
        isDark,
    } = useGameStore();

    // Animated values for position, scale, and visual feedback
    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;
    const bgOpacity = useRef(new Animated.Value(1)).current;

    const lastOffset = useRef({ x: 0, y: 0 });
    const baseScale = useRef(1);
    const pinchScale = useRef(new Animated.Value(1)).current;
    const combinedScale = Animated.multiply(scale, pinchScale);

    // Flash animation on tap
    const flashFeedback = () => {
        Animated.sequence([
            Animated.timing(bgOpacity, {
                toValue: 0.5,
                duration: 80,
                useNativeDriver: true,
            }),
            Animated.timing(bgOpacity, {
                toValue: 1,
                duration: 80,
                useNativeDriver: true,
            }),
        ]).start();
    };

    // --- Gesture handlers ---

    // Single tap
    const singleTapRef = useRef(null);
    const doubleTapRef = useRef(null);

    const onSingleTap = (event: HandlerStateChangeEvent) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            addTap();
            flashFeedback();
        }
    };

    const onDoubleTap = (event: HandlerStateChangeEvent) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            addDoubleTap();
            Animated.sequence([
                Animated.spring(scale, { toValue: 1.3, useNativeDriver: true }),
                Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
            ]).start();
        }
    };

    // Long press
    const onLongPress = (event: HandlerStateChangeEvent) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            setLongPressDone();
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.5,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
            ]).start();
        }
    };

    // Pan (drag)
    const onPanEvent = Animated.event(
        [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
        { useNativeDriver: true }
    );

    const onPanStateChange = (
        event: HandlerStateChangeEvent<PanGestureHandlerEventPayload>
    ) => {
        if (event.nativeEvent.state === State.END) {
            lastOffset.current.x += event.nativeEvent.translationX;
            lastOffset.current.y += event.nativeEvent.translationY;
            translateX.setOffset(lastOffset.current.x);
            translateX.setValue(0);
            translateY.setOffset(lastOffset.current.y);
            translateY.setValue(0);
            setPanDone();
        }
    };

    // Fling right
    const onSwipeRight = (event: HandlerStateChangeEvent) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            setSwipeRightDone();
        }
    };

    // Fling left
    const onSwipeLeft = (event: HandlerStateChangeEvent) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            setSwipeLeftDone();
        }
    };

    // Pinch
    const onPinchEvent = Animated.event(
        [{ nativeEvent: { scale: pinchScale } }],
        { useNativeDriver: true }
    );

    const onPinchStateChange = (
        event: HandlerStateChangeEvent<PinchGestureHandlerEventPayload>
    ) => {
        if (event.nativeEvent.state === State.END) {
            baseScale.current *= event.nativeEvent.scale;
            scale.setValue(baseScale.current);
            pinchScale.setValue(1);
            setPinchDone();
        }
    };

    const colors = {
        bg: isDark ? "#1e1e2e" : "#f0f0f5",
        object: isDark ? "#6c63ff" : "#4f46e5",
        text: isDark ? "#ffffff" : "#1a1a2e",
        shadow: isDark ? "#000" : "#aaa",
    };

    return (
        <PinchGestureHandler
            onGestureEvent={onPinchEvent}
            onHandlerStateChange={onPinchStateChange}
        >
            <Animated.View>
                <FlingGestureHandler
                    direction={Directions.RIGHT}
                    onHandlerStateChange={onSwipeRight}
                >
                    <Animated.View>
                        <FlingGestureHandler
                            direction={Directions.LEFT}
                            onHandlerStateChange={onSwipeLeft}
                        >
                            <Animated.View>
                                <PanGestureHandler
                                    onGestureEvent={onPanEvent}
                                    onHandlerStateChange={onPanStateChange}
                                >
                                    <Animated.View
                                        style={{
                                            transform: [{ translateX }, { translateY }],
                                        }}
                                    >
                                        <LongPressGestureHandler
                                            minDurationMs={3000}
                                            onHandlerStateChange={onLongPress}
                                        >
                                            <Animated.View>
                                                <TapGestureHandler
                                                    ref={doubleTapRef}
                                                    numberOfTaps={2}
                                                    onHandlerStateChange={onDoubleTap}
                                                >
                                                    <Animated.View>
                                                        <TapGestureHandler
                                                            ref={singleTapRef}
                                                            waitFor={doubleTapRef}
                                                            onHandlerStateChange={onSingleTap}
                                                        >
                                                            <Animated.View
                                                                style={[
                                                                    styles.object,
                                                                    {
                                                                        backgroundColor: colors.object,
                                                                        transform: [{ scale: combinedScale }],
                                                                        opacity: bgOpacity,
                                                                        shadowColor: colors.shadow,
                                                                    },
                                                                ]}
                                                            >
                                                                <Text style={styles.icon}>👆</Text>
                                                                <Text style={styles.label}>TAP ME</Text>
                                                            </Animated.View>
                                                        </TapGestureHandler>
                                                    </Animated.View>
                                                </TapGestureHandler>
                                            </Animated.View>
                                        </LongPressGestureHandler>
                                    </Animated.View>
                                </PanGestureHandler>
                            </Animated.View>
                        </FlingGestureHandler>
                    </Animated.View>
                </FlingGestureHandler>
            </Animated.View>
        </PinchGestureHandler>
    );
}

const styles = StyleSheet.create({
    object: {
        width: 130,
        height: 130,
        borderRadius: 65,
        justifyContent: "center",
        alignItems: "center",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 10,
    },
    icon: {
        fontSize: 36,
    },
    label: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 13,
        marginTop: 4,
        letterSpacing: 1,
    },
});
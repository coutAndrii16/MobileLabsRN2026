import { useState } from "react";

export const useGameStore = () => {
    const [score, setScore] = useState(0);
    const [taps, setTaps] = useState(0);
    const [doubleTaps, setDoubleTaps] = useState(0);

    const [longPressDone, setLongPressDone] = useState(false);
    const [panDone, setPanDone] = useState(false);
    const [swipeRightDone, setSwipeRightDone] = useState(false);
    const [swipeLeftDone, setSwipeLeftDone] = useState(false);
    const [pinchDone, setPinchDone] = useState(false);

    const [isDark, setIsDark] = useState(true);

    return {
        score,
        taps,
        doubleTaps,
        longPressDone,
        panDone,
        swipeRightDone,
        swipeLeftDone,
        pinchDone,

        isDark,

        toggleTheme: () => setIsDark(prev => !prev),

        addTap: () => {
            setScore(s => s + 1);
            setTaps(t => t + 1);
        },

        addDoubleTap: () => {
            setScore(s => s + 2);
            setDoubleTaps(d => d + 1);
        },

        setLongPressDone: () => {
            setScore(s => s + 10);
            setLongPressDone(true);
        },

        setPanDone: () => setPanDone(true),
        setSwipeRightDone: () => setSwipeRightDone(true),
        setSwipeLeftDone: () => setSwipeLeftDone(true),
        setPinchDone: () => setPinchDone(true),
    };
};
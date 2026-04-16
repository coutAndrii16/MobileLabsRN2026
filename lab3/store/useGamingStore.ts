import { create } from "zustand";

interface GameStore {
    score: number;
    taps: number;
    doubleTaps: number;
    longPressDone: boolean;
    panDone: boolean;
    swipeRightDone: boolean;
    swipeLeftDone: boolean;
    pinchDone: boolean;
    isDark: boolean;

    toggleTheme: () => void;
    addTap: () => void;
    addDoubleTap: () => void;
    setLongPressDone: () => void;
    setPanDone: () => void;
    setSwipeRightDone: () => void;
    setSwipeLeftDone: () => void;
    setPinchDone: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
    score: 0,
    taps: 0,
    doubleTaps: 0,
    longPressDone: false,
    panDone: false,
    swipeRightDone: false,
    swipeLeftDone: false,
    pinchDone: false,
    isDark: true,

    toggleTheme: () => set((s) => ({ isDark: !s.isDark })),

    addTap: () => set((s) => ({ score: s.score + 1, taps: s.taps + 1 })),

    addDoubleTap: () =>
        set((s) => ({ score: s.score + 2, doubleTaps: s.doubleTaps + 1 })),

    setLongPressDone: () =>
        set((s) => ({ score: s.score + 5, longPressDone: true })),

    setPanDone: () => set({ panDone: true }),
    setSwipeRightDone: () =>
        set((s) => ({
            swipeRightDone: true,
            score: s.score + Math.floor(Math.random() * 10) + 1,
        })),
    setSwipeLeftDone: () =>
        set((s) => ({
            swipeLeftDone: true,
            score: s.score + Math.floor(Math.random() * 10) + 1,
        })),
    setPinchDone: () => set((s) => ({ pinchDone: true, score: s.score + 3 })),
}));
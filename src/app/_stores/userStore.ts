import { create } from "zustand";

interface User {
    user: {
        name?: string
        accessToken?: string
    }
    setUser: (newUser: User['user']) => void
}

export const currentUser = create<User>(set => ({
    user: {},
    setUser: newUser => set({user: newUser})
}))


interface Tab {
    tab: 0 | 1
    setTab: (newTab: Tab['tab']) => void
}

export const currentTab = create<Tab>(set => ({
    tab: 0,
    setTab: newTab => set({tab: newTab})
}))

interface Scroll {
    scroll: number
    setScroll: (newScroll: Scroll['scroll']) => void
}

export const currentScroll = create<Scroll>(set => ({
    scroll: 0,
    setScroll: newScroll => set({scroll: newScroll})
}))
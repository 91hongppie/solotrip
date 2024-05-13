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


import { create } from "zustand";

interface Page {
    page: number
    setPage: (newUser: Page['page']) => void
}

export const currentPage = create<Page>(set => ({
    page: 1,
    setPage: nextPage => set({page: nextPage})
}))

export interface SolplaceFetchData {
    id: string
    images: string
    introduction: string
    solplaceName: string
    userId: string
    updatedAt: string
    createdAt: string
    deletedAt?: string
}

export interface Solplace {
    id: string
    images: string[]
    introduction: string
    solplaceName: string
    userId: string
    updatedAt: Date
    createdAt: Date
    deletedAt?: Date
}

interface Solplaces {
    solplaces: Solplace[]
    setSolplaces: (newSolplaces: Solplace[]) => void
}

export const currentSolplaces = create<Solplaces>(set => ({
    solplaces: [],
    setSolplaces: nextSolplaces => set({solplaces: nextSolplaces})
}))
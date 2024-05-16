

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
    si?: string
    gu?: string
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
    si?: string
    gu?: string
}

interface Solplaces {
    solplaces: Solplace[]
    setSolplaces: (newSolplaces: Solplace[]) => void
}

export const currentSolplaces = create<Solplaces>(set => ({
    solplaces: [],
    setSolplaces: nextSolplaces => set({solplaces: nextSolplaces})
}))


export interface CreateSolplace {
    images?: string[]
    introduction?: string
    solplaceName?: string
}

interface NewSolplace {
    newSolplace: CreateSolplace,
    setNewSolplace: (nextNewSolplace: CreateSolplace) => void
}


export const currentNewSolplace = create<NewSolplace>(set => ({
    newSolplace: {},
    setNewSolplace: nextNewSolplace => set({newSolplace: nextNewSolplace})

}))
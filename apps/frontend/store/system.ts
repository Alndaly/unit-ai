import { create } from 'zustand'

interface SystemState {
    tabBarHeight: number | null,
    sideBarWidth: number | null,
    onInit: () => void
}

export const useSystemStore = create<SystemState>()((set) => ({
    tabBarHeight: null,
    sideBarWidth: null,
    onInit: async () => {
        const w = await window.electronApi.windowInfo.getSideBarWidth()
        set({ sideBarWidth: w })
        const h = await window.electronApi.windowInfo.getTabBarHeight()
        set({ tabBarHeight: h })
    },
}))
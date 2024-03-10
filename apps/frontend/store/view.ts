import { create } from 'zustand'

interface ViewState {
    active: string | null
    views: { title: string, id: string }[]
    onInit: () => void;
    switchView: (id: string) => void;
    closeView: (id: string) => void;
    addView: (view: { title: string, path: string, query?: { [key: string]: string } }) => void
}

export const useViewStore = create<ViewState>()((set) => ({
    active: null,
    views: [],
    onInit: async () => {
        const viewsData = await window.electronApi.windowManager.getMainWindowViews()
        set({
            views: viewsData.views,
            active: viewsData.active
        })
        window.electronApi.windowManager.onMainViewsChange((viewsData) => {
            set({
                views: viewsData.views.map((view) => ({ title: view.title, id: view.id })),
                active: viewsData.active
            })
        })
    },
    addView: (view) => {
        window.electronApi.windowManager.addView(view)
    },
    closeView: (id) => {
        window.electronApi.windowManager.deleteView(id);
    },
    switchView: (id) => {
        set({ active: id })
        window.electronApi.windowManager.switchView(id);
    }
}))
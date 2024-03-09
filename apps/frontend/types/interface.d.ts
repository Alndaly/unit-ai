interface Window {
    darkMode: {
        toggle: () => void
    },
    electronApi: {
        windowManager: {
            getMainWindowViews: () => any,
            switchTab: (id: string) => any
        }
    }
}
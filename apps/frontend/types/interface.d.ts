interface TabItem {
    title: string,
    path: string,
    query?: string
}
interface Window {
    darkMode: {
        toggle: () => void
    },
    electronApi: {
        windowManager: {
            getMainWindowViews: () => any,
            switchTab: (id: string) => any,
            addTab: (tabItem: TabItem) => any,
            deleteTab: (id: string) => any
        }
    }
}
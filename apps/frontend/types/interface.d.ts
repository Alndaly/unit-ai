interface Window {
    electronApi: {
        windowInfo: {
            getSideBarWidth: () => Promise<number>,
            getTabBarHeight: () => Promise<number>,
        },
        windowManager: {
            getMainWindowViews: () => Promise<{ active: string, views: { title: string, id: string }[] }>,
            addView: (view: { title: string, path: string, query?: { [key: string]: string } }) => void,
            deleteView: (id: string) => void,
            switchView: (id: string) => void,
            onMainViewsChange: (callback: (viewsData: {
                views: { title: string, id: string }[];
                active: string;
            }) => void) => void
        }
    }
}
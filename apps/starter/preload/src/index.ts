import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronApi", {
    windowInfo: {
        getSideBarWidth: async () => {
            const ret = await ipcRenderer.invoke('get-side-bar-width');
            return ret
        },
        getTabBarHeight: async () => {
            const ret = await ipcRenderer.invoke('get-tab-bar-height');
            return ret
        },
    },
    windowManager: {
        getMainWindowViews: async () => {
            const ret = await ipcRenderer.invoke('get-main-window-views');
            return ret
        },
        addView: ({ title, path, query }: { title: string, path: string, query?: { [key: string]: string } }) => {
            ipcRenderer.invoke('add-view', { title, path, query });
        },
        deleteView: (id: string) => {
            ipcRenderer.invoke('delete-view', id);
        },
        switchView: (id: string) => {
            ipcRenderer.invoke('switch-view', id);
        },
        getViewQuery: async () => {
            const ret = await ipcRenderer.invoke('get-view-query');
            return ret
        },
        onMainViewsChange: (callback: (viewsData: {
            views: { title: string, id: string }[];
            active: string;
        }) => void) => {
            const cb = (_: any, viewsData: {
                views: { title: string, id: string }[];
                active: string;
            }) => {
                callback(viewsData)
            }
            ipcRenderer.on('views-change', cb);
        },
    }
});
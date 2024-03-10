import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronApi", {
    windowManager: {
        getMainWindowViews: async () => {
            const ret = await ipcRenderer.invoke('get-main-window-views');
            return ret
        },
        switchTab: async (id: string) => {
            const ret = await ipcRenderer.invoke('switch-tab', id);
            return ret
        },
        addTab: async ({ title, path, query }: { title: string, path: string, query: string }) => {
            const ret = await ipcRenderer.invoke('add-tab', { title, path, query });
            return ret
        },
        deleteTab: async (id: string) => {
            const ret = await ipcRenderer.invoke('delete-tab', id);
            return ret
        }
    }
});
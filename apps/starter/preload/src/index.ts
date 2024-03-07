import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("unitAiElectronApi", {
    name: "unitAiElectronApi",
    version: 0.1,
    windowTabManager: {
        maxmizeWindow: async () => {
            await ipcRenderer.invoke('maxmize-window');
        },
        unmaxmizeWindow: async () => {
            await ipcRenderer.invoke('unmaxmize-window');
        },
        minimizeWindow: async () => {
            await ipcRenderer.invoke('minimize-window');
        },
        closeWindow: async () => {
            await ipcRenderer.invoke('close-window');
        },
        isMaxmized: async () => {
            return await ipcRenderer.invoke('is-maxmize');
        },
    }
});
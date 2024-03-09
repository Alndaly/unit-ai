import { app, nativeTheme, ipcMain, BrowserWindow } from 'electron'
import * as path from 'path'

class WindowManager {

    windows: Map<string, BrowserWindow>

    constructor() {
        this.windows = new Map()
    }

    createMainWindow = () => {
        const window = new BrowserWindow({
            show: false,
            width: 1200,
            height: 800,
            frame: true,
            backgroundColor: '#000',
            titleBarStyle: 'hiddenInset',
            webPreferences: {
                devTools: true,
                contextIsolation: true,
                nodeIntegration: false,
                preload: path.resolve(__dirname, '../../preload/dist', 'index.js'),
                disableDialogs: false,
                safeDialogs: true,
                enableWebSQL: false,
            }
        })
        this.windows.set("main", window);
    }

}

export const windowManger = new WindowManager();
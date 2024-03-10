import { BrowserWindow } from 'electron'
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

    destroyWindow = (id: string) => {
        const window = this.windows.get(id);
        window && window.destroy()
    }

}

export const windowManger = new WindowManager();
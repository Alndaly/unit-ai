import { BrowserWindow, ipcMain } from "electron";
import isDev from "electron-is-dev";
import * as path from "path";
/**
 * Manager All Windows
 */
class WindowManager {
  mainWindow: BrowserWindow | null;

  constructor() {
    this.mainWindow = null;
    this.initEventListener();
  }

  createMainWindow = async () => {
    if (this.mainWindow) {
      return this.mainWindow;
    }
    const window = new BrowserWindow({
      show: false,
      width: 1200,
      height: 800,
      titleBarStyle: 'hiddenInset',
      frame: true,
      webPreferences: {
        nodeIntegration: true,
      },
    });
    this.mainWindow = window;
    if (isDev) {
      window.loadURL("http://localhost:3000");
    } else {
      window.loadFile(path.resolve(__dirname, "../../dist/index.html"));
    }
    window.webContents.openDevTools()
    window.show();
  }

  initEventListener = () => {
    ipcMain.handle('maxmize-window', async () => {
      this.mainWindow && this.mainWindow.maximize();
    });

    ipcMain.handle('unmaxmize-window', async () => {
      this.mainWindow && this.mainWindow.unmaximize();
    });

    ipcMain.handle('minimize-window', async () => {
      this.mainWindow && this.mainWindow.minimize();
    });

    ipcMain.handle('close-window', async () => {
      this.mainWindow && this.mainWindow.close();
    });

    ipcMain.handle('is-maxmize', async () => {
      return this.mainWindow && this.mainWindow.isMaximized();
    });
  }
}

export const windowManger = new WindowManager();

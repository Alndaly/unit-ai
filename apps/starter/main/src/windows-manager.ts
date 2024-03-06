import { BrowserWindow } from "electron";
import isDev from "electron-is-dev";
import * as path from "path";
/**
 * Manager All Windows
 */
class WindowManager {
  mainWindow: BrowserWindow | null;

  constructor() {
    this.mainWindow = null;
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

}

export const windowManger = new WindowManager();

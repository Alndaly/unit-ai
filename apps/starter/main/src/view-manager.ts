import { randomUUID } from "crypto";
import { BrowserView, BrowserWindow } from "electron";
import isDev from "electron-is-dev";
import * as path from "path";

interface ViewItem {
  id?: string,
  title: string,
  path: string,
  query?: string,
  broswerView?: BrowserView
}

/**
 * Manager Window's Views
 */
export class ViewManager {

  window: BrowserWindow;
  views: Map<string, ViewItem>;

  constructor(window: BrowserWindow) {
    this.window = window;
    this.views = new Map();
  }

  addView = (viewBaseData: ViewItem) => {
    const view = new BrowserView({
      webPreferences: {
        devTools: true,
        contextIsolation: true,
        nodeIntegration: false,
        preload: path.resolve(__dirname, '../../preload/dist', 'index.js'),
        disableDialogs: false,
        safeDialogs: true,
        enableWebSQL: false,
      },
    })
    if (isDev) {
      view.webContents.loadURL(viewBaseData.path)
    } else {
      view.webContents.loadFile(viewBaseData.path)
    }
    view.setBounds({ x: 0, y: 0, width: 1200, height: 800 })
    const viewId = randomUUID();
    const newViewItem = {
      ...viewBaseData,
      id: viewId,
      broswerView: view
    }
    this.views.set(viewId, newViewItem)
    return newViewItem
  }

  setView = (id: string) => {
    const view = this.views.get(id);
    const originView = this.window.getBrowserView()
    originView && this.window.removeBrowserView(originView)
    const newView = view?.broswerView;
    newView && newView.setBounds({ x: 0, y: 0, width: 1200, height: 800 })
    newView && this.window.addBrowserView(newView)
  }

}

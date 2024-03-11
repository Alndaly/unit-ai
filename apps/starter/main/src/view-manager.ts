import { randomUUID } from "crypto";
import { BrowserView, BrowserWindow } from "electron";
import isDev from "electron-is-dev";
import * as path from "path";

interface ViewItem {
  id: string,
  title: string,
  path: string,
  query?: {
    [key: string]: string
  },
  broswerView: BrowserView
}

/**
 * Manager Window's Views
 */
export class ViewManager {

  window: BrowserWindow;
  views: Map<string, ViewItem>;
  active: string | null;

  constructor(window: BrowserWindow) {
    this.window = window;
    this.views = new Map();
    this.active = null
  }

  private getRootView = () => {
    return Array.from(this.views.values()).find(item => (item.title === 'root'))
  }

  private getHomeView = () => {
    return Array.from(this.views.values()).find(item => (item.title === 'home'))
  }

  dispatchChangeEvent = () => {
    const rootView = this.getRootView()
    const views = Array.from(this.views.values()).map(item => {
      return { id: item.id, title: item.title }
    })
      .filter(item => item.title !== 'root')
    // 注意：这个代码在页面初次渲染前就会有一次发生，此时前端页面是无法接收的，所以在前端首次获取tab需要先调用获取views的接口 
    // TODO:待完善
    rootView?.broswerView.webContents.send('views-change', { views: views, active: this.active })
  }

  addView = (viewBaseData: { title: string, path: string, query: { [key: string]: string } }) => {
    const existSameView = Array.from(this.views.values()).find(item => item.title === viewBaseData.title && item.path === viewBaseData.path)
    if (existSameView) {
      this.active = existSameView.id
      this.dispatchChangeEvent()
      return existSameView
    }
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
    view.webContents.openDevTools()
    view.setBounds({ x: 0, y: 0, width: 1200, height: 800 })
    const viewId = randomUUID().toString();
    const newViewItem = {
      ...viewBaseData,
      id: viewId,
      broswerView: view,
    }
    this.views.set(viewId, newViewItem)
    this.window.addBrowserView(view)
    this.dispatchChangeEvent()
    return newViewItem
  }

  getCurrentView = () => {
    return this.views.get(this.active!)
  }

  getView = (id: string) => {
    return this.views.get(id)
  }

  deleteView = (id: string) => {
    const view = this.views.get(id);
    if (!view) return
    view.broswerView && this.window.removeBrowserView(view.broswerView)
    this.views.delete(id)
    if (this.getHomeView()) {
      this.active = this.getHomeView()!.id
      this.window.setTopBrowserView(this.getHomeView()!.broswerView)
    }
    this.dispatchChangeEvent()
  }

  setView = (id: string) => {
    this.window.setTopBrowserView(this.getRootView()!.broswerView)
    const view = this.views.get(id);
    if (!view) return
    const newView = view.broswerView;
    if (view.title === 'root') {
      newView && newView.setBounds({ x: 0, y: 0, width: 1200, height: 800 })
    } else {
      newView && newView.setBounds({ x: 0, y: this.window.getBounds().y, width: 1200, height: 800 })
    }
    newView && this.window.setTopBrowserView(newView)
    this.active = view.id
    this.dispatchChangeEvent()
  }

}

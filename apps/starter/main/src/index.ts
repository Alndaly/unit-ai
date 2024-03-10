import { startAppServer } from '../../../backend/src';
import { app, ipcMain, BrowserWindow } from 'electron'
import { windowManger } from './window-manager';
import { ViewManager } from './view-manager';
import { resolveViewPath } from './config';

let mainWindow: BrowserWindow | null = null
let mainWindowViewManager: ViewManager | null = null

app.setAboutPanelOptions({
    applicationName: 'Unit-AI',
    applicationVersion: '0.0.0-alpha',
    version: '0.0.0-alpha',
    copyright: 'Copyright © 2024 Kinda',
    authors: ['@Kinda Hall']
})

ipcMain.handle('get-main-window-views', () => {
    if (mainWindowViewManager?.views) {
        return Array.from(mainWindowViewManager?.views.values()).map(item => {
            return { id: item.id, title: item.title, path: item.path }
        }).filter(item => item.title)
    }
})

ipcMain.handle('switch-tab', (event, id: string) => {
    mainWindowViewManager && mainWindowViewManager.setView(id)
})

ipcMain.handle('delete-tab', (event, id: string) => {
    mainWindowViewManager && mainWindowViewManager.deleteView(id)
})

ipcMain.handle('add-tab', (event, { title, path, query }) => {
    if (mainWindowViewManager) {
        const newViewItem = mainWindowViewManager.addView({ title, path: resolveViewPath(path), query })
        mainWindowViewManager.setView(newViewItem.id)
    }

})

app.on('ready', async () => {
    await startAppServer({
        port: 4000,
        staticFolder: null
    });

    windowManger.createMainWindow();
    mainWindow = windowManger.windows.get('main') ? windowManger.windows.get('main')! : null

    if (mainWindow) {
        mainWindowViewManager = new ViewManager(mainWindow)
        mainWindow.show()
        const rootView = mainWindowViewManager.addView({ path: resolveViewPath('/index') })
        mainWindowViewManager.setView(rootView.id)
        const homeView = mainWindowViewManager.addView({ title: 'home', path: resolveViewPath('/home') })
        mainWindowViewManager.setView(homeView.id)
        homeView.broswerView.webContents.openDevTools()
    }
})

// Quit the app once all windows are closed
app.on('window-all-closed', () => app.quit())
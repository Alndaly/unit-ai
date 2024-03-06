import { startAppServer } from '../../../backend/src';
import { app } from 'electron'
import isDev from "electron-is-dev";
import * as path from 'path';
import { windowManger } from '@/windows-manager';

app.setAboutPanelOptions({
    applicationName: 'Unit-AI',
    applicationVersion: '0.0.0-alpha',
    version: '0.0.0-alpha',
    copyright: 'Copyright © 2024 Kinda',
    authors: ['@Kinda Hall']
})

app.on('ready', async () => {
    await startAppServer({
        port: 4000,
        staticFolder: null
    });
    // start desktop window
    await windowManger.createMainWindow();
})

// Quit the app once all windows are closed
app.on('window-all-closed', () => app.quit())
import * as path from 'path';
import * as os from 'os';
import * as fsExtra from 'fs-extra';
import { JSONFilePreset } from 'lowdb/node'
import { appRootDir, appTempDir } from 'src/config/base';

export function getAppDataDir() {
    const appDir = path.join(os.homedir(), appRootDir);
    fsExtra.ensureDirSync(appDir)
    return appDir;
}

export function getAppTmpDir() {
    const tmpDir = path.join(getAppDataDir(), appTempDir);
    fsExtra.ensureDirSync(tmpDir)
    return tmpDir;
}

const config_file = path.join(getAppDataDir(), 'config.json');

export const getComfyUIDir = async () => {
    const defaultData = { ComfyUI: path.join(getAppDataDir(), 'ComfyUI') }
    const db = await JSONFilePreset(config_file, defaultData)
    await db.read()
    if (db.data.ComfyUI) {
        return db.data.ComfyUI
    }
}

export const getStableDiffusionDir = async () => {
    const defaultData = { StableDiffusion: '' }
    const db = await JSONFilePreset(config_file, defaultData)
    await db.read()
    if (db.data.StableDiffusion) {
        return db.data.StableDiffusion
    }
}
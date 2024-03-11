import * as path from 'path';
import * as os from 'os';
import * as fsExtra from 'fs-extra';
import { JSONFilePreset } from 'lowdb/node'

export function getAppDataDir() {
    const appDir = path.join(os.homedir(), 'unit-ai');
    fsExtra.ensureDirSync(appDir)
    return appDir;
}

export function getAppTmpDir() {
    const tmpDir = path.join(getAppDataDir(), 'tmp');
    fsExtra.ensureDirSync(tmpDir)
    return tmpDir;
}

export const DEFAULT_COMFYUI_PATH = path.join(getAppDataDir(), 'ComfyUI');

const config_file = path.join(getAppDataDir(), 'config.json');

export const getComfyUIDir = async () => {
    const defaultData = { ComfyUI: DEFAULT_COMFYUI_PATH }
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
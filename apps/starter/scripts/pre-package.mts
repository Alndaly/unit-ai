import { resolve } from 'path';
import { remove, ensureDir, copy } from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname } from "path"

// 获取当前文件所在夹
export const __dirname = dirname(fileURLToPath(import.meta.url));

async function cleanAndCopy() {
    await remove(resolve(__dirname, "../dist"));
    await ensureDir(resolve(__dirname, "../dist"));
    await copy(
        resolve(__dirname, '../../frontend/out'),
        resolve(__dirname, '../dist')
    )
}

cleanAndCopy();
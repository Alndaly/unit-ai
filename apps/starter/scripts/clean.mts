import { fileURLToPath } from 'url';
import path, { dirname } from "path"
import fse from 'fs-extra'

export const __dirname = dirname(fileURLToPath(import.meta.url));

fse.remove(path.resolve(__dirname, '../main/dist'))
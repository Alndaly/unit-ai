import { builtinModules } from "module";
import { fileURLToPath } from 'url';
import path, { dirname } from "path"
import { BuildOptions } from "esbuild";

// 获取当前文件所在夹
export const __dirname = dirname(fileURLToPath(import.meta.url));

export const MainBuildConfig: BuildOptions = {
    entryPoints: [path.resolve(__dirname, "../main/", "./src/index.ts")],
    outfile: path.resolve(__dirname, "../main/", "./dist/index.js"),
    bundle: true,
    platform: 'node',
    format: 'cjs',
    minify: false,
    target: [`node16`],
    sourcemap: true,
    external: ['electron', 'node-pty', "regedit", ...builtinModules],
}

export const PreloadBuildConfig: BuildOptions = {
    entryPoints: [path.resolve(__dirname, "../preload/", "./src/index.ts")],
    outfile: path.resolve(__dirname, "../preload/", "./dist/index.js"),
    bundle: true,
    platform: 'node',
    minify: false,
    target: 'chrome98',
    sourcemap: true,
    external: ['electron', ...builtinModules], // Add external dependencies here
}
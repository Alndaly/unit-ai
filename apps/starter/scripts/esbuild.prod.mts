#!/usr/bin/env node
import esbuild from "esbuild";
import { MainBuildConfig, PreloadBuildConfig } from "./esbuild.base.mjs";

const mainBuild = async () => {
  await esbuild.build({
    ...MainBuildConfig
  })
}

const preloadBuild = async () => {
  await esbuild.build({
    ...PreloadBuildConfig
  })
}

(async () => {
  try {
    await mainBuild();
    await preloadBuild();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();

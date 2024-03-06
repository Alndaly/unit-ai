#!/usr/bin/env node
import esbuild from "esbuild";
import { MainBuildConfig } from "./esbuild.base.mjs";

const mainBuild = async () => {
  await esbuild.build({
    ...MainBuildConfig
  })
}

(async () => {
  try {
    await mainBuild();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();

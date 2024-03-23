import { execSync } from "child_process";
import { systemType, userHomeDir } from "./system";
import { condaEnvName } from "src/config/base";

export const defaultCondaPath = systemType === 'Windows_NT' ? 'C:\\tools\\Miniconda3' : `${userHomeDir}/miniconda3`;
export const DEFAULT_CONDA_ENV_PATH = systemType === 'Windows_NT' ? `${defaultCondaPath}\\envs\\${condaEnvName}` : `${defaultCondaPath}/envs/${condaEnvName}`;

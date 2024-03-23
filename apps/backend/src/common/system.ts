import { execa } from "execa";
import * as os from 'os'
import { execSync } from "child_process";

export const systemType = os.type()
export const userHomeDir = os.homedir();

export const getGpuType: () => Promise<string> = async () => {
    try {
        // 使用 nvidia-smi 命令获取 NVIDIA GPU 信息
        await execa('nvidia-smi');
        return 'nvidia';
    } catch (errorNVIDIA) {
        // 使用 rocm-smi 命令获取 AMD GPU 信息
        try {
            await execa('rocm-smi');
            return 'amd';
        } catch (errorAMD) {
            // 如果都失败，则可能没有 GPU 或者其他类型的 GPU
            return 'unknown';
        }
    }
}

const getMacProxySettings = () => {
    const systemProxyString = execSync("scutil --proxy").toString();
    const proxyTypes = [['HTTP', 'http_proxy'], ['HTTPS', 'https_proxy'], ['SOCKS', 'all_proxy']];

    for (let item of proxyTypes) {
        const type = item[0];
        const key = item[1];
        const proxyPattern = new RegExp(type + "Proxy" + " : (\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3})");
        const portPattern = new RegExp(type + "Port" + " : (\\d+)");

        const address = proxyPattern.exec(systemProxyString);
        const port = portPattern.exec(systemProxyString);
        if (address && port) {
            return `http://${address[1]}:${port[1]}`;
        }
    }
}

async function getWindowsProxySettings() {
    const regedit = require('regedit').promisified;
    try {
        const key = "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Internet Settings"
        const proxySettings = (await regedit.list(key))[key].values;

        const ret = {
            enabled: proxySettings.ProxyEnable.value,
            server: proxySettings.ProxyServer.value,
            override: proxySettings.ProxyOverride.value
        };

        if (ret.enabled && ret.server) {
            const server = "http://" + ret.server;
            return server
        }

    } catch (err) {
        console.log("read error", err);
    }
}
import * as Configstore from 'electron-store';

class UnitAiConfigManager {
    private config: Configstore;

    constructor(configName: string) {
        // 初始化 Configstore 实例
        this.config = new Configstore({ name: configName });
    }

    // 获取配置项
    get(key: string): any {
        return this.config.get(key);
    }

    // 设置配置项
    set(key: string, value: any): void {
        this.config.set(key, value);
    }

    // 删除配置项
    delete(key: string): void {
        this.config.delete(key);
    }
}

// 示例用法
const appConfigManager = new UnitAiConfigManager('config');

export { appConfigManager }
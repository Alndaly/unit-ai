import * as path from "path"
import isDev from "electron-is-dev"

export const devUrlPrefix = "http://localhost:3000"
export const pathPrefix = path.resolve(__dirname, "../../dist")

export function resolveViewPath(pagePath: string): string {
    let realPagePath = pagePath
    if (pagePath === "/index" && isDev) {
        realPagePath = ""
    }
    return isDev ? `${devUrlPrefix}${realPagePath}` : `${pathPrefix}${realPagePath}.html`
}
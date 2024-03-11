import * as path from "path"
import isDev from "electron-is-dev"

export const devUrlPrefix = "http://localhost:3000"
export const pathPrefix = path.resolve(__dirname, "../../dist")

export function resolveViewPath(pagePath: string): string {
    return isDev ? `${devUrlPrefix}${pagePath}` : `${pathPrefix}${pagePath}.html`
}
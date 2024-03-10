import * as path from "path"
import * as qs from 'querystring'
import isDev from "electron-is-dev"

export const devUrlPrefix = "http://localhost:3000"
export const pathPrefix = path.resolve(__dirname, "../../dist")

export function resolveViewPath(pagePath: string, query: { [key: string]: string }): string {
    return isDev ? `${devUrlPrefix}${pagePath}?${qs.stringify(query)}` : `${pathPrefix}${pagePath}.html`
}
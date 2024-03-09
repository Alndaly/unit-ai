const withMDX = require('@next/mdx')()
const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    // 正常会直接去服务的根路径找，是找不到script的链接文件的，此处需要加个.表示相对目录
    assetPrefix: isProd ? '.' : '',
};

module.exports = withMDX(nextConfig)
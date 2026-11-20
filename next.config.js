/** @type {import('next').NextConfig} */
const repo = 'REPO-NAME' // use '' if the repo is username.github.io
module.exports = {
  output: 'export',
  basePath: repo ? `/${repo}` : '',
  assetPrefix: repo ? `/${repo}/` : '',
  images: { unoptimized: true },
  trailingSlash: true,
}

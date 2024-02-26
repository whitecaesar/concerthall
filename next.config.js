/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.anytoon.co.kr",
			},
			{
				protocol: "http",
				hostname: "211.43.189.202",
			},
			{
				protocol: 'http',
				hostname: 'cip.ontown.co.kr'
			}
		],
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/main',
				permanent: true,
			},
		]
	},

}

module.exports = nextConfig

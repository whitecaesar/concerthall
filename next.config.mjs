/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	productionBrowserSourceMaps: true,
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
			},
			{
				protocol: 'https',
				hostname: 'static.qobuz.com'
			},
			{
				protocol: 'https',
				hostname: 'imgcdn.cinehotel.co.kr'
			},
			{
				protocol: 'http',
				hostname: 'ons.ontown.co.kr'
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

export default nextConfig;

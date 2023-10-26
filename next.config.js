/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")([
	"@pusher/push-notifications-web"
]);

const nextConfig = {
	reactStrictMode: false,
	env: {
		API_URL: process.env.API_URL,
	},
}

module.exports = withTM(nextConfig);
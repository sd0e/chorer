/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")([
	"@pusher/push-notifications-web",
]); // pass the modules you would like to see transpiled

module.exports = withTM();
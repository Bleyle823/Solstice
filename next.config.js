/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	basePath: "",
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
	webpack: (config) => {
		config.externals.push("pino-pretty", "lokijs", "encoding");
		return config;
	},
	env: {
		BASE_URL: process.env.BASE_URL || 'https://example.com', // Ensure this environment variable is set
	},
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{
						key: 'metadataBase',
						value: process.env.BASE_URL || 'https://example.com', // Use the environment variable or a default value
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
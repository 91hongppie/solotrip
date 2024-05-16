/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/main",
                permanent: true,
            },
        ];
    },
    webpack: (config) => {
        config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
        });

        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "develop.cdn.solotrip.kr",
            },
        ],
    },
    experimental: {
        scrollRestoration: true
    }

}

module.exports = nextConfig

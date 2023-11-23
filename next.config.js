/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',

    images: {

        domains: ['localhost', 'https://img.clerk.com', 'img.clerk.com'],
    },
};

module.exports = nextConfig

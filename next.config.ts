import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	cacheComponents: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**.vercel.app',
			},
			{
				protocol: 'https',
				hostname: '**.vercel.com',
			},
			{
				// Vercel Blob Storage — used for article images
				protocol: 'https',
				hostname: '**.public.blob.vercel-storage.com',
			},
		],
	},
};

export default nextConfig;

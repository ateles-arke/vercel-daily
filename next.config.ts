import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	cacheComponents: true,
	images: {
		remotePatterns: [
			{
				// Article images are currently served from this Vercel Blob bucket.
				protocol: 'https',
				hostname: 'i8qy5y6gxkdgdcv9.public.blob.vercel-storage.com',
			},
		],
	},
};

export default nextConfig;

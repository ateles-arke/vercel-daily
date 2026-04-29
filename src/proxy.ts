import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Set proper X-Robots-Tag header to allow indexing on all pages
export function proxy(request: NextRequest) {
	const response = NextResponse.next();
	response.headers.set('X-Robots-Tag', 'index, follow');
	return response;
}

export const config = {
	matcher: [
		// Match all routes except static files and image optimization
		'/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
	],
};

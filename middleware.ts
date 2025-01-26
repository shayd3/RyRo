import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    console.log('Middleware running');
    console.log('Pathname:', req.nextUrl.pathname);

    // Simple check for single segment paths
    const segments = req.nextUrl.pathname.split('/').filter(Boolean);
    console.log('Path segments:', segments);

    if (segments.length === 1) {
        const slug = segments[0];
        console.log('Slug found:', slug);
        return NextResponse.redirect(new URL(`/api/v1/url/${slug}`, req.url));
    }
}

export const config = {
    matcher: '/:slug'
}

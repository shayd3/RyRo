import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// TODO: Rate limiting for short URLs
export async function GET(
    request: Request,
    { params }: { params: Promise<{slug: string }> }
): Promise<NextResponse> {
    try {
        const { slug } = await params;
        const shortUrl = await prisma.shortUrl.findUnique({ where: { slug } });
        if (!shortUrl) {
            // TODO: maybe in the future, re-direct to home page and show error message
            return NextResponse.json(
                { error: 'Short URL not found' },
                { status: 404 }
            );
        }
        // TODO: Update the "visit" or "clicks" count
        await prisma.shortUrl.update({
            where: { slug },
            data: { visits: { increment: 1 } }
        });
        return NextResponse.redirect(shortUrl.original);
    } catch (error) {
        console.error('Error redirecting to original URL:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

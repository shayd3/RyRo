import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    try {
        const { slug } = params;
        const shortUrl = await prisma.shortUrl.findUnique({ where: { slug } });
        if (!shortUrl) {
            // TODO: maybe in the future, re-direct to home page and show error message
            return NextResponse.json(
                { error: 'Short URL not found' },
                { status: 404 }
            );
        }
        // TODO: Update the "visit" or "clicks" count
        return NextResponse.redirect(shortUrl.original);
    } catch (error) {
        console.error('Error redirecting to original URL:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

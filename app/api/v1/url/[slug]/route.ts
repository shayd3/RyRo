import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';

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

        // Check if URL has expired
        if (shortUrl.expiresAt && new Date() > shortUrl.expiresAt) {
            return NextResponse.json(
                { error: 'This short URL has expired' },
                { status: 410 } // 410 Gone
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

// DELETE /api/v1/url/[slug] - Delete a URL (only owner can delete)
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse> {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { slug } = await params;

        // Find the URL and verify ownership
        const shortUrl = await prisma.shortUrl.findUnique({
            where: { slug },
        });

        if (!shortUrl) {
            return NextResponse.json(
                { error: 'URL not found' },
                { status: 404 }
            );
        }

        if (shortUrl.userId !== session.user.id) {
            return NextResponse.json(
                { error: 'Forbidden' },
                { status: 403 }
            );
        }

        await prisma.shortUrl.delete({
            where: { slug },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting URL:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

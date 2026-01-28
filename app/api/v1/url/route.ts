import { z } from 'zod'; // zod is used for schema validation
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';

const schema = z.object({
    url: z.string().url({ message: 'Invalid URL format' })
  });

// Anonymous URLs expire after 1 day
const ANONYMOUS_EXPIRATION_HOURS = 24;

export async function POST(req: Request) {
    try {
        console.log('Request received');
        const body = await req.json();
        const { url } = schema.parse(body);

        // Get the current user session (if logged in)
        const session = await auth();
        const userId = session?.user?.id || null;

        let slug: string
        let exists: boolean
        // Preventing collisions
        do {
            slug = Math.random().toString(36).substring(2, 10);
            exists = !!(await prisma.shortUrl.findUnique({ where: { slug } }));
        } while (exists);

        // Set expiration: null for authenticated users, 24 hours for anonymous
        const expiresAt = userId
            ? null
            : new Date(Date.now() + ANONYMOUS_EXPIRATION_HOURS * 60 * 60 * 1000);

        const shortUrl = await prisma.shortUrl.create({
            data: {
                slug,
                original: url,
                userId,
                expiresAt,
            }
        });

        return NextResponse.json({ shortUrl });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors[0].message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },  // Added details
            { status: 500 }
        );
    }
}

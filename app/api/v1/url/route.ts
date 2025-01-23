import { z } from 'zod'; // zod is used for schema validation
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const schema = z.object({
    url: z.string().url({ message: 'Invalid URL format' })
  });

export async function POST(req: Request) {
    try {
        console.log('Request received');
        const body = await req.json();
        const { url } = schema.parse(body);

        let slug: string
        let exists: boolean
        // Preventing collisions
        do {
            slug = Math.random().toString(36).substring(2, 10);
            exists = !!(await prisma.shortUrl.findUnique({ where: { slug } }));
        } while (exists);

        const shortUrl = await prisma.shortUrl.create({
            data: {
                slug,
                original: url
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
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export const runtime = 'edge';

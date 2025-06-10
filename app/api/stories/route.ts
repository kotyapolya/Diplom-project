import { prisma } from '@/prisma/prisma-client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const stories = await prisma.story.findMany({
      include: {
        items: true,
      },
    });
    return NextResponse.json(stories);
  } catch (error) {
    console.error('Failed to fetch stories:', error);
    return new NextResponse('Server Error', { status: 500 });
  }
}

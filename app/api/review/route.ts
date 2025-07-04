import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Get all reviews (GET)
export async function GET() {
  const reviews = await prisma.review.findMany({
    include: { user: { select: { id: true, username: true, email: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ reviews });
}

// Create a new review (POST)
export async function POST(req: NextRequest) {
  const { userId, content, rating } = await req.json();
  if (!content || !rating) {
    return NextResponse.json({ error: 'Missing content or rating' }, { status: 400 });
  }
  const review = await prisma.review.create({
    data: {
      userId: userId ? Number(userId) : undefined,
      content,
      rating: Number(rating),
    },
    include: { user: { select: { id: true, username: true, email: true } } },
  });
  return NextResponse.json({ review });
}

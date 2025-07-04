import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Subscribe to newsletter (POST)
export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: 'Missing email' }, { status: 400 });
  }
  // Prevent duplicate subscriptions
  const existing = await prisma.newsletter.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: 'Email already subscribed' }, { status: 409 });
  }
  const subscriber = await prisma.newsletter.create({ data: { email } });
  return NextResponse.json({ subscriber });
}

// Get all newsletter subscribers (GET, for admin)
export async function GET() {
  const subscribers = await prisma.newsletter.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ subscribers });
}

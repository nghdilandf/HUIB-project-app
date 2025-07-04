import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Get all messages (GET, for admin)
export async function GET() {
  const messages = await prisma.message.findMany({
    include: { user: { select: { id: true, username: true, email: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ messages });
}

// Send a message (POST, from user or admin)
export async function POST(req: NextRequest) {
  const { userId, from, content, reply } = await req.json();
  if (!from || !content) {
    return NextResponse.json({ error: 'Missing sender or content' }, { status: 400 });
  }
  const message = await prisma.message.create({
    data: {
      userId: userId ? Number(userId) : undefined,
      from,
      content,
      reply,
    },
    include: { user: { select: { id: true, username: true, email: true } } },
  });
  return NextResponse.json({ message });
}

// Reply to a message (PATCH, from admin)
export async function PATCH(req: NextRequest) {
  const { id, reply } = await req.json();
  if (!id || !reply) {
    return NextResponse.json({ error: 'Missing message id or reply' }, { status: 400 });
  }
  const message = await prisma.message.update({
    where: { id: Number(id) },
    data: { reply },
    include: { user: { select: { id: true, username: true, email: true } } },
  });
  return NextResponse.json({ message });
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Get user profile by ID (GET)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing user id' }, { status: 400 });
  }
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    select: { id: true, email: true, username: true, role: true, createdAt: true, updatedAt: true },
  });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  return NextResponse.json({ user });
}

// Update user profile (PATCH)
export async function PATCH(req: NextRequest) {
  const { id, email, username, town, city } = await req.json();
  if (!id) {
    return NextResponse.json({ error: 'Missing user id' }, { status: 400 });
  }
  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: {
      email,
      username,
      ...(town !== undefined && { town }),
      ...(city !== undefined && { city })
    },
    select: { id: true, email: true, username: true, role: true, createdAt: true, updatedAt: true, town: true, city: true },
  });
  return NextResponse.json({ user });
}

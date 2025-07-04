
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { email, username, password, confirm, town, city } = await req.json();

  if (!email || !username || !password || !confirm) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  if (password !== confirm) {
    return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
  }
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
      role: 'user',
      // Optionally store town/city if you add these fields to your schema
    },
    select: { id: true, email: true, username: true, role: true, createdAt: true, updatedAt: true },
  });
  return NextResponse.json({ success: true, user, redirect: '/auth/login' });
}

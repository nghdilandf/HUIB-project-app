import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  // Redirect based on role
  let redirect = '/homepage';
  if (user.role === 'admin') {
    redirect = '/';
  }
  return NextResponse.json({
    user: { id: user.id, email: user.email, username: user.username, role: user.role },
    redirect
  });
}

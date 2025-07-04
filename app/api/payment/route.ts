import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Get all payments (GET, for admin)
export async function GET() {
  const payments = await prisma.payment.findMany({
    include: {
      order: {
        include: {
          user: { select: { id: true, email: true, username: true } },
          items: { include: { product: true } },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ payments });
}

// Create a new payment (POST)
export async function POST(req: NextRequest) {
  const { orderId, amount, status } = await req.json();
  if (!orderId || !amount || !status) {
    return NextResponse.json({ error: 'Missing payment details' }, { status: 400 });
  }
  const payment = await prisma.payment.create({
    data: {
      orderId: Number(orderId),
      amount: Number(amount),
      status,
    },
    include: {
      order: {
        include: {
          user: { select: { id: true, email: true, username: true } },
          items: { include: { product: true } },
        },
      },
    },
  });
  return NextResponse.json({ payment });
}

// Update payment status (PATCH)
export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json();
  if (!id || !status) {
    return NextResponse.json({ error: 'Missing payment id or status' }, { status: 400 });
  }
  const payment = await prisma.payment.update({
    where: { id: Number(id) },
    data: { status },
    include: {
      order: {
        include: {
          user: { select: { id: true, email: true, username: true } },
          items: { include: { product: true } },
        },
      },
    },
  });
  return NextResponse.json({ payment });
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Get all orders (GET)
export async function GET() {
  const orders = await prisma.order.findMany({
    include: {
      user: { select: { id: true, email: true, username: true } },
      items: { include: { product: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ orders });
}

// Update order status (PATCH)
export async function PATCH(req: NextRequest) {
  const { orderId, status } = await req.json();
  if (!orderId || !status) {
    return NextResponse.json({ error: 'Missing orderId or status' }, { status: 400 });
  }
  const order = await prisma.order.update({
    where: { id: Number(orderId) },
    data: { status },
    include: {
      user: { select: { id: true, email: true, username: true } },
      items: { include: { product: true } },
    },
  });
  return NextResponse.json({ order });
}

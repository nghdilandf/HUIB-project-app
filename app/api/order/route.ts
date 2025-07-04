import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Create a new order (POST)
export async function POST(req: NextRequest) {
  const { userId, items, quickOrder, tableNumber, total } = await req.json();
  if (!items || !Array.isArray(items) || items.length === 0 || !total) {
    return NextResponse.json({ error: 'Missing order details' }, { status: 400 });
  }
  const order = await prisma.order.create({
    data: {
      userId: userId ? Number(userId) : undefined,
      quickOrder: !!quickOrder,
      tableNumber: quickOrder ? tableNumber : undefined,
      status: 'pending',
      total,
      items: {
        create: items.map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: { items: true },
  });
  return NextResponse.json({ order });
}

// Get orders (GET)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const orders = await prisma.order.findMany({
    where: userId ? { userId: Number(userId) } : {},
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ orders });
}

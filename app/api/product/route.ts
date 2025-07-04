import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Get all products (GET)
export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ products });
}

// Create a new product (POST)
export async function POST(req: NextRequest) {
  const { name, details, price, photo } = await req.json();
  if (!name || !price) {
    return NextResponse.json({ error: 'Missing name or price' }, { status: 400 });
  }
  const product = await prisma.product.create({
    data: { name, details, price: Number(price), photo },
  });
  return NextResponse.json({ product });
}

// Update a product (PATCH)
export async function PATCH(req: NextRequest) {
  const { id, name, details, price, photo } = await req.json();
  if (!id) {
    return NextResponse.json({ error: 'Missing product id' }, { status: 400 });
  }
  const product = await prisma.product.update({
    where: { id: Number(id) },
    data: { name, details, price: price ? Number(price) : undefined, photo },
  });
  return NextResponse.json({ product });
}

// Delete a product (DELETE)
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: 'Missing product id' }, { status: 400 });
  }
  await prisma.product.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}

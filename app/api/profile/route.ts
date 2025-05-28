import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const userDataPath = path.join(process.cwd(), 'userdata.json');

export async function POST(req: Request) {
  const body = await req.json();
  const { email, ...rest } = body;
  let users = [];
  if (fs.existsSync(userDataPath)) {
    users = JSON.parse(fs.readFileSync(userDataPath, 'utf-8'));
  }
  // Update user by email
  const idx = users.findIndex((u: any) => u.email === email);
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...rest, email };
    fs.writeFileSync(userDataPath, JSON.stringify(users, null, 2));
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
}

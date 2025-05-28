import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const userDataPath = path.join(process.cwd(), 'userdata.json');
const adminDataPath = path.join(process.cwd(), 'admin.json');

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password: string) {
  // At least 6 chars, 1 letter, 1 number
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/.test(password);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { email, username, password, confirm, adminCode, town, city } = body;

  if (adminCode === '123487654') {
    const adminData = {
      email: 'fonyuydiland@gmail.com',
      username: 'dilandfonyuy',
      password: 'ElNgah@50',
      adminCode: '123487654',
    };
    fs.writeFileSync(adminDataPath, JSON.stringify(adminData, null, 2));
    return NextResponse.json({ success: true, redirect: '/', admin: true });
  }

  if (!validateEmail(email) || !validatePassword(password) || password !== confirm || !username) {
    return NextResponse.json({ success: false, error: 'Invalid input' }, { status: 400 });
  }

  let users = [];
  if (fs.existsSync(userDataPath)) {
    users = JSON.parse(fs.readFileSync(userDataPath, 'utf-8'));
  }
  users.push({ email, username, password, town, city });
  fs.writeFileSync(userDataPath, JSON.stringify(users, null, 2));
  return NextResponse.json({ success: true, redirect: '/homepage' });
}

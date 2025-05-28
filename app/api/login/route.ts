import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const userDataPath = path.join(process.cwd(), 'userdata.json');
const adminDataPath = path.join(process.cwd(), 'admin.json');

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password: string) {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/.test(password);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, adminCode } = body;

  if (adminCode === '123487654') {
    if (
      email === 'fonyuydiland@gmail.com' &&
      password === 'ElNgah@50'
    ) {
      const adminData = {
        email: 'fonyuydiland@gmail.com',
        username: 'dilandfonyuy',
        password: 'ElNgah@50',
        adminCode: '123487654',
      };
      fs.writeFileSync(adminDataPath, JSON.stringify(adminData, null, 2));
      return NextResponse.json({ success: true, redirect: '/', admin: true });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid admin credentials' }, { status: 401 });
    }
  }

  if (!validateEmail(email) || !validatePassword(password)) {
    return NextResponse.json({ success: false, error: 'Invalid input' }, { status: 400 });
  }

  if (fs.existsSync(userDataPath)) {
    const users = JSON.parse(fs.readFileSync(userDataPath, 'utf-8'));
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (user) {
      // Return user data for client-side storage
      return NextResponse.json({ success: true, redirect: '/homepage', user });
    }
  }
  return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
}

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function main() {
  const prisma = new PrismaClient();
  const password = await bcrypt.hash('ElNgah@50', 10);
  await prisma.user.upsert({
    where: { email: 'fonyuy@gmail.com' },
    update: { password, role: 'admin', username: 'admin' },
    create: { email: 'fonyuy@gmail.com', password, role: 'admin', username: 'admin' },
  });
  await prisma.$disconnect();
  console.log('Admin user created or updated.');
}

main().catch((e) => { console.error(e); process.exit(1); });

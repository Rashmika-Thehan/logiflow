// SUPER_ADMIN_EMAIL=... SUPER_ADMIN_PASSWORD=... pnpm dotenv -e .env -- pnpm --filter ./apps/identity-service exec node scripts/create-super-admin.mjs
// If your identity client is generated to a custom path or needs an adapter, import it the way prisma.service.ts does.
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const email = process.env.SUPER_ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.SUPER_ADMIN_PASSWORD;
if (!email || !password || password.length < 12) {
    console.error('Set SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD (12+ characters).');
    process.exit(1);
}

const prisma = new PrismaClient();
try {
    const existing = await prisma.user.findFirst({ where: { email: { equals: email, mode: 'insensitive' } } });
    if (existing) throw new Error('A user with that email already exists');
    const user = await prisma.user.create({
        data: { email, passwordHash: await bcrypt.hash(password, 12), role: 'SUPER_ADMIN', fullName: 'Platform Admin', tenantId: null },
    });
    console.log(`Created SUPER_ADMIN ${user.id}`);
} finally {
    await prisma.$disconnect();
}
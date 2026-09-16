import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { authGuard, hashPassword } from '@/lib/auth';

// GET /api/users - List all users (ADMIN only)
export async function GET(request: NextRequest) {
  const guard = await authGuard(request, ['ADMIN', 'MANAGER']);
  if (guard instanceof Response) return guard;

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.trim();
    const role = searchParams.get('role');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    const where: Record<string, unknown> = {};
    if (role) where.role = role;
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
      ];
    }

    const [users, total] = await Promise.all([
      db.user.findMany({
        where,
        select: {
          id: true, email: true, name: true, role: true, avatar: true,
          language: true, isActive: true, lastLogin: true, createdAt: true, updatedAt: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.user.count({ where }),
    ]);

    return NextResponse.json({
      items: users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST /api/users - Create user (ADMIN only)
export async function POST(request: NextRequest) {
  const guard = await authGuard(request, ['ADMIN']);
  if (guard instanceof Response) return guard;

  try {
    const body = await request.json();
    const { email, password, name, role, language, isActive } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Email, password, and name are required' }, { status: 400 });
    }

    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const user = await db.user.create({
      data: {
        email, passwordHash, name,
        role: role || 'VIEWER',
        language: language || 'en',
        isActive: isActive !== false,
      },
      select: {
        id: true, email: true, name: true, role: true, avatar: true,
        language: true, isActive: true, lastLogin: true, createdAt: true, updatedAt: true,
      },
    });

    return NextResponse.json({ data: user }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

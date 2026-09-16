import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { authGuard, hashPassword } from '@/lib/auth';

// GET /api/users/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await authGuard(request, ['ADMIN', 'MANAGER']);
  if (guard instanceof Response) return guard;

  try {
    const { id } = await params;
    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true, email: true, name: true, role: true, avatar: true,
        language: true, isActive: true, lastLogin: true, createdAt: true, updatedAt: true,
      },
    });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ data: user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

// PUT /api/users/[id] (ADMIN only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await authGuard(request, ['ADMIN']);
  if (guard instanceof Response) return guard;

  try {
    const { id } = await params;
    const body = await request.json();
    const { name, role, language, isActive, password } = body;

    const data: Record<string, unknown> = {};
    if (name !== undefined) data.name = name;
    if (role !== undefined) data.role = role;
    if (language !== undefined) data.language = language;
    if (isActive !== undefined) data.isActive = isActive;
    if (password) data.passwordHash = await hashPassword(password);

    const user = await db.user.update({
      where: { id },
      data,
      select: {
        id: true, email: true, name: true, role: true, avatar: true,
        language: true, isActive: true, lastLogin: true, createdAt: true, updatedAt: true,
      },
    });
    return NextResponse.json({ data: user });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

// DELETE /api/users/[id] (ADMIN only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await authGuard(request, ['ADMIN']);
  if (guard instanceof Response) return guard;

  try {
    const { id } = await params;
    await db.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}

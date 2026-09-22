import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { getServerSession } from 'next-auth';
import { authOptions } from './nextauth';

// ==================== JWT Token (jose) ====================
const JWT_SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'heavy-lift-wms-secret-key-change-in-production');
const JWT_EXPIRES_IN = '24h';

export async function generateToken(payload: Record<string, unknown>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<Record<string, unknown> | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as Record<string, unknown>;
  } catch {
    return null;
  }
}

// ==================== Password Hashing (bcryptjs) ====================
const BCRYPT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  const hash = await bcrypt.hash(password, BCRYPT_ROUNDS);
  return hash;
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, storedHash);
  } catch {
    return false;
  }
}

// ==================== Server-side Auth Helpers ====================

interface AuthSession {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    language: string;
    isActive: boolean;
    lastLogin?: string | null;
  };
}

/**
 * Get the current authenticated session from NextAuth.
 * Returns null if not authenticated.
 */
export async function getAuthSession(req?: NextRequest): Promise<AuthSession | null> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return null;
    return session as unknown as AuthSession;
  } catch {
    return null;
  }
}

/**
 * Guard: require authentication + specific role(s).
 * Returns the session if authorized, or a 401/403 NextResponse.
 */
export async function authGuard(
  request: NextRequest,
  allowedRoles?: string[]
): Promise<{ session: AuthSession } | NextResponse> {
  const session = await getAuthSession(request);
  if (!session) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(session.user.role)) {
    return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
  }

  return { session };
}

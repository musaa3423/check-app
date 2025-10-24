// Vercel-compatible authentication system
// This version uses in-memory storage that works on Vercel
// For production, replace with Vercel KV, Postgres, or other database

import { cookies } from 'next/headers';

export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
}

// Simple password hashing (in production, use bcrypt)
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const hash = await hashPassword(password);
  return hash === hashedPassword;
}

interface UserData {
  id: string;
  email: string;
  password: string;
  name?: string;
  phone?: string;
  createdAt: Date;
}

// In-memory storage for Vercel (temporary - will reset on each deployment)
// For persistent storage, use Vercel KV or database
let users: UserData[] = [];

// Initialize with a demo user for testing
if (users.length === 0) {
  hashPassword('demo123').then(hashedPassword => {
    users.push({
      id: 'demo-user-1',
      email: 'demo@check.app',
      password: hashedPassword,
      name: 'Demo User',
      createdAt: new Date(),
    });
  });
}

export async function createUser(email: string, password: string, name?: string, phone?: string): Promise<User | null> {
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return null;
  }

  const hashedPassword = await hashPassword(password);
  const user: UserData = {
    id: Math.random().toString(36).substring(2, 15),
    email,
    password: hashedPassword,
    name,
    phone,
    createdAt: new Date(),
  };

  users.push(user);
  console.log('[Vercel Auth] User created:', email);

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone,
  };
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = users.find(u => u.email === email);
  
  if (!user) {
    console.log('[Vercel Auth] User not found:', email);
    return null;
  }

  const isValid = await verifyPassword(password, user.password);
  
  if (!isValid) {
    console.log('[Vercel Auth] Password verification failed for:', email);
    return null;
  }

  console.log('[Vercel Auth] Authentication successful for:', email);
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone,
  };
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone,
  };
}

// Session management
const SESSION_COOKIE_NAME = 'check_session';

export async function createSession(userId: string): Promise<string> {
  const sessionToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const cookieStore = await cookies();
  
  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify({ userId, token: sessionToken }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return sessionToken;
}

export async function getSession(): Promise<{ userId: string; token: string } | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie) {
    return null;
  }

  try {
    return JSON.parse(sessionCookie.value);
  } catch {
    return null;
  }
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession();
  
  if (!session) {
    return null;
  }

  const user = users.find(u => u.id === session.userId);
  
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone,
  };
}

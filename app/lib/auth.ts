// Simple authentication utilities
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';

export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
}

// Simple password hashing (in production, use bcrypt)
export async function hashPassword(password: string): Promise<string> {
  // Use Web Crypto API for hashing
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

// Simple in-memory database (replace with Prisma in production)
interface UserData {
  id: string;
  email: string;
  password: string;
  name?: string;
  phone?: string;
  createdAt: Date;
}

// File-based storage path
const DATA_DIR = path.join(process.cwd(), 'app', 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Load users from file
function loadUsers(): UserData[] {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf-8');
      const parsedData = JSON.parse(data);
      // Convert date strings back to Date objects
      return parsedData.map((u: any) => ({
        ...u,
        createdAt: new Date(u.createdAt)
      }));
    }
  } catch (error) {
    console.error('Error loading users:', error);
  }
  return [];
}

// Save users to file
function saveUsers(users: UserData[]): void {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving users:', error);
  }
}

// Initialize users from file
let users: UserData[] = loadUsers();

export async function createUser(email: string, password: string, name?: string, phone?: string): Promise<User | null> {
  // Check if user exists
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
  saveUsers(users); // Persist to file

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
    console.log('User not found:', email);
    console.log('Available users:', users.map(u => ({ email: u.email, id: u.id })));
    return null;
  }

  const isValid = await verifyPassword(password, user.password);
  
  if (!isValid) {
    console.log('Password verification failed for:', email);
    return null;
  }

  console.log('Authentication successful for:', email);
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

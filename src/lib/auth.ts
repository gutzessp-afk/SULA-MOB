import type { MockUser } from "./mock-users";

const SESSION_KEY = "sula_mob_user";

export function saveSession(user: MockUser): void {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function getSession(): MockUser | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as MockUser;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export function requireAdmin(): MockUser | null {
  const user = getSession();
  if (!user || user.role !== "admin") return null;
  return user;
}

export function requireOperator(): MockUser | null {
  const user = getSession();
  if (!user || user.role !== "operator") return null;
  return user;
}

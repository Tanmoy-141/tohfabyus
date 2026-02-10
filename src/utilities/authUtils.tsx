/**
 * Authentication utility functions and types
 */

// User type definition
export interface User {
  id: string;
  email?: string;
  phone?: string;
  username?: string;
  displayName: string;
  createdAt: string;
}

/**
 * Generates a unique UUID for user identification
 */
export function generateUUID(): string {
  // Modern browsers support crypto.randomUUID()
  if (crypto && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback UUID v4 generator
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Generates a unique username from an identifier
 */
export function generateUsername(identifier: string): string {
  let base = identifier;

  // Extract base from email
  if (identifier.includes("@")) {
    base = identifier.split("@")[0];
  }

  // Clean and limit length
  base = base.replace(/[^a-zA-Z0-9]/g, "").substring(0, 12);

  // Add random suffix
  const randomSuffix = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

  return `${base}${randomSuffix}`;
}

/**
 * Formats a display name from an identifier
 */
export function formatDisplayName(identifier: string): string {
  if (identifier.includes("@")) {
    // Extract name from email
    const name = identifier.split("@")[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  if (/^\+?[\d\s-()]+$/.test(identifier)) {
    // Phone number - return "User" + last 4 digits
    const digits = identifier.replace(/\D/g, "");
    return `User${digits.slice(-4)}`;
  }

  // Username - capitalize first letter
  return identifier.charAt(0).toUpperCase() + identifier.slice(1);
}

/**
 * Validates if an identifier is in correct format (email, phone, or username)
 */
export function isValidIdentifier(identifier: string): boolean {
  if (!identifier || identifier.trim().length === 0) {
    return false;
  }

  const trimmed = identifier.trim();

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(trimmed)) {
    return true;
  }

  // Phone validation (basic - at least 10 digits)
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  if (phoneRegex.test(trimmed)) {
    return true;
  }

  // Username validation (3-20 alphanumeric + underscore)
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  if (usernameRegex.test(trimmed)) {
    return true;
  }

  return false;
}

/**
 * Determines the type of identifier (email, phone, or username)
 */
export function getIdentifierType(
  identifier: string,
): "email" | "phone" | "username" | "invalid" {
  const trimmed = identifier.trim();

  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return "email";
  }

  if (/^\+?[\d\s-()]{10,}$/.test(trimmed)) {
    return "phone";
  }

  if (/^[a-zA-Z0-9_]{3,20}$/.test(trimmed)) {
    return "username";
  }

  return "invalid";
}

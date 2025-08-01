/**
 * Security-focused validation utilities
 */
import { z } from 'zod';

// Email validation with stricter rules
export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email.trim()) && email.length <= 254;
};

// Password validation with strength requirements
export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!password || typeof password !== 'string') {
    errors.push('Passwort ist erforderlich');
    return { isValid: false, errors };
  }
  
  if (password.length < 8) {
    errors.push('Passwort muss mindestens 8 Zeichen lang sein');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Passwort muss mindestens einen Großbuchstaben enthalten');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Passwort muss mindestens einen Kleinbuchstaben enthalten');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Passwort muss mindestens eine Zahl enthalten');
  }
  
  if (password.length > 128) {
    errors.push('Passwort darf nicht länger als 128 Zeichen sein');
  }
  
  return { isValid: errors.length === 0, errors };
};

// Input sanitization
export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential XSS characters
    .substring(0, 1000); // Limit length
};

// Name validation (for first/last names)
export const validateName = (name: string): boolean => {
  if (!name || typeof name !== 'string') return false;
  
  const trimmed = name.trim();
  return trimmed.length >= 1 && 
         trimmed.length <= 50 && 
         /^[a-zA-ZÄÖÜäöüß\s\-']+$/.test(trimmed);
};

// Rate limiting helper (simple client-side rate limiting)
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  
  isAllowed(key: string, maxAttempts: number, windowMs: number): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    
    // Remove old attempts outside the window
    const validAttempts = attempts.filter(time => now - time < windowMs);
    
    if (validAttempts.length >= maxAttempts) {
      return false;
    }
    
    // Add current attempt
    validAttempts.push(now);
    this.attempts.set(key, validAttempts);
    
    return true;
  }
  
  reset(key: string): void {
    this.attempts.delete(key);
  }
}

// Job validation schema
export const jobSchema = z.object({
  title: z.string().min(1, 'Titel ist erforderlich').max(100, 'Titel zu lang'),
  description: z.string().optional(),
  category: z.string().min(1, 'Kategorie ist erforderlich'),
  job_type: z.enum(['good_deeds', 'kein_bock'], {
    errorMap: () => ({ message: 'Ungültiger Job-Typ' })
  }),
  budget: z.number().min(0).optional(),
  karma_reward: z.number().min(0).optional(),
  location: z.string().min(1, 'Standort ist erforderlich'),
  estimated_duration: z.number().min(1).optional(),
  due_date: z.string().optional(),
  requirements: z.array(z.string()).optional(),
});

// Create a global rate limiter instance
export const authRateLimiter = new RateLimiter();
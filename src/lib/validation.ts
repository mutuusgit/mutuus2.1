
import { z } from 'zod';

// Password validation schema
export const passwordSchema = z
  .string()
  .min(8, 'Passwort muss mindestens 8 Zeichen lang sein')
  .regex(/[A-Z]/, 'Passwort muss mindestens einen Großbuchstaben enthalten')
  .regex(/[a-z]/, 'Passwort muss mindestens einen Kleinbuchstaben enthalten')
  .regex(/[0-9]/, 'Passwort muss mindestens eine Zahl enthalten')
  .regex(/[^A-Za-z0-9]/, 'Passwort muss mindestens ein Sonderzeichen enthalten');

// Email validation schema
export const emailSchema = z
  .string()
  .email('Ungültige E-Mail-Adresse')
  .max(254, 'E-Mail-Adresse zu lang')
  .transform(email => email.toLowerCase().trim());

// Sign in validation
export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Passwort ist erforderlich'),
});

// Sign up validation
export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  firstName: z.string()
    .max(50, 'Vorname zu lang')
    .regex(/^[a-zA-ZäöüÄÖÜß\s-']+$/, 'Vorname enthält ungültige Zeichen')
    .transform(name => name.trim()),
  lastName: z.string()
    .max(50, 'Nachname zu lang')
    .regex(/^[a-zA-ZäöüÄÖÜß\s-']+$/, 'Nachname enthält ungültige Zeichen')
    .transform(name => name.trim()),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwörter stimmen nicht überein',
  path: ['confirmPassword'],
});

// Job validation schema
export const jobSchema = z.object({
  title: z.string()
    .min(5, 'Titel muss mindestens 5 Zeichen lang sein')
    .max(100, 'Titel zu lang')
    .transform(title => title.trim()),
  description: z.string()
    .max(2000, 'Beschreibung zu lang')
    .optional()
    .transform(desc => desc?.trim()),
  category: z.string()
    .min(1, 'Kategorie ist erforderlich')
    .max(50, 'Kategorie zu lang')
    .transform(cat => cat.trim()),
  job_type: z.enum(['good_deeds', 'kein_bock'], {
    errorMap: () => ({ message: 'Ungültiger Job-Typ' })
  }),
  budget: z.number()
    .min(0, 'Budget kann nicht negativ sein')
    .max(10000, 'Budget zu hoch')
    .optional(),
  karma_reward: z.number()
    .min(0, 'Karma-Belohnung kann nicht negativ sein')
    .max(1000, 'Karma-Belohnung zu hoch')
    .optional(),
  location: z.string()
    .min(1, 'Standort ist erforderlich')
    .max(100, 'Standort zu lang')
    .transform(loc => loc.trim()),
  estimated_duration: z.number()
    .min(1, 'Geschätzte Dauer muss mindestens 1 Minute betragen')
    .max(10080, 'Geschätzte Dauer zu lang (max. 1 Woche)')
    .optional(),
  due_date: z.string().optional(),
  requirements: z.array(z.string().max(200, 'Anforderung zu lang')).optional(),
});

// Input sanitization function
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+=/gi, '') // Remove event handlers
    .substring(0, 1000); // Limit length
};

// Rate limiter implementation
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private storage = new Map<string, RateLimitEntry>();

  isAllowed(key: string, maxAttempts: number, windowMs: number): boolean {
    const now = Date.now();
    const entry = this.storage.get(key);

    // Clean up expired entries
    if (entry && now > entry.resetTime) {
      this.storage.delete(key);
    }

    const currentEntry = this.storage.get(key);
    
    if (!currentEntry) {
      // First attempt
      this.storage.set(key, {
        count: 1,
        resetTime: now + windowMs
      });
      return true;
    }

    if (currentEntry.count >= maxAttempts) {
      return false;
    }

    // Increment counter
    currentEntry.count++;
    return true;
  }

  getRemainingTime(key: string): number {
    const entry = this.storage.get(key);
    if (!entry) return 0;
    
    const remaining = entry.resetTime - Date.now();
    return Math.max(0, remaining);
  }

  // Clean up old entries periodically
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.storage.entries()) {
      if (now > entry.resetTime) {
        this.storage.delete(key);
      }
    }
  }
}

export const rateLimiter = new RateLimiter();

// Cleanup every 5 minutes
setInterval(() => {
  rateLimiter.cleanup();
}, 5 * 60 * 1000);

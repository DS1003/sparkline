import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes with clsx */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format a phone number for tel: links */
export function formatPhoneHref(phone: string) {
  return `tel:${phone.replace(/\s/g, '')}`
}

/** Format an email for mailto: links */
export function formatEmailHref(email: string) {
  return `mailto:${email}`
}

/** Split text into words wrapped in spans for animation */
export function splitWords(text: string): string[] {
  return text.split(' ').filter(Boolean)
}

/** Split text into characters wrapped in spans for animation */
export function splitChars(text: string): string[] {
  return text.split('')
}

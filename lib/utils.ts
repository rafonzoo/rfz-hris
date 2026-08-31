import type { ClassValue } from 'clsx'
import type { ErrorCode } from '@/lib/enum'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createResponseError<T = null>(code: ErrorCode, data?: T) {
  return { data: data || null, error: { code, message: '' } }
}

export function createResponseSuccess<T = object>(data: T) {
  return { data, error: null }
}

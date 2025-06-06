import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'react-toastify';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

export function handleError(error: unknown, message: string = 'Une erreur est survenue') {
  console.error(error);
  toast.error(message);
}

export function handleSuccess(message: string) {
  toast.success(message);
}
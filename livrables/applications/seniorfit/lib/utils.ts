import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAge(dateOfBirth: string): number {
  const birth = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

export function calculateBMI(heightCm: number, weightKg: number): number {
  return weightKg / Math.pow(heightCm / 100, 2);
}

export function bmiCategory(bmi: number): { label: string; badgeClass: string } {
  if (bmi < 21)  return { label: 'Maigreur', badgeClass: 'badge badge-amber' };
  if (bmi < 25)  return { label: 'Normal',   badgeClass: 'badge badge-green' };
  if (bmi < 30)  return { label: 'Surpoids', badgeClass: 'badge badge-amber' };
  return { label: 'Obésité', badgeClass: 'badge badge-red' };
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('fr-BE', {
    day: '2-digit', month: 'long', year: 'numeric',
  }).format(new Date(iso));
}

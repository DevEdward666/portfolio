import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateRange(
  startDate: Date | string,
  endDate: Date | string | null,
  current: boolean
): string {
  const start = new Date(startDate)
  const startStr = start.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

  if (current) return `${startStr} — Present`
  if (!endDate) return startStr

  const end = new Date(endDate)
  const endStr = end.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  return `${startStr} — ${endStr}`
}

export function formatYearRange(
  startYear: number,
  endYear: number | null,
  current: boolean
): string {
  if (current) return `${startYear} — Present`
  if (!endYear) return String(startYear)
  return `${startYear} — ${endYear}`
}
export interface Experience {
  startDate: string | Date
  endDate: string | Date | null
  current: boolean
  company: string
}

export function calculateYearsOfExperience(experiences: Experience[]): number {
  if (!experiences || experiences.length === 0) return 0

  const now = new Date()
  const allDates: Date[] = []

  experiences.forEach((exp) => {
    const startDate = new Date(exp.startDate)
    allDates.push(startDate)

    if (exp.endDate) {
      allDates.push(new Date(exp.endDate))
    } else if (exp.current) {
      allDates.push(now)
    }
  })

  if (allDates.length === 0) return 0

  const earliest = new Date(Math.min(...allDates.map((d) => d.getTime())))
  const latest = new Date(Math.max(...allDates.map((d) => d.getTime())))

  const diffMs = latest.getTime() - earliest.getTime()
  const diffYears = diffMs / (1000 * 60 * 60 * 24 * 365.25)

  return Math.floor(diffYears)
}

export function countUniqueCompanies(experiences: Experience[]): number {
  if (!experiences || experiences.length === 0) return 0
  const companies = new Set(experiences.map((exp) => exp.company))
  return companies.size
}
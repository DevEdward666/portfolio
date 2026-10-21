import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  /** Show the name beside the monogram */
  showWordmark?: boolean
  /** Colour of the wordmark text */
  tone?: 'light' | 'dark'
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 72" className={className} aria-hidden="true">
      <path
        d="M4 4h56v36c0 16-14 26-28 30C18 66 4 56 4 40V4z"
        fill="#0A0A0A"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M4 4h56v10H4z" fill="#DA291C" />
      <g fill="#FFFFFF">
        <path d="M14 24h3.5v28H14zM14 24h10v3.5H14zM14 36.25h8v3.5h-8zM14 48.5h10V52H14z" />
        <path d="M33.5 24H37v22.5h-3.5zM29 24h8v3.5h-8zM27 48.5h10V52H27zM27 44h3.5v8H27z" />
        <path d="M40 24h3.5v28H40zM40 24h10v3.5H40zM40 36.25h8v3.5h-8z" />
      </g>
    </svg>
  )
}

export default function Logo({ className, showWordmark = true, tone = 'light' }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <LogoMark className="h-10 w-auto shrink-0" />
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              'font-display text-[15px] font-extrabold uppercase tracking-[0.14em]',
              tone === 'light' ? 'text-white' : 'text-ink'
            )}
          >
            Edward Fernandez
          </span>
          <span
            className={cn(
              'mt-1 text-[10px] font-medium uppercase tracking-[0.3em]',
              tone === 'light' ? 'text-white/60' : 'text-ink/60'
            )}
          >
            Software Developer
          </span>
        </span>
      )}
    </span>
  )
}

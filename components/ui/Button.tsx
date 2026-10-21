import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, children, className, disabled, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 font-bold uppercase tracking-caps transition-colors duration-200'

    const variants = {
      primary: 'bg-rosso text-white hover:bg-ink',
      secondary: 'border border-ink text-ink hover:bg-ink hover:text-white',
      ghost: 'text-ink hover:text-rosso',
    }

    const sizes = {
      sm: 'min-h-[40px] px-5 text-xs',
      md: 'min-h-[52px] px-8 text-[13px]',
      lg: 'min-h-[60px] px-10 text-sm',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], disabled && 'cursor-not-allowed opacity-50', className)}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="animate-spin" aria-hidden="true">
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
              <path d="M7 1.5a5.5 5.5 0 015.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button

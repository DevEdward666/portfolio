import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, children, className, disabled, ...props }, ref) => {
    const base = 'relative inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 active:scale-95 overflow-hidden rounded-xl'

    const variants = {
      primary:
        'text-white hover:opacity-90',
      secondary:
        'border border-surface-border text-text-primary hover:bg-white/5 hover:border-white/20',
      ghost:
        'text-text-secondary hover:text-text-primary hover:bg-white/5',
    }

    const sizes = {
      sm: 'text-xs px-4 py-2',
      md: 'text-sm px-6 py-3',
      lg: 'text-base px-8 py-4',
    }

    const primaryStyle =
      variant === 'primary'
        ? { background: 'linear-gradient(135deg, #4F8EF7 0%, #7B6BD4 100%)' }
        : {}

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        style={primaryStyle}
        className={cn(base, variants[variant], sizes[size], disabled && 'opacity-50 cursor-not-allowed', className)}
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
          <>
            {children}
            {variant === 'primary' && (
              <span className="absolute inset-0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
            )}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button

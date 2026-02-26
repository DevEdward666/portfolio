import type { User } from '@prisma/client'

interface FooterProps {
  user: User | null
}

export default function Footer({ user }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { label: 'About', href: '#background' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

  const socialLinks = [
    { label: 'GitHub', href: user?.githubUrl ?? 'https://github.com' },
    { label: 'LinkedIn', href: user?.linkedinUrl ?? 'https://linkedin.com' },
    { label: 'Twitter', href: user?.twitterUrl ?? 'https://twitter.com' },
  ]

  return (
    <footer
      className="relative border-t border-surface-border py-12 overflow-hidden"
      role="contentinfo"
      aria-label="Footer"
    >
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.4), transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-sm text-white"
              style={{ fontFamily: "'Syne', sans-serif", background: 'linear-gradient(135deg, #4F8EF7, #9B7FD4)' }}
              aria-hidden="true"
            >
              A
            </div>
            <span className="font-display font-semibold text-text-primary text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>
              {user?.name ?? 'Edward Joseph Fernandez'}
            </span>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-6" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-text-tertiary hover:text-text-secondary transition-colors duration-200"
                aria-label={link.label}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="text-xs font-mono text-text-tertiary">
            © {currentYear} {user?.name ?? 'Edward Joseph Fernandez'}. All rights reserved.
          </p>
          <p className="text-xs font-mono text-text-tertiary flex items-center gap-1.5">
            Built with
            <span className="text-accent-blue">Next.js</span>
            <span className="text-text-tertiary">·</span>
            <span className="text-accent-violet">TypeScript</span>
            <span className="text-text-tertiary">·</span>
            <span className="text-accent-blue">Tailwind</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

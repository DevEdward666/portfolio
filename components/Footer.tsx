import type { User } from '@prisma/client'
import Logo from '@/components/ui/Logo'

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
    <footer className="surface-dark border-t-[3px] border-accent" role="contentinfo" aria-label="Footer">
      <div className="page-width py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-6 text-sm text-mute-dark">
              {user?.name ?? 'Edward Joseph Fernandez'}
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="space-y-4" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[13px] font-bold uppercase tracking-caps text-white transition-colors hover:text-accent-bright"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social links */}
          <ul className="space-y-4" role="list">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-bold uppercase tracking-caps text-white transition-colors hover:text-accent-bright"
                  aria-label={link.label}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-line-dark pt-6 text-xs text-mute-dark sm:flex-row">
          <p>
            © {currentYear} {user?.name ?? 'Edward Joseph Fernandez'}. All rights reserved.
          </p>
          <p>Built with Next.js · TypeScript · Tailwind</p>
        </div>
      </div>
    </footer>
  )
}

import { formatYearRange } from '@/lib/utils'
import type { Education, Certification } from '@/types'
import Reveal from '@/components/ui/Reveal'
import ScrambleText from '@/components/ui/ScrambleText'

interface BackgroundSectionProps {
  education: Education[]
  certifications: Certification[]
}

export default function BackgroundSection({ education, certifications }: BackgroundSectionProps) {
  return (
    <section id="background" className="surface-light section-pad" aria-label="Background and Education">
      <div className="page-width">
        <header className="mb-16 md:mb-20">
          <Reveal variant="fade">
            <p className="eyebrow">
              <ScrambleText text="Background" />
            </p>
          </Reveal>
          <Reveal variant="mask" delay={0.1}>
            <h2 className="heading-lg max-w-[18ch]">Education &amp; Credentials</h2>
          </Reveal>
        </header>

        {/* Education */}
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
          {education.map((edu, i) => (
            <Reveal key={edu.id} delay={i * 0.15}>
              <EducationItem edu={edu} />
            </Reveal>
          ))}
        </div>

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="mt-24 md:mt-32">
            <Reveal variant="mask">
              <h3 className="heading-md mb-8">Certifications</h3>
            </Reveal>
            <ul className="border-t border-ink" role="list">
              {certifications.map((cert, i) => (
                <li key={cert.id} className="border-b border-line">
                  <Reveal delay={i * 0.07}>
                    <CertificationRow cert={cert} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

function EducationItem({ edu }: { edu: Education }) {
  return (
    <article>
      <div className="rule-grow h-[3px] bg-rosso" aria-hidden="true" />
      <p className="mt-6 font-display text-sm font-bold uppercase tracking-caps text-rosso">
        {formatYearRange(edu.startYear, edu.endYear, edu.current)}
      </p>

      <h3 className="heading-md mt-4">{edu.institution}</h3>
      <p className="mt-3 text-base text-mute">{edu.degree}</p>
      <p className="mt-1 text-base font-bold">{edu.field}</p>

      {edu.description && (
        <p className="mt-5 max-w-[56ch] text-base leading-relaxed text-mute">{edu.description}</p>
      )}

      {edu.gpa && (
        <p className="tag mt-5 border-ink">GPA: {edu.gpa}</p>
      )}
    </article>
  )
}

function CertificationRow({ cert }: { cert: Certification }) {
  const content = (
    <div className="group relative flex items-center justify-between gap-6 py-5 md:py-6">
      <span
        className="absolute left-0 top-1/2 h-[3px] w-0 -translate-y-1/2 bg-rosso transition-all duration-300 group-hover:w-5"
        aria-hidden="true"
      />
      <div className="min-w-0 transition-transform duration-300 group-hover:translate-x-9">
        <p className="text-base font-bold md:text-lg">{cert.name}</p>
        <p className="mt-1 text-sm text-mute">
          {cert.issuer} · {cert.year}
        </p>
      </div>
      {cert.credentialUrl && (
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center border border-ink transition-colors group-hover:border-rosso group-hover:bg-rosso group-hover:text-white"
          aria-hidden="true"
        >
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
            <path d="M1 11L11 1M11 1H5M11 1v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </div>
  )

  if (cert.credentialUrl) {
    return (
      <a
        href={cert.credentialUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${cert.name} credential`}
        className="block"
      >
        {content}
      </a>
    )
  }
  return content
}

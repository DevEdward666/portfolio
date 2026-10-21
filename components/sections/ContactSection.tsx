'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactSchema } from '@/lib/validations'
import Reveal from '@/components/ui/Reveal'
import ScrambleText from '@/components/ui/ScrambleText'

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactSchema) => {
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (json.success) {
        setStatus('success')
        reset()
      } else {
        throw new Error(json.message ?? 'Something went wrong')
      }
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send message. Please try again.')
    }
  }

  return (
    <section id="contact" className="surface-soft section-pad" aria-label="Contact">
      <div className="page-width">
        <div className="grid items-start gap-14 md:grid-cols-2 lg:gap-24">
          {/* Left column */}
          <div>
            <Reveal variant="fade">
              <p className="eyebrow">
                <ScrambleText text="Let's Connect" />
              </p>
            </Reveal>
            <Reveal variant="mask" delay={0.1}>
              <h2 className="heading-lg mb-8">Have a project in mind?</h2>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mb-12 max-w-[52ch] text-base leading-relaxed text-mute">
                I&#39;m always open to discussing new opportunities, creative projects, or how we can build something great together. Drop me a message — I typically reply within 24 hours.
              </p>
            </Reveal>

            <dl className="border-t border-ink">
              {[
                {
                  label: 'Email',
                  value: 'edwardjosephfernandez@gmail.com',
                  href: 'mailto:edwardjosephfernandez@gmail.com',
                },
                {
                  label: 'Location',
                  value: 'Davao City, Philippines',
                  href: null,
                },
                {
                  label: 'Availability',
                  value: 'Open to opportunities',
                  href: null,
                },
              ].map((item) => (
                <div key={item.label} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[9rem_1fr]">
                  <dt className="text-xs font-bold uppercase tracking-caps text-mute">{item.label}</dt>
                  <dd className="text-base font-semibold">
                    {item.href ? (
                      <a href={item.href} className="break-all transition-colors hover:text-accent">
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right column — form */}
          <Reveal delay={0.2}>
            {status === 'success' ? (
              <SuccessState onReset={() => setStatus('idle')} />
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8 bg-paper p-8 md:p-10"
                noValidate
                aria-label="Contact form"
              >
                <div className="grid gap-8 sm:grid-cols-2">
                  <FormField
                    label="Name"
                    id="name"
                    placeholder="Jane Smith"
                    error={errors.name?.message}
                    registration={register('name')}
                  />
                  <FormField
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="jane@example.com"
                    error={errors.email?.message}
                    registration={register('email')}
                  />
                </div>

                <FormField
                  label="Subject"
                  id="subject"
                  placeholder="Project inquiry, collaboration..."
                  error={errors.subject?.message}
                  registration={register('subject')}
                />

                <div className="flex flex-col gap-1">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-caps">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="field resize-none placeholder:text-mute"
                    style={errors.message ? { borderBottomColor: '#C8261B' } : undefined}
                    {...register('message')}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-sm font-semibold text-error" role="alert">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {status === 'error' && (
                  <p className="border-l-4 border-error bg-error/10 px-4 py-3 text-sm font-semibold" role="alert">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn btn-primary-on-light w-full disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label={status === 'loading' ? 'Sending message...' : 'Send message'}
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center gap-2">
                      <LoadingSpinner />
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function FormField({
  label,
  id,
  type = 'text',
  placeholder,
  error,
  registration,
}: {
  label: string
  id: string
  type?: string
  placeholder: string
  error?: string
  registration: ReturnType<ReturnType<typeof useForm>['register']>
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-caps">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="field placeholder:text-mute"
        style={error ? { borderBottomColor: '#C8261B' } : undefined}
        {...registration}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm font-semibold text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="border-t-[3px] border-accent bg-paper p-10 md:p-12" role="status">
      <h3 className="heading-md mb-3">Message Sent!</h3>
      <p className="mb-8 text-base text-mute">
        Thanks for reaching out. I&#39;ll get back to you within 24 hours.
      </p>
      <button onClick={onReset} className="btn btn-outline-dark">
        Send another message
      </button>
    </div>
  )
}

function LoadingSpinner() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="animate-spin" aria-hidden="true">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
      <path d="M7 1.5a5.5 5.5 0 015.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

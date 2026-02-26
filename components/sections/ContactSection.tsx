'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactSchema } from '@/lib/validations'

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
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
    <section
      ref={ref}
      id="contact"
      className="relative py-28 md:py-36 overflow-hidden"
      aria-label="Contact"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(79,142,247,0.07), transparent)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label mb-3">Let&#39;s Connect</p>
            <h2
              className="font-display font-bold text-text-primary mb-6"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                letterSpacing: '-0.03em',
              }}
            >
              Have a project{' '}
              <span className="gradient-text-blue">in mind?</span>
            </h2>
            <p className="text-text-secondary leading-relaxed mb-10 text-[0.95rem]">
              I&#39;m always open to discussing new opportunities, creative projects, or how we can build something great together. Drop me a message — I typically reply within 24 hours.
            </p>

            {/* Contact info */}
            <div className="space-y-4">
              {[
                {
                  label: 'Email',
                  value: 'edwardjosephfernandez@gmail.com',
                  href: 'mailto:edwardjosephfernandez@gmail.com',
                  icon: <EmailIcon />,
                },
                {
                  label: 'Location',
                  value: 'Davao City, Philippines',
                  href: null,
                  icon: <LocationIcon />,
                },
                {
                  label: 'Availability',
                  value: 'Open to opportunities',
                  href: null,
                  icon: <CalendarIcon />,
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(79,142,247,0.1)', border: '1px solid rgba(79,142,247,0.2)' }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-text-tertiary mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-text-primary text-sm hover:text-accent-blue transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-text-secondary text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <SuccessState key="success" onReset={() => setStatus('idle')} />
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="glass-card rounded-2xl p-7 space-y-5"
                  noValidate
                  aria-label="Contact form"
                >
                  {/* Name + Email row */}
                  <div className="grid sm:grid-cols-2 gap-4">
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

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs font-mono uppercase tracking-widest text-text-secondary">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="w-full rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-tertiary resize-none outline-none transition-all duration-200 focus:border-accent-blue/50"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: errors.message ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.08)',
                      }}
                      {...register('message')}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-xs text-red-400" role="alert">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Error state */}
                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-400 px-4 py-3 rounded-xl"
                      style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
                      role="alert"
                    >
                      {errorMsg}
                    </motion.p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-3.5 rounded-xl font-medium text-sm text-white relative overflow-hidden transition-all duration-300 hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: 'linear-gradient(135deg, #4F8EF7 0%, #7B6BD4 100%)' }}
                    aria-label={status === 'loading' ? 'Sending message...' : 'Send message'}
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center justify-center gap-2">
                        <LoadingSpinner />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Send Message
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <path d="M1 7l12-6-6 12-2-5-4-1z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    )}
                    <span className="absolute inset-0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
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
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-mono uppercase tracking-widest text-text-secondary">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-tertiary outline-none transition-all duration-200"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: error ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.08)',
        }}
        {...registration}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-400" role="alert">{error}</p>
      )}
    </div>
  )
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      className="glass-card rounded-2xl p-10 text-center"
    >
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, rgba(74,222,128,0.2), rgba(79,142,247,0.2))', border: '1px solid rgba(74,222,128,0.3)' }}
        aria-hidden="true"
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <motion.path
            d="M5 14l6 6L23 8"
            stroke="#4ade80"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          />
        </svg>
      </motion.div>
      <h3
        className="font-display font-bold text-text-primary text-2xl mb-2"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        Message Sent!
      </h3>
      <p className="text-text-secondary text-sm mb-8">
        Thanks for reaching out. I&#39;ll get back to you within 24 hours.
      </p>
      <button
        onClick={onReset}
        className="px-6 py-2.5 rounded-xl text-sm border border-surface-border text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 transition-all duration-200"
      >
        Send another message
      </button>
    </motion.div>
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

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4F8EF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4F8EF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4F8EF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}

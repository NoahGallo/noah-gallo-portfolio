/**
 * ContactSection — editorial two-column layout: left rail is a typographic
 * profile (email / location / availability) plus mono text social links;
 * right column is an underline-only form that opens the user's mail client
 * via a `mailto:` link prefilled with the form contents.
 */
import type { FormEvent, ChangeEvent } from 'react'
import { useState } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

interface InfoRow {
  label: string
  value: string
  href?: string
}

const INFO_ROWS: InfoRow[] = [
  { label: 'Email', value: 'gallo.noah@gmail.com', href: 'mailto:gallo.noah@gmail.com' },
  { label: 'Location', value: 'Mersch, Luxembourg' },
  { label: 'Availability', value: 'Open to Switzerland · Devoteam consultant' },
]

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/noahgallo' },
  { label: 'GitHub', href: 'https://github.com/NoahGallo' },
  { label: 'Email', href: 'mailto:gallo.noah@gmail.com' },
] as const

export function ContactSection() {
  const { ref: headerRef, isVisible: headerVisible } = useIntersectionObserver()
  const { ref: contentRef, isVisible: contentVisible } = useIntersectionObserver()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const body = `Hello Noah,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    window.location.href = `mailto:gallo.noah@gmail.com?subject=${encodeURIComponent(
      formData.subject,
    )}&body=${encodeURIComponent(body)}`
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const reveal = (visible: boolean, extra = '') =>
    `transition-all duration-700 ease-out ${extra} ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
    }`

  return (
    <section id="contact" className="py-24 bg-surface-2">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className={reveal(headerVisible, 'mb-16')}>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
            07 · Contact
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink">
            Let's talk.
          </h2>
          <p className="text-muted mt-4 max-w-2xl">
            Open to senior cloud / platform engineering roles in Switzerland, and to short
            consulting conversations. The fastest reply is over email.
          </p>
        </div>

        <div
          ref={contentRef}
          className={reveal(contentVisible, 'grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20')}
        >
          {/* Left: profile + socials */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-5">
              Contact
            </p>
            <dl className="divide-y divide-edge">
              {INFO_ROWS.map((row) => (
                <div
                  key={row.label}
                  className="py-4 first:pt-0 grid grid-cols-[120px_1fr] gap-4 items-baseline"
                >
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                    {row.label}
                  </dt>
                  <dd className="text-ink">
                    {row.href ? (
                      <a
                        href={row.href}
                        className="focus-ring hover:text-accent transition-colors rounded-sm"
                      >
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-5">
                Elsewhere
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-wider">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="focus-ring text-muted hover:text-accent transition-colors rounded-sm"
                  >
                    {social.label}&nbsp;↗
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              id="name"
              label="Name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
            />
            <FormField
              id="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
            />
            <FormField
              id="subject"
              label="Subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What's this about?"
            />

            <div>
              <label
                htmlFor="message"
                className="block font-mono text-xs uppercase tracking-wider text-muted mb-3"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="focus-ring w-full bg-transparent border-0 border-b border-edge text-ink py-3 px-0 focus:border-accent transition-colors duration-200 resize-none placeholder:text-muted/60"
                placeholder="Tell me about the role, the project, or just say hi."
              />
            </div>

            <button
              type="submit"
              className="focus-ring inline-flex items-center gap-3 border border-accent text-accent hover:bg-accent hover:text-canvas px-6 py-3 rounded-md font-mono text-xs uppercase tracking-wider transition-colors duration-200"
            >
              Send Message
              <span aria-hidden="true">→</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

interface FormFieldProps {
  id: string
  label: string
  type: 'text' | 'email'
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}

function FormField({ id, label, type, value, onChange, placeholder }: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-mono text-xs uppercase tracking-wider text-muted mb-3"
      >
        {label} *
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className="focus-ring w-full bg-transparent border-0 border-b border-edge text-ink py-3 px-0 focus:border-accent transition-colors duration-200 placeholder:text-muted/60"
      />
    </div>
  )
}

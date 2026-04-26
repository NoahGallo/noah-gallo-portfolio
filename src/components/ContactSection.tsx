/**
 * ContactSection — left column shows contact details + social links;
 * right column is a "send a message" form that opens the user's email
 * client via a `mailto:` link prefilled with the form contents.
 */
import { Mail, Phone, MapPin, Linkedin, Github, Send } from 'lucide-react'
import type { ReactNode, FormEvent, ChangeEvent } from 'react'
import { useState } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

type ContactColor = 'blue' | 'green' | 'purple'

const ICON_BG: Record<ContactColor, string> = {
  blue: 'bg-blue-100 dark:bg-blue-900/30',
  green: 'bg-green-100 dark:bg-green-900/30',
  purple: 'bg-purple-100 dark:bg-purple-900/30',
}

const ICON_FG: Record<ContactColor, string> = {
  blue: 'text-blue-600 dark:text-blue-400',
  green: 'text-green-600 dark:text-green-400',
  purple: 'text-purple-600 dark:text-purple-400',
}

interface ContactItem {
  icon: typeof Mail
  title: string
  content: string
  href?: string
  color: ContactColor
}

const CONTACT_ITEMS: ContactItem[] = [
  { icon: Mail, title: 'Email', content: 'gallo.noah@gmail.com', href: 'mailto:gallo.noah@gmail.com', color: 'blue' },
  { icon: MapPin, title: 'Location', content: 'Mersch, Luxembourg', color: 'green' },
  { icon: Phone, title: 'Availability', content: 'Open to new opportunities', color: 'purple' },
]

interface SocialItem {
  href: string
  icon: ReactNode
  className: string
  label: string
}

const SOCIALS: SocialItem[] = [
  {
    href: 'https://linkedin.com/in/noahgallo',
    icon: <Linkedin size={24} />,
    className: 'bg-blue-600 hover:bg-blue-700',
    label: 'LinkedIn',
  },
  {
    href: 'https://github.com/NoahGallo',
    icon: <Github size={24} />,
    className: 'bg-gray-800 hover:bg-gray-900',
    label: 'GitHub',
  },
]

export function ContactSection() {
  const { ref: titleRef, isVisible: titleVisible } = useIntersectionObserver()
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

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ready to discuss cloud infrastructure, DevOps automation, or potential opportunities?
            I'd love to hear from you!
          </p>
        </div>

        <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact info */}
          <div
            className={`transition-all duration-700 ease-out ${
              contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
            }`}
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
              Contact Information
            </h3>

            <div className="space-y-6">
              {CONTACT_ITEMS.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="flex items-center gap-4 group">
                    <div
                      className={`${ICON_BG[item.color]} p-3 rounded-lg group-hover:scale-110 transition-transform duration-200`}
                    >
                      <Icon className={ICON_FG[item.color]} size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-blue-600 dark:text-blue-400 hover:underline transition-colors"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Connect With Me</h4>
              <div className="flex gap-4">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`focus-ring ${social.className} text-white p-3 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-md hover:-translate-y-0.5`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div
            className={`transition-all duration-700 ease-out ${
              contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
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
                    className="focus-ring w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 transition-colors duration-200 resize-none"
                    placeholder="Tell me about your project, opportunity, or just say hello!"
                  />
                </div>

                <button
                  type="submit"
                  className="focus-ring w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-md group"
                >
                  <Send size={20} className="group-hover:translate-x-0.5 transition-transform" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
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
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
        className="focus-ring w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 transition-colors duration-200"
      />
    </div>
  )
}

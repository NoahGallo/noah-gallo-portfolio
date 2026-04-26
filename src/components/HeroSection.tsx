/**
 * HeroSection — top-of-page intro: profile photo, name, role, tech pills,
 * CTA buttons (download CV / view projects), and social links.
 *
 * Reveal animations use a simple transition pattern: each block starts at
 * `opacity-0 translate-y-6` and animates to `opacity-100 translate-y-0`
 * once `isVisible` is true. Stagger is applied via inline `transitionDelay`.
 */
import { Github, Linkedin, Mail, Download } from 'lucide-react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const TECH_STACK = [
  'Azure', 'AWS', 'Google Cloud', 'Kubernetes', 'Terraform',
  'Ansible', 'Azure DevOps', 'Jenkins', 'Docker', 'Python',
  'CI/CD', 'Prometheus', 'Grafana', 'Linux',
] as const

const SOCIAL_LINKS = [
  { href: 'https://github.com/NoahGallo', icon: Github, label: 'GitHub', external: true },
  { href: 'https://linkedin.com/in/noahgallo', icon: Linkedin, label: 'LinkedIn', external: true },
  { href: 'mailto:gallo.noah@gmail.com', icon: Mail, label: 'Email', external: false },
] as const

export function HeroSection() {
  const { ref: heroRef, isVisible } = useIntersectionObserver()

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const downloadCV = () => {
    const link = document.createElement('a')
    link.href = '/resume/noah-gallo-cv.pdf'
    link.download = 'Noah_Gallo_CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Shorthand for the scroll-reveal classes; consistent across the section.
  const revealCls = (extra = '') =>
    `transition-all duration-700 ease-out ${extra} ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
    }`

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-20"
    >
      {/* Profile photo */}
      <div
        className={revealCls('w-40 h-40 rounded-full mb-8 overflow-hidden shadow-2xl ring-4 ring-blue-200 dark:ring-blue-800')}
      >
        <img
          src="/images/noah-website-pic.jpg"
          alt="Noah Gallo"
          width={160}
          height={160}
          loading="eager"
          fetchPriority="high"
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Main title */}
      <h1
        className={revealCls('text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent')}
        style={{ transitionDelay: '150ms' }}
      >
        Noah Gallo
      </h1>

      {/* Subtitle */}
      <p
        className={revealCls('text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 max-w-2xl')}
        style={{ transitionDelay: '250ms' }}
      >
        Cloud & DevOps Engineer
      </p>

      {/* Description */}
      <p
        className={revealCls('text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-3xl leading-relaxed')}
        style={{ transitionDelay: '350ms' }}
      >
        Certified DevOps & Cloud Engineer specializing in automating CI/CD pipelines and designing
        scalable cloud infrastructures. Expert in Azure, AWS, GCP, Kubernetes, and Infrastructure
        as Code with Terraform.
      </p>

      {/* Tech stack pills */}
      <div
        className={revealCls('flex flex-wrap justify-center gap-3 mb-8 max-w-4xl')}
        style={{ transitionDelay: '450ms' }}
      >
        {TECH_STACK.map((tech) => (
          <span
            key={tech}
            className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium hover:scale-105 hover:shadow-md transition-all duration-200 cursor-default"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Action buttons */}
      <div
        className={revealCls('flex flex-col sm:flex-row gap-4 mb-8')}
        style={{ transitionDelay: '600ms' }}
      >
        <button
          onClick={downloadCV}
          className="focus-ring bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 hover:shadow-xl group"
        >
          <Download size={20} className="group-hover:animate-bounce" />
          Download CV
        </button>
        <button
          onClick={scrollToProjects}
          className="focus-ring border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-xl"
        >
          View Projects
        </button>
      </div>

      {/* Social links */}
      <div className={revealCls('flex gap-6')} style={{ transitionDelay: '750ms' }}>
        {SOCIAL_LINKS.map(({ href, icon: Icon, label, external }) => (
          <a
            key={label}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className="focus-ring text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:scale-125 hover:-translate-y-1 rounded-md"
            aria-label={label}
          >
            <Icon size={24} />
          </a>
        ))}
      </div>

      {/* Decorative floating blobs (hidden on mobile to keep things calm) */}
      <div
        className="absolute top-20 right-10 w-20 h-20 bg-blue-200/20 dark:bg-blue-800/20 rounded-full animate-float hidden lg:block pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-20 left-10 w-16 h-16 bg-purple-200/20 dark:bg-purple-800/20 rounded-full animate-float hidden lg:block pointer-events-none"
        style={{ animationDelay: '2s' }}
        aria-hidden="true"
      />
    </section>
  )
}

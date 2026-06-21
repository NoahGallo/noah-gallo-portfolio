/**
 * HeroSection — asymmetric editorial intro: left column is the typography
 * stack (role label, oversized name, operator summary, ghost CTAs, social
 * links); right column is the portrait with a mono caption.
 *
 * Reveal: each block starts at `opacity-0 translate-y-6` and animates to
 * `opacity-100 translate-y-0` once `isVisible` is true. Stagger via inline
 * `transitionDelay`.
 */
import { Github, Linkedin, Mail, Download } from 'lucide-react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

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

  const revealCls = (extra = '') =>
    `transition-all duration-700 ease-out ${extra} ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
    }`

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[calc(100vh-5rem)] flex items-center px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left: text */}
        <div className="lg:col-span-7">
          <p
            className={revealCls('font-mono text-xs uppercase tracking-[0.2em] text-accent mb-8')}
          >
            L3 Cloud · Platform Engineer
          </p>

          <h1
            className={revealCls(
              'font-display font-light leading-[0.92] text-ink mb-10 text-6xl md:text-7xl lg:text-8xl',
            )}
            style={{ transitionDelay: '100ms' }}
          >
            Noah
            <br />
            <span className="font-extrabold">Gallo</span>
          </h1>

          <p
            className={revealCls('text-lg md:text-xl text-muted leading-relaxed max-w-xl mb-10')}
            style={{ transitionDelay: '200ms' }}
          >
            Embedded as an L3 engineer in CFL's Cloud Native Platform team — Devoteam consultant.
            I built the railway's mobile-app platform (CFL GO) end to end on Azure/AKS, and operate
            the Park &amp; Ride platform Luxembourg commuters use daily. Terraform IaC, GitOps with
            ArgoCD, Kubernetes security, FinOps.
          </p>

          <div
            className={revealCls('flex flex-col sm:flex-row gap-3 mb-12')}
            style={{ transitionDelay: '350ms' }}
          >
            <button
              onClick={downloadCV}
              className="focus-ring border border-accent text-accent hover:bg-accent hover:text-canvas font-mono text-xs uppercase tracking-wider px-6 py-3 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Download size={16} />
              Download CV
            </button>
            <button
              onClick={scrollToProjects}
              className="focus-ring border border-edge text-ink hover:border-accent hover:text-accent font-mono text-xs uppercase tracking-wider px-6 py-3 rounded-md transition-colors duration-200"
            >
              View Work
            </button>
          </div>

          <div
            className={revealCls('flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-wider')}
            style={{ transitionDelay: '450ms' }}
          >
            {SOCIAL_LINKS.map(({ href, icon: Icon, label, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="focus-ring text-muted hover:text-accent transition-colors flex items-center gap-2 rounded-sm"
                aria-label={label}
              >
                <Icon size={14} />
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Right: portrait */}
        <div
          className={revealCls('lg:col-span-5')}
          style={{ transitionDelay: '250ms' }}
        >
          <div className="relative max-w-sm mx-auto lg:ml-auto lg:mr-0">
            <div className="aspect-[4/5] overflow-hidden border border-edge bg-surface-2">
              <img
                src="/images/noah-website-pic.jpg"
                alt="Noah Gallo"
                width={400}
                height={500}
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover transition-all duration-700"
              />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mt-4">
              Mersch, LU&nbsp;·&nbsp;Open to Switzerland
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

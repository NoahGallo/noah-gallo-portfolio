/**
 * AboutSection — editorial about page: operator-tone headline + body, a
 * typographic profile sidebar (no icons), education list, and three
 * "how I work" columns. One IntersectionObserver per block for reveals.
 */
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const LANGUAGES = [
  ['Luxembourgish', 'Native (C2)'],
  ['German', 'Fluent (C2)'],
  ['English', 'Fluent (C1)'],
  ['French', 'Fluent (C1)'],
] as const

const EDUCATION = [
  {
    title: "Master's in IT — Cloud Computing & Mobility",
    school: 'Université de Picardie Jules Verne',
    period: 'Sep 2023 – Jun 2025',
  },
  {
    title: 'Professional License — Networks & Telecommunications',
    school: 'Université Grenoble Alpes',
    period: 'Sep 2022 – Jul 2023',
  },
  {
    title: 'BTS Cloud Computing',
    school: 'Lycée Guillaume Kroll',
    period: 'Jul 2020 – Jul 2022',
  },
] as const

const STRENGTHS = [
  {
    label: 'Platforms',
    description:
      'Designing and operating Azure / AKS platforms — hub-and-spoke networking, private endpoints, security, GitOps delivery with ArgoCD.',
  },
  {
    label: 'Automation',
    description:
      'Reusable, modular Terraform across multi-environment infrastructure (test / qual / prod). CI/CD pipelines with integrated security scanning.',
  },
  {
    label: 'Operations',
    description:
      'Production change management, monthly on-call rotation, security-posture reporting, and per-service cost analysis (FinOps).',
  },
] as const

export function AboutSection() {
  const { ref: headerRef, isVisible: headerVisible } = useIntersectionObserver()
  const { ref: bodyRef, isVisible: bodyVisible } = useIntersectionObserver()
  const { ref: eduRef, isVisible: eduVisible } = useIntersectionObserver()
  const { ref: workRef, isVisible: workVisible } = useIntersectionObserver()

  const reveal = (visible: boolean, extra = '') =>
    `transition-all duration-700 ease-out ${extra} ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
    }`

  return (
    <section id="about" className="py-24 bg-surface-2">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className={reveal(headerVisible, 'mb-16')}>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
            02 · About
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-ink leading-[1.05] max-w-3xl">
            Building and running{' '}
            <span className="font-bold">production cloud infrastructure.</span>
          </h2>
        </div>

        {/* Body + profile sidebar */}
        <div
          ref={bodyRef}
          className={reveal(bodyVisible, 'grid lg:grid-cols-[1.6fr_1fr] gap-12 lg:gap-20 mb-24')}
        >
          <div className="space-y-5 text-ink/85 text-[15px] md:text-base leading-relaxed">
            <p>
              As a Devoteam consultant embedded in CFL's Cloud Native Platform team, I built CFL GO
              — the Luxembourg national railway's mobile-app platform — end to end on Azure, and
              operate the Park &amp; Ride platform that Luxembourg commuters rely on daily. Day to
              day across Azure Firewall, Application Gateway, API Management, Service Bus, and
              Event Hub, with hands-on AKS, ArgoCD, Grafana, and Helm.
            </p>
            <p>
              My focus is reproducible infrastructure: modular Terraform across multi-environment
              deployments, GitOps delivery with ArgoCD, Kubernetes security policy, and cost-aware
              operations (FinOps). Part of the platform's monthly on-call rotation.
            </p>
          </div>

          <dl className="space-y-6">
            <ProfileRow label="Location" value="Mersch, Luxembourg" />
            <ProfileRow label="Availability" value="Open to Switzerland" />
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-muted mb-2">
                Languages
              </dt>
              <dd className="space-y-1">
                {LANGUAGES.map(([lang, level]) => (
                  <div
                    key={lang}
                    className="flex justify-between items-baseline gap-4 text-ink/90 text-sm"
                  >
                    <span>{lang}</span>
                    <span className="font-mono text-xs text-muted">{level}</span>
                  </div>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        {/* Education */}
        <div ref={eduRef} className={reveal(eduVisible, 'mb-24')}>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-6">
            Education
          </p>
          <ol className="divide-y divide-edge">
            {EDUCATION.map((edu) => (
              <li
                key={edu.title}
                className="py-6 first:pt-0 last:pb-0 grid md:grid-cols-[1fr_auto] gap-2 md:gap-8 items-baseline"
              >
                <div>
                  <h4 className="font-display text-xl font-semibold text-ink">{edu.title}</h4>
                  <p className="text-muted text-sm mt-1">{edu.school}</p>
                </div>
                <p className="font-mono text-xs uppercase tracking-wider text-muted">
                  {edu.period}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* How I work */}
        <div ref={workRef} className={reveal(workVisible)}>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-6">
            How I work
          </p>
          <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
            {STRENGTHS.map((s, idx) => (
              <div key={s.label}>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink mb-3">
                  <span className="text-accent mr-2">{String(idx + 1).padStart(2, '0')}</span>
                  {s.label}
                </p>
                <p className="text-ink/85 text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-xs uppercase tracking-wider text-muted mb-1.5">{label}</dt>
      <dd className="text-ink text-base">{value}</dd>
    </div>
  )
}

/**
 * CertificationsSection — grouped by vendor (Microsoft / CNCF / Red Hat /
 * FinOps Foundation / Other), rendered as a compact horizontal-card grid
 * with vendor logos. Cards flow with flex-wrap so each vendor's row sizes
 * to its contents instead of forcing a fixed column count.
 */
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

type Tier =
  | 'Expert'
  | 'Professional'
  | 'Associate'
  | 'Specialist'
  | 'Fundamentals'
  | 'Language'
  | 'Course'

interface Cert {
  title: string
  subtitle: string
  provider: string
  tier: Tier
  image: string
  verifyUrl: string | null
  meta?: string
}

interface Upcoming {
  title: string
  subtitle: string
  provider: string
}

const VENDOR_GROUPS: Array<{ vendor: string; items: Cert[] }> = [
  {
    vendor: 'Microsoft',
    items: [
      {
        title: 'AZ-400',
        subtitle: 'DevOps Engineer Expert',
        provider: 'Microsoft',
        tier: 'Expert',
        image: '/images/certifications/microsoft-certified-expert-badge.svg',
        verifyUrl:
          'https://learn.microsoft.com/api/credentials/share/en-us/NoahGallo-0907/28B525747CAFAF0?sharingId=4F1E05F935934CF2',
      },
      {
        title: 'AZ-305',
        subtitle: 'Azure Solutions Architect Expert',
        provider: 'Microsoft',
        tier: 'Expert',
        image: '/images/certifications/microsoft-certified-expert-badge.svg',
        verifyUrl:
          'https://learn.microsoft.com/api/credentials/share/en-us/NoahGallo-0907/9B8EFD159360D6F?sharingId=4F1E05F935934CF2',
      },
      {
        title: 'AZ-104',
        subtitle: 'Azure Administrator Associate',
        provider: 'Microsoft',
        tier: 'Associate',
        image: '/images/certifications/microsoft-certified-associate-badge.svg',
        verifyUrl:
          'https://learn.microsoft.com/en-us/users/noahgallo-0907/credentials/441384d079111f73',
      },
      {
        title: 'AZ-900',
        subtitle: 'Azure Fundamentals',
        provider: 'Microsoft',
        tier: 'Fundamentals',
        image: '/images/certifications/microsoft-certified-fundamentals-badge.svg',
        verifyUrl:
          'https://learn.microsoft.com/api/credentials/share/en-us/NoahGallo-0907/35D3EB057EA87051?sharingId=4F1E05F935934CF2',
      },
    ],
  },
  {
    vendor: 'CNCF',
    items: [
      {
        title: 'CKA',
        subtitle: 'Certified Kubernetes Administrator',
        provider: 'CNCF',
        tier: 'Professional',
        image: '/images/certifications/cka.png',
        verifyUrl:
          'https://www.credly.com/badges/e104264a-7b4f-445f-a503-54b80aa342b0/linked_in_profile',
      },
      {
        title: 'CKS',
        subtitle: 'Certified Kubernetes Security Specialist',
        provider: 'CNCF',
        tier: 'Professional',
        image: '/images/certifications/cks.png',
        verifyUrl: 'https://www.credly.com/badges/ffd354d2-51b4-4e0d-a6f2-5db285f4dc4a/public_url',
      },
    ],
  },
  {
    vendor: 'Red Hat',
    items: [
      {
        title: 'RHCE',
        subtitle: 'Linux Automation & Configuration Management',
        provider: 'Red Hat',
        tier: 'Professional',
        image: '/images/certifications/rhce.png',
        verifyUrl:
          'https://www.credly.com/badges/868b69ef-f08b-47e0-b9fa-a5f5376f9bc8/linked_in_profile',
      },
      {
        title: 'RHCSA',
        subtitle: 'Linux System Administration',
        provider: 'Red Hat',
        tier: 'Professional',
        image: '/images/certifications/rhcsa.png',
        verifyUrl:
          'https://www.credly.com/badges/b917704d-9b09-435b-a266-9c3673b2a0ad/linked_in_profile',
      },
    ],
  },
  {
    vendor: 'FinOps Foundation',
    items: [
      {
        title: 'FinOps Certified Engineer',
        subtitle: 'Cloud Cost Optimization & Engineering',
        provider: 'FinOps Foundation',
        tier: 'Specialist',
        image: '/images/certifications/foce.png',
        verifyUrl: 'https://www.credly.com/badges/a8ce1006-ab48-4a23-a32e-5c22120c2cf7/public_url',
      },
      {
        title: 'FinOps Certified Practitioner',
        subtitle: 'Cloud Financial Operations',
        provider: 'FinOps Foundation',
        tier: 'Specialist',
        image: '/images/certifications/focp.png',
        verifyUrl: 'https://www.credly.com/badges/5a335b48-773c-4d59-97df-8539b943db94/public_url',
      },
    ],
  },
  {
    vendor: 'Other',
    items: [
      {
        title: 'Associate Cloud Engineer',
        subtitle: 'Cloud infrastructure & operations on GCP',
        provider: 'Google Cloud',
        tier: 'Associate',
        image: '/images/certifications/gcp_ace.png',
        verifyUrl: 'https://www.credly.com/badges/cdf478b5-9dd9-4c02-82cf-ee0bddabff8b/public_url',
      },
      {
        title: 'TOEIC Listening & Reading',
        subtitle: '970 / 990 — Listening 495, Reading 475',
        provider: 'ETS Global',
        tier: 'Language',
        image: '/images/certifications/TOEIC_Black_RGB.png',
        verifyUrl:
          'https://www.etsglobal.org/fr/en/digital-score-report/62F47B1195BDBF5878BAF97CBE84DE9B1476D0B864F86035052845CFAA7EA225Q1BQODlsZWtMNzZDREhHSE56SzR4WFFtN1lXQUowSHhxa0lGUkFwM0VpTWlsVjdO',
        meta: 'Valid until May 2027',
      },
      {
        title: 'Cisco CCNA 1–4 v7',
        subtitle: 'Networking Fundamentals',
        provider: 'Cisco',
        tier: 'Course',
        image: '/images/certifications/cisco-ccna-logo.webp',
        verifyUrl: null,
        meta: 'Course completion',
      },
    ],
  },
]

const UPCOMING: Upcoming[] = [
  {
    title: 'Professional Cloud Architect',
    subtitle: 'Cloud Architecture',
    provider: 'Google Cloud',
  },
  {
    title: 'Terraform Associate',
    subtitle: 'Infrastructure as Code',
    provider: 'HashiCorp',
  },
]

function CertCard({ cert, showVendor }: { cert: Cert; showVendor: boolean }) {
  return (
    <div className="flex-1 min-w-[260px] max-w-[340px] flex items-start gap-4 p-4 border border-edge rounded-md hover:border-accent transition-colors duration-200 bg-surface">
      <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center bg-surface-2 rounded">
        <img
          src={cert.image}
          alt=""
          width={48}
          height={48}
          loading="lazy"
          className="w-12 h-12 object-contain"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-display font-semibold text-ink text-base leading-tight">
          {cert.title}
        </h4>
        <p className="text-muted text-xs mt-1 leading-snug">{cert.subtitle}</p>
        <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-2.5 font-mono text-[10px] uppercase tracking-wider">
          {showVendor && <span className="text-muted">{cert.provider}</span>}
          <span className="text-accent">{cert.tier === 'Course' ? 'Course completion' : cert.tier}</span>
          {cert.verifyUrl && (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring text-accent hover:underline rounded-sm"
            >
              Verify →
            </a>
          )}
          {cert.meta && cert.tier !== 'Course' && (
            <span className="text-muted/70">· {cert.meta}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export function CertificationsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useIntersectionObserver()
  const { ref: gridRef, isVisible: gridVisible } = useIntersectionObserver()
  const { ref: upcomingRef, isVisible: upcomingVisible } = useIntersectionObserver()
  const { ref: goalRef, isVisible: goalVisible } = useIntersectionObserver()

  const reveal = (visible: boolean, extra = '') =>
    `transition-all duration-700 ease-out ${extra} ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
    }`

  return (
    <section id="certifications" className="py-24 bg-surface-2">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className={reveal(headerVisible, 'mb-16')}>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
            05 · Certifications
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink">
            Certified, where it counts.
          </h2>
        </div>

        <div ref={gridRef} className={reveal(gridVisible, 'space-y-10')}>
          {VENDOR_GROUPS.map((group) => (
            <div key={group.vendor}>
              <div className="flex items-baseline gap-4 mb-4">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  {group.vendor}
                </p>
                <span className="h-px flex-1 bg-edge" aria-hidden="true" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                  {group.items.length} {group.items.length === 1 ? 'cert' : 'certs'}
                </span>
              </div>
              <div className="flex flex-wrap gap-4">
                {group.items.map((cert) => (
                  <CertCard
                    key={cert.title}
                    cert={cert}
                    showVendor={group.vendor === 'Other'}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Planned + Kubestronaut goal row */}
        <div className="mt-20 grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-start">
          <div ref={upcomingRef} className={reveal(upcomingVisible)}>
            <div className="flex items-baseline gap-4 mb-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Planned</p>
              <span className="h-px flex-1 bg-edge" aria-hidden="true" />
            </div>
            <ol className="divide-y divide-edge">
              {UPCOMING.map((cert) => (
                <li
                  key={cert.title}
                  className="py-4 first:pt-0 last:pb-0 grid md:grid-cols-[1fr_auto] gap-1 md:gap-8 items-baseline"
                >
                  <div>
                    <h4 className="font-display font-semibold text-ink/80">{cert.title}</h4>
                    <p className="text-muted text-sm mt-0.5">{cert.subtitle}</p>
                  </div>
                  <p className="font-mono text-xs uppercase tracking-wider text-muted md:text-right">
                    {cert.provider}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div
            ref={goalRef}
            className={reveal(goalVisible, 'border border-edge rounded-md p-6')}
          >
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-2">
              Goal · CNCF Kubestronaut
            </p>
            <p className="font-display text-3xl font-bold text-ink mb-3">
              2 <span className="text-muted font-light">/ 5</span>
            </p>
            <p className="text-muted text-sm leading-relaxed">
              CKA and CKS done. KCNA, KCSA, and CKAD remaining for the full set.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

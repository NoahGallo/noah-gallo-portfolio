/**
 * ExperienceSection — editorial timeline. Each role gets a left-rail with
 * date/location (mono) and a content column with phase markers, project
 * labels, and bullets. One marker dot per role; the current role's dot is
 * accent-filled. Reveal: one observer per role-card.
 */
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

type DescriptionItem =
  | string
  | { type: 'phase-header'; label: string; period: string }
  | { type: 'tag-header'; tag: 'Project' | 'Partnership'; title: string; period: string }

interface Experience {
  company: string
  position: string
  location: string
  period: string
  description: DescriptionItem[]
  current: boolean
}

const EXPERIENCES: Experience[] = [
  {
    company: 'Devoteam Luxembourg',
    position: 'Cloud / DevOps Engineer Consultant',
    location: 'Windhof, Luxembourg',
    period: 'Sep 2024 – Present',
    current: true,
    description: [
      { type: 'phase-header', label: 'Alternance', period: 'Sep 2024 – Jun 2025' },
      "3 weeks on-site / 1 week university, completed alongside the Master's program.",
      'Co-led a 3-day DevOps workshop mentoring BTS Cloud Computing students on Terraform, Ansible, Kubernetes, with Prometheus and Grafana for monitoring.',
      "Led two 3-hour DevOps sessions at CESI Nancy for 5th-year Master's students, covering DevOps principles, tooling, and practice.",

      { type: 'phase-header', label: 'Full-Time Consultant', period: 'Jul 2025 – Present' },
      'Delivering cloud infrastructure and DevOps transformations for Luxembourg enterprise clients — Azure architectures, container orchestration, Infrastructure as Code.',

      { type: 'phase-header', label: 'L3 @ CFL Cloud Native Platform', period: 'Since Mar 2026' },
      "Embedded daily in CFL's platform team in the client office; handle production change requests across multi-environment infrastructure (test/qual/prod).",
      'Day-to-day across Azure Firewall, Application Gateway, API Management, Service Bus, and Event Hub, with hands-on AKS, ArgoCD, Grafana, and Helm.',
      "Part of the platform's monthly on-call rotation.",

      { type: 'tag-header', tag: 'Project', title: 'CFL GO', period: 'Sep 2024 – Present' },
      "Built CFL's mobile-app platform end to end on Azure — in production since April 2026.",
      'Designed reusable modular Terraform: AKS plus the full hub-and-spoke network (Azure Firewall, Application Gateway, private endpoints, VNet peering).',
      'Implemented ArgoCD for GitOps-based continuous delivery.',
      'Built automated CI/CD pipelines with integrated security scanning.',
      'Designed performance-testing infrastructure with NAT Gateway and 20 VMs.',

      { type: 'tag-header', tag: 'Project', title: 'CFL Park & Ride', period: 'Sep 2024 – Present' },
      'Inherited the production platform Luxembourg commuters use daily; operate it and add features as the product evolves.',
      'AKS upgrades, Key Vault certificate rotations.',
      'Azure Firewall / UDR and Point-to-Site VPN configuration.',
      'Monthly client report covering infrastructure changes, security posture (Sentinel, Workbooks), and per-service cost analysis (Azure Cost Analysis).',

      { type: 'tag-header', tag: 'Project', title: 'ArcelorMittal', period: 'Jul 2025' },
      "Designed Azure DevOps CI/CD pipelines with branch-based environment detection and private-endpoint backend security for ArcelorMittal's adoption of Terraform IaC.",

      { type: 'tag-header', tag: 'Project', title: 'Champ Cargosystems — OpenShift', period: 'Sep 2025' },
      'Co-led an OpenShift proof of concept on VMware vSphere: AD SSO, NFS storage, ArgoCD, Harbor registry.',

      { type: 'tag-header', tag: 'Partnership', title: 'Veeam', period: 'Ongoing' },
      "Established and run Devoteam's Veeam technology partnership as main point of contact — license pipeline, Veeam Kasten (Kubernetes backup) promotion to clients.",
      "Represented Veeam at Devoteam's ForgeAI event (2026).",
    ],
  },
  {
    company: 'Fujitsu Luxembourg',
    position: 'Cloud Engineering Intern',
    location: 'Mamer, Luxembourg',
    period: 'Jan 2024 – Jun 2024',
    current: false,
    description: [
      'Automated multi-cloud OpenShift cluster deployments across Azure, AWS, GCP, Nutanix, and VMware with Terraform IaC — reducing provisioning time and ensuring repeatable infrastructure.',
      'Built and maintained Azure DevOps CI/CD pipelines for automated cloud infrastructure delivery.',
      'Passed Microsoft AZ-104 (Azure Administrator Associate) and AZ-305 (Azure Solutions Architect Expert).',
    ],
  },
  {
    company: 'NTT Luxembourg',
    position: 'Managed Services Intern',
    location: 'Capellen, Luxembourg',
    period: 'Mar 2023 – Jun 2023',
    current: false,
    description: [
      'Created VM templates in vCenter with HashiCorp Packer; deployed them with Terraform.',
      'Automated post-deployment configuration with Ansible, streamlining provisioning.',
      'Passed AZ-900 (Microsoft Azure Fundamentals).',
    ],
  },
]

function ExperienceCard({ exp, isLast }: { exp: Experience; isLast: boolean }) {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    <article
      ref={ref}
      className={`grid md:grid-cols-[180px_1fr] gap-x-10 gap-y-4 relative transition-all duration-700 ease-out ${
        isLast ? '' : 'pb-16'
      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      {/* Left rail — marker + date + location */}
      <div className="relative pl-6">
        {/* Vertical connector to next role */}
        {!isLast && (
          <div
            className="absolute left-[5px] top-3 bottom-[-4rem] w-px bg-edge"
            aria-hidden="true"
          />
        )}
        {/* Marker dot */}
        <div
          className={`absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full border ${
            exp.current ? 'bg-accent border-accent' : 'bg-canvas border-edge'
          }`}
          aria-hidden="true"
        />
        <div className="font-mono text-xs uppercase tracking-wider text-ink">
          {exp.period}
        </div>
        <div className="font-mono text-xs uppercase tracking-wider text-muted mt-2">
          {exp.location}
        </div>
      </div>

      {/* Content column */}
      <div className="md:pt-0">
        <h3 className="font-display text-2xl font-semibold text-ink leading-tight">
          {exp.position}
        </h3>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent mt-1.5">
          {exp.company}
        </p>

        <div className="mt-6 space-y-2">
          {exp.description.map((item, idx) => {
            if (typeof item === 'string') {
              return (
                <div
                  key={idx}
                  className="text-ink/85 text-[15px] leading-relaxed flex gap-3"
                >
                  <span className="text-muted flex-shrink-0 select-none" aria-hidden="true">
                    —
                  </span>
                  <span>{item}</span>
                </div>
              )
            }

            if (item.type === 'phase-header') {
              return (
                <div key={idx} className="pt-6 first:pt-0">
                  <div className="flex items-baseline justify-between gap-4 border-t border-edge pt-4 mb-3">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink">
                      {item.label}
                    </span>
                    <span className="font-mono text-xs text-muted flex-shrink-0">
                      {item.period}
                    </span>
                  </div>
                </div>
              )
            }

            return (
              <div key={idx} className="pt-5 first:pt-0">
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                    {item.tag} — {item.title}
                  </span>
                  <span className="font-mono text-xs text-muted flex-shrink-0">
                    {item.period}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </article>
  )
}

export function ExperienceSection() {
  const { ref: titleRef, isVisible: titleVisible } = useIntersectionObserver()

  return (
    <section id="experience" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`mb-16 transition-all duration-700 ease-out ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
            03 · Experience
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink">
            Where I've built things.
          </h2>
        </div>

        <div>
          {EXPERIENCES.map((exp, index) => (
            <ExperienceCard
              key={exp.company}
              exp={exp}
              isLast={index === EXPERIENCES.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

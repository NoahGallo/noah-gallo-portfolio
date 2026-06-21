/**
 * SkillsSection — typographic tag clusters per category, no cards, no icons.
 * Categories and contents come from portfolio-content.md (source of truth) —
 * don't add tech that isn't actually in use.
 */
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

interface SkillCategory {
  title: string
  skills: readonly string[]
}

const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    title: 'Cloud Platforms',
    skills: ['Azure', 'AWS', 'Google Cloud'],
  },
  {
    title: 'Automation',
    skills: ['Terraform', 'Ansible', 'Packer', 'Ansible Automation Platform'],
  },
  {
    title: 'DevOps Tooling',
    skills: [
      'GitLab',
      'Git',
      'Azure DevOps',
      'GitHub Actions',
      'Grafana',
      'Prometheus',
      'Kubespray',
      'Trivy',
    ],
  },
  {
    title: 'Containers & Orchestration',
    skills: ['Docker', 'Kubernetes', 'OpenShift', 'ArgoCD', 'Istio', 'Cilium', 'Microservices'],
  },
  {
    title: 'Azure Services',
    skills: [
      'AKS',
      'Application Gateway',
      'Key Vault',
      'Container Registry',
      'Firewall',
      'SQL Database',
      'Storage Accounts',
      'Managed Redis',
      'Service Bus',
      'Event Hub',
      'Application Insights',
      'Log Analytics',
    ],
  },
  {
    title: 'OS & Virtualization',
    skills: ['Linux', 'RHEL', 'Windows Server', 'VMware', 'Proxmox', 'Nutanix'],
  },
  {
    title: 'Programming',
    skills: ['Python', 'Bash', 'PowerShell'],
  },
  {
    title: 'Other',
    skills: [
      'SQL & NoSQL',
      'Networking (TCP/IP, DNS, DHCP, OSPF, BGP)',
      'Firewalls',
      'Active Directory',
      'FinOps',
      'Kafka',
    ],
  },
]

export function SkillsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useIntersectionObserver()
  const { ref: listRef, isVisible: listVisible } = useIntersectionObserver<HTMLDListElement>()

  const reveal = (visible: boolean, extra = '') =>
    `transition-all duration-700 ease-out ${extra} ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
    }`

  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className={reveal(headerVisible, 'mb-16')}>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
            04 · Skills
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink">
            The stack I work in.
          </h2>
        </div>

        <dl
          ref={listRef}
          className={reveal(listVisible, 'divide-y divide-edge')}
        >
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              className="py-6 first:pt-0 grid md:grid-cols-[200px_1fr] gap-3 md:gap-10 items-baseline"
            >
              <dt className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {cat.title}
              </dt>
              <dd className="flex flex-wrap text-ink/90 font-mono text-sm">
                {cat.skills.map((skill, idx) => (
                  <span key={skill} className="inline-flex items-baseline">
                    {idx > 0 && (
                      <span className="text-muted/50 mx-3 select-none" aria-hidden="true">
                        ·
                      </span>
                    )}
                    <span className="whitespace-nowrap">{skill}</span>
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

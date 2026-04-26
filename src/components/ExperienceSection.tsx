/**
 * ExperienceSection — vertical timeline of professional roles. Each role
 * has a list of bullet points; bullets can also be "phase headers"
 * (alternance vs. full-time) or "project headers" (named client projects).
 *
 * Reveal animations: one observer per card, so each card slides in once
 * it scrolls into view (rather than all firing at once with the section).
 */
import { Calendar, MapPin, Building } from 'lucide-react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

type DescriptionItem =
  | string
  | { type: 'phase-header'; label: string; period: string }
  | { type: 'project-header'; title: string; period: string }

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
    period: 'September 2024 – Present',
    description: [
      { type: 'phase-header', label: '🎓 Alternance', period: 'Sep 2024 – Jun 2025' },
      '3 weeks on-site / 1 week university format, completed alongside the Master\'s degree program.',
      'Co-led a 3-day DevOps workshop mentoring BTS Cloud Computing students on Terraform, Ansible, Jenkins, and Kubernetes, with Prometheus and Grafana for monitoring.',
      'Led two 3-hour DevOps sessions at CESI Nancy for 5th-year Master\'s students, covering DevOps principles, tools, and best practices.',

      { type: 'phase-header', label: '💼 Full-Time Consultant', period: 'Jul 2025 – Present' },
      'Delivering cloud infrastructure and DevOps transformations for Luxembourg enterprise clients. Specialized in Azure architectures, container orchestration, and Infrastructure as Code.',

      { type: 'project-header', title: '🚄 CFL GO Project', period: 'Sep 2024 – Present' },
      "Leading infrastructure for CFL's new mobile app serving Luxembourg railway users",
      'Deployed scalable hub-and-spoke architecture from scratch.',
      'Implemented modular Terraform infrastructure across all environments.',
      'Configured AKS clusters with ArgoCD GitOps workflows.',
      'Designed performance testing infrastructure with NAT Gateway and 20 VMs.',
      'Built automated CI/CD pipelines with integrated security scanning.',

      { type: 'project-header', title: '🚄 CFL Park & Ride Platform', period: 'Sep 2024 – Present' },
      'Managing production operations for the business-critical Park & Ride mobile app used daily by Luxembourg commuters.',
      'Implemented Point-to-Site VPN in Virtual Network Gateway.',
      'Configured Azure Firewall rules and User Defined Routes.',
      'Managed AKS upgrades and certificate rotations across all environments.',
      'Created and delivered monthly Cost, Security, and Maintenance reports to the client.',

      { type: 'project-header', title: '🏭 ArcelorMittal', period: 'Jul 2025' },
      "Infrastructure modernization for global steel manufacturer's Azure environment.",
      'Designed Azure DevOps pipelines with branch-based environment detection.',
      'Implemented private endpoints for enhanced security.',

      { type: 'project-header', title: '🐳 Champ Cargosystems — OpenShift', period: 'Sep 2025' },
      'Co-led an OpenShift POC on VMware infrastructure.',
      'Installed highly available OpenShift cluster with Microsoft AD SSO integration.',
      'Configured NFS storage and deployed ArgoCD + Harbor registry.',
    ],
    current: true,
  },
  {
    company: 'Fujitsu Luxembourg',
    position: 'Cloud Engineering Intern',
    location: 'Mamer, Luxembourg',
    period: 'January 2024 – June 2024',
    description: [
      'Automated infrastructure deployments using Terraform to deploy Azure resources, including virtual machines, networks, and storage accounts.',
      'Designed and implemented Infrastructure as Code solutions to streamline OpenShift cluster deployments across hybrid environments.',
      'Passed Microsoft Azure Certifications as the AZ-104 (Azure Administrator Associate) and AZ-305 (Azure Solutions Architect Expert).',
    ],
    current: false,
  },
  {
    company: 'NTT Luxembourg',
    position: 'Managed Services Intern',
    location: 'Capellen, Luxembourg',
    period: 'March 2023 - June 2023',
    description: [
      'Created VM templates in vCenter using HashiCorp Packer and deployed them with Terraform.',
      'Automated post-deployment configurations with Ansible, streamlining infrastructure provisioning.',
      'Passed the AZ-900 (Microsoft Azure Fundamentals) certification.',
    ],
    current: false,
  },
]

function ExperienceCard({ exp, isLast }: { exp: Experience; isLast: boolean }) {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
      }`}
    >
      {/* Vertical timeline line connecting cards */}
      {!isLast && (
        <div
          className="absolute left-8 top-16 w-0.5 h-full bg-gray-200 dark:bg-gray-700"
          aria-hidden="true"
        />
      )}

      <div className="flex gap-8">
        {/* Timeline dot */}
        <div
          className={`flex-shrink-0 w-16 h-16 rounded-full border-4 flex items-center justify-center transition-transform duration-300 hover:scale-110 ${
            exp.current
              ? 'bg-blue-600 border-blue-600 animate-pulse-slow'
              : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
          }`}
        >
          <Building
            size={20}
            className={exp.current ? 'text-white' : 'text-gray-600 dark:text-gray-300'}
          />
        </div>

        {/* Content card */}
        <div className="flex-grow bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {exp.position}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium">{exp.company}</p>
            </div>
            {exp.current && (
              <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium self-start">
                Current
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-4 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{exp.period}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{exp.location}</span>
            </div>
          </div>

          <ul className="space-y-1.5">
            {exp.description.map((item, idx) => {
              if (typeof item === 'string') {
                return (
                  <li
                    key={idx}
                    className="text-gray-700 dark:text-gray-300 text-sm flex gap-2"
                  >
                    <span className="text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                )
              }

              if (item.type === 'phase-header') {
                return (
                  <li key={idx} className="list-none mt-5 first:mt-0">
                    <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-600 pb-1.5 mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white text-sm">
                        {item.label}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                        {item.period}
                      </span>
                    </div>
                  </li>
                )
              }

              return (
                <li key={idx} className="list-none mt-3 mb-1">
                  <div className="flex items-center justify-between border-l-2 border-blue-400 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-r">
                    <span className="font-medium text-blue-700 dark:text-blue-300 text-sm">
                      {item.title}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-4 flex-shrink-0">
                      {item.period}
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function ExperienceSection() {
  const { ref: titleRef, isVisible: titleVisible } = useIntersectionObserver()

  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Professional Experience
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Building expertise through hands-on experience in cloud engineering and DevOps automation
          </p>
        </div>

        <div className="space-y-8">
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

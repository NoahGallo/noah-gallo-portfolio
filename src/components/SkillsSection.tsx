/**
 * SkillsSection — six grouped skill categories (Cloud, DevOps, Containers,
 * Programming, Monitoring, Infrastructure) plus a flat row of additional
 * technologies. Each category card slides in on scroll via its own observer.
 */
import { Server, Cloud, Code, Database, Settings, Monitor } from 'lucide-react'
import type { ReactNode } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

interface SkillCategory {
  title: string
  icon: ReactNode
  // Tailwind gradient classes — the values must match real generated classes,
  // hence written as full literals (no template strings).
  gradient: string
  skills: string[]
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Cloud Platforms',
    icon: <Cloud className="w-8 h-8" />,
    gradient: 'from-blue-500 to-cyan-500',
    skills: ['Microsoft Azure', 'Amazon AWS', 'Google Cloud Platform'],
  },
  {
    title: 'DevOps & Automation',
    icon: <Settings className="w-8 h-8" />,
    gradient: 'from-green-500 to-emerald-500',
    skills: ['Terraform', 'Ansible', 'Azure DevOps', 'Jenkins', 'GitLab', 'GitHub Actions'],
  },
  {
    title: 'Containers & Orchestration',
    icon: <Server className="w-8 h-8" />,
    gradient: 'from-purple-500 to-violet-500',
    skills: ['Kubernetes', 'Docker', 'OpenShift', 'Argo CD', 'Docker Swarm', 'Microservices'],
  },
  {
    title: 'Programming & Scripting',
    icon: <Code className="w-8 h-8" />,
    gradient: 'from-orange-500 to-red-500',
    skills: ['Python', 'Bash', 'PowerShell', 'JavaScript', 'MySQL'],
  },
  {
    title: 'Monitoring & Observability',
    icon: <Monitor className="w-8 h-8" />,
    gradient: 'from-indigo-500 to-purple-500',
    skills: ['Prometheus', 'Grafana', 'Azure Monitor', 'ELK Stack', 'Jaeger Tracing'],
  },
  {
    title: 'Infrastructure & Systems',
    icon: <Database className="w-8 h-8" />,
    gradient: 'from-teal-500 to-green-500',
    skills: ['Linux', 'Windows Server', 'VMware', 'Proxmox', 'Active Directory', 'Packer'],
  },
]

const ADDITIONAL_TECH = [
  'TCP/IP', 'DNS', 'DHCP', 'Firewalls', 'pfSense', 'OSPF', 'BGP',
  'Database Management', 'SQL', 'NoSQL', 'Firebase', 'Git',
  'Machine Learning', 'AI', 'Networking Protocols', 'Security',
] as const

function CategoryCard({ category, index }: { category: SkillCategory; index: number }) {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    <div
      ref={ref}
      className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{ transitionDelay: `${(index % 2) * 100}ms` }}
    >
      <div className="flex items-center mb-6">
        <div
          className={`bg-gradient-to-r ${category.gradient} p-3 rounded-lg text-white mr-4 group-hover:scale-110 transition-transform duration-300`}
        >
          {category.icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {category.title}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {category.skills.map((skill) => (
          <div
            key={skill}
            className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm cursor-default"
          >
            <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SkillsSection() {
  const { ref: titleRef, isVisible: titleVisible } = useIntersectionObserver()
  const { ref: additionalRef, isVisible: additionalVisible } = useIntersectionObserver()

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Technical Skills
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive expertise across cloud platforms, DevOps tools, and modern infrastructure
            technologies
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map((category, index) => (
            <CategoryCard key={category.title} category={category} index={index} />
          ))}
        </div>

        <div
          ref={additionalRef}
          className={`mt-16 transition-all duration-700 ease-out ${
            additionalVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h3 className="text-2xl font-semibold text-center mb-8 text-gray-900 dark:text-white">
            Additional Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {ADDITIONAL_TECH.map((tech) => (
              <span
                key={tech}
                className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 cursor-default hover:scale-105 hover:shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

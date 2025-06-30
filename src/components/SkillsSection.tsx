import { Server, Cloud, Code, Database, Settings, Monitor } from 'lucide-react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

export function SkillsSection() {
  const { ref: titleRef, hasIntersected: titleVisible } = useIntersectionObserver()
  const { ref: categoriesRef, hasIntersected: categoriesVisible } = useIntersectionObserver()
  const { ref: additionalRef, hasIntersected: additionalVisible } = useIntersectionObserver()

  const skillCategories = [
    {
      title: "Cloud Platforms",
      icon: <Cloud className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      skills: ["Microsoft Azure", "Amazon AWS", "Google Cloud Platform"]
    },
    {
      title: "DevOps & Automation",
      icon: <Settings className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      skills: ["Terraform", "Ansible", "Azure DevOps", "Jenkins", "GitLab", "GitHub Actions"]
    },
    {
      title: "Containers & Orchestration",
      icon: <Server className="w-8 h-8" />,
      color: "from-purple-500 to-violet-500",
      skills: ["Kubernetes", "Docker", "OpenShift", "Argo CD", "Docker Swarm", "Microservices"]
    },
    {
      title: "Programming & Scripting",
      icon: <Code className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
      skills: ["Python", "Bash", "PowerShell", "JavaScript", "MySQL"]
    },
    {
      title: "Monitoring & Observability",
      icon: <Monitor className="w-8 h-8" />,
      color: "from-indigo-500 to-purple-500",
      skills: ["Prometheus", "Grafana", "Azure Monitor", "ELK Stack", "Jaeger Tracing"]
    },
    {
      title: "Infrastructure & Systems",
      icon: <Database className="w-8 h-8" />,
      color: "from-teal-500 to-green-500",
      skills: ["Linux", "Windows Server", "VMware", "Proxmox", "Active Directory", "Packer"]
    }
  ]

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-600 ${
            titleVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Technical Skills
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive expertise across cloud platforms, DevOps tools, and modern infrastructure technologies
          </p>
        </div>

        <div 
          ref={categoriesRef}
          className="grid lg:grid-cols-2 gap-8"
        >
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 group ${
                categoriesVisible ? 'animate-scaleIn' : 'opacity-0 scale-90'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Category Header */}
              <div className="flex items-center mb-6">
                <div className={`bg-gradient-to-r ${category.color} p-3 rounded-lg text-white mr-4 group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {category.title}
                </h3>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex}
                    className={`bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-md cursor-default ${
                      categoriesVisible ? 'animate-fadeIn' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${index * 150 + skillIndex * 50 + 200}ms` }}
                  >
                    <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Grid */}
        <div 
          ref={additionalRef}
          className={`mt-16 transition-all duration-600 delay-400 ${
            additionalVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="text-2xl font-semibold text-center mb-8 text-gray-900 dark:text-white">
            Additional Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'TCP/IP', 'DNS', 'DHCP', 'Firewalls', 'pfSense', 'OSPF', 'BGP',
              'Database Management', 'SQL', 'NoSQL', 'Firebase', 'Git',
              'Machine Learning', 'AI', 'Networking Protocols', 'Security'
            ].map((tech, index) => (
              <span 
                key={index}
                className={`bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 cursor-default hover:scale-110 hover:shadow-md ${
                  additionalVisible ? 'animate-fadeIn' : 'opacity-0'
                }`}
                style={{ animationDelay: `${600 + index * 50}ms` }}
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

import { Github, ExternalLink, Server, Cloud, Settings, Database, BookOpen, Code } from 'lucide-react'

export function ProjectsSection() {
  const projects = [
    {
      title: "Portfolio Website & Infrastructure",
      description: "Modern React portfolio with TypeScript, featuring dark mode, responsive design, and Azure-hosted backend with visitor analytics.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Azure Functions", "Cosmos DB", "Terraform"],
      category: "Personal Project",
      icon: <Cloud className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-500",
      githubUrl: "https://github.com/NoahGallo/noah-gallo-portfolio",
      liveUrl: "https://www.noah-gallo.com",
      highlights: [
        "Modern React with TypeScript",
        "Azure Static Web Apps hosting",
        "Serverless backend architecture",
        "Real-time visitor analytics with Cosmos DB"
      ]
    },
    {
      title: "Home Lab Infrastructure",
      description: "Personal homelab setup for learning and experimentation with enterprise technologies, featuring containerized services and monitoring.",
      technologies: ["Proxmox", "Docker", "Kubernetes", "Prometheus", "Grafana", "pfSense"],
      category: "Personal Project",
      icon: <Server className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      highlights: [
        "Proxmox virtualization environment",
        "Kubernetes cluster for container orchestration",
        "Complete monitoring stack implementation",
        "Network segmentation with pfSense"
      ]
    },
    {
      title: "Cloud Migration Case Study",
      description: "University project designing a comprehensive cloud migration strategy for a fictional enterprise, including cost analysis and risk assessment.",
      technologies: ["Azure", "AWS", "Cost Analysis", "Architecture Design", "Security Planning"],
      category: "University Project",
      icon: <BookOpen className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      highlights: [
        "Complete migration roadmap design",
        "Multi-cloud architecture comparison",
        "ROI and cost-benefit analysis",
        "Security and compliance framework"
      ]
    },
    {
      title: "Network Security Implementation",
      description: "BTS project implementing a secure network infrastructure with VLAN segmentation, firewall rules, and monitoring for a simulated enterprise environment.",
      technologies: ["Cisco", "pfSense", "VLAN", "Network Security", "Monitoring"],
      category: "University Project", 
      icon: <Settings className="w-6 h-6" />,
      color: "from-red-500 to-orange-500",
      highlights: [
        "VLAN segmentation design",
        "Firewall rule implementation",
        "Network monitoring setup",
        "Security policy documentation"
      ]
    },
    {
      title: "Infrastructure as Code Templates",
      description: "Collection of reusable Terraform modules and Ansible playbooks for rapid deployment of common infrastructure patterns.",
      technologies: ["Terraform", "Ansible", "Azure", "AWS", "GitLab CI/CD"],
      category: "Personal Project",
      icon: <Code className="w-6 h-6" />,
      color: "from-purple-500 to-violet-500",
      githubUrl: "https://github.com/NoahGallo/iac-templates",
      highlights: [
        "Modular Terraform designs",
        "Automated testing pipelines", 
        "Multi-cloud compatibility",
        "Best practices documentation"
      ]
    },
    {
      title: "Certification Lab Environment",
      description: "Automated lab environment setup for practicing cloud and DevOps certifications, with tear-down automation to minimize costs.",
      technologies: ["Terraform", "Azure", "AWS", "Automation Scripts", "Cost Optimization"],
      category: "Personal Project",
      icon: <Database className="w-6 h-6" />,
      color: "from-teal-500 to-green-500",
      highlights: [
        "Automated environment provisioning",
        "Cost-optimized resource allocation", 
        "One-click setup and teardown",
        "Multi-certification support"
      ]
    }
  ]

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Personal & Academic Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Self-directed projects and university work demonstrating continuous learning and technical exploration
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              {/* Header */}
              <div className={`bg-gradient-to-r ${project.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      {project.icon}
                    </div>
                    <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  {project.githubUrl && (
                    <div className="flex gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                      >
                        <Github size={18} />
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Key Highlights */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                    Key Features:
                  </h4>
                  <ul className="space-y-1">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-gray-600 dark:text-gray-300 text-sm flex items-start">
                        <span className="text-green-500 mr-2 mt-1">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                    Technologies Used:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Call-to-Action */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg max-w-2xl mx-auto">
            <Github className="mx-auto mb-4 text-gray-600 dark:text-gray-400" size={48} />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              More Projects on GitHub
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Explore my additional projects, code samples, and contributions to open-source projects
            </p>
            <a
              href="https://github.com/NoahGallo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
            >
              <Github size={20} />
              Visit GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

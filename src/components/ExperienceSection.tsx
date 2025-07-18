import { Calendar, MapPin, Building } from 'lucide-react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

export function ExperienceSection() {
  const { ref: titleRef, hasIntersected: titleVisible } = useIntersectionObserver()
  const { ref: experienceRef, hasIntersected: experienceVisible } = useIntersectionObserver()

  const experiences = [
    {
      company: "Devoteam Luxembourg",
      position: "DevOps / Cloud Engineer",
      location: "Windhof, Luxembourg",
      period: "September 2024 - Present",
      description: [
        "Completed an alternance (3 weeks work, 1 week university per month) from September 2024 to June 2025.",
        "Started full-time as DevOps / Cloud Engineer from July 1st, 2025.",
        "Implemented a modular hub-and-spoke cloud infrastructure using Terraform, Azure, and Azure DevOps, including reusable templates to support client projects and streamline deployments across regions.",
        "Integrated Azure Kubernetes Service (AKS) for scalable and redundant application hosting as part of the solution.",
        "Co-led a 3-day DevOps workshop, mentoring BTS Cloud Computing students on deploying infrastructures with Terraform, Ansible, Jenkins, and Kubernetes, while showcasing monitoring tools like Prometheus and Grafana.",
        "Lead two 3 hour devops presentations at CESI in Nancy for 5th year Master students, covering DevOps principles, tools, and best practices.",
      ],
      current: true
    },
    {
      company: "Fujitsu Luxembourg",
      position: "Cloud Engineering Intern",
      location: "Mamer, Luxembourg",
      period: "January 2024 – June 2024",
      description: [
        "Automated infrastructure deployments using Terraform to deploy Azure resources, including virtual machines, networks, and storage accounts.",
        "Designed and implemented Infrastructure as Code solutions to streamline OpenShift cluster deployments across hybrid environments.",
        "Passed Microsoft Azure Certifications as the AZ-104 (Azure Administrator Associate) and AZ-305 (Azure Solutions Architect Expert).",
      ],
      current: false
    },
    {
      company: "NTT Luxembourg",
      position: "Managed Services Intern",
      location: "Capellen, Luxembourg",
      period: "March 2023 - June 2023",
      description: [
        "Created VM templates in vCenter using HashiCorp Packer and deployed them with Terraform.",
        "Automated post-deployment configurations with Ansible, streamlining infrastructure provisioning.",
        "Passed the AZ-900 (Microsoft Azure Fundamentals) certification.",
      ],
      current: false
    }
  ]

  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-600 ${
            titleVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Professional Experience
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Building expertise through hands-on experience in cloud engineering and DevOps automation
          </p>
        </div>

        <div 
          ref={experienceRef}
          className="space-y-8"
        >
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className={`relative transition-all duration-600 ${
                experienceVisible ? 'animate-slideInLeft' : 'opacity-0 -translate-x-8'
              }`}
              style={{ animationDelay: `${200 + index * 200}ms` }}
            >
              {/* Timeline line */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-8 top-20 w-0.5 h-full bg-gray-200 dark:bg-gray-700"></div>
              )}
              
              <div className="flex gap-8">
                {/* Timeline dot */}
                <div className={`flex-shrink-0 w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                  exp.current 
                    ? 'bg-blue-600 border-blue-600 animate-pulse-slow' 
                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
                }`}>
                  <Building size={20} className={`transition-colors duration-300 ${
                    exp.current ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                  }`} />
                </div>

                {/* Content */}
                <div className="flex-grow bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {exp.position}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">
                        {exp.company}
                      </p>
                    </div>
                    {exp.current && (
                      <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium mt-2 md:mt-0 animate-pulse">
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

                  <ul className="space-y-2">
                    {exp.description.map((item, idx) => (
                      <li 
                        key={idx} 
                        className="text-gray-700 dark:text-gray-300 text-sm hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                      >
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { Calendar, MapPin, Building } from 'lucide-react'

export function ExperienceSection() {
  const experiences = [
    {
      company: "Devoteam Luxembourg",
      position: "Cloud & DevOps Apprenticeship",
      location: "Windhof, Luxembourg",
      period: "September 2024 - Present",
      description: [
        "Implemented a modular hub-and-spoke cloud infrastructure using Terraform, Azure, and Azure DevOps, including reusable templates to support client projects and streamline deployments across regions.",
        "Integrated Azure Kubernetes Service (AKS) for scalable and redundant application hosting as part of the solution.",
        "Co-led a 3-day DevOps workshop, mentoring BTS Cloud Computing students on deploying infrastructures with Terraform, Ansible, Jenkins, and Kubernetes, while showcasing monitoring tools like Prometheus and Grafana."
      ],
      current: true
    },
    {
      company: "Fujitsu Luxembourg",
      position: "Cloud Engineering Intern",
      location: "Mamer, Luxembourg",
      period: "January 2024 – June 2024",
      description: [
        "Automated installations of RedHat OpenShift on on-premises and cloud platforms using Terraform.",
        "Designed and implemented Infrastructure as Code solutions to streamline OpenShift cluster deployments across hybrid environments."
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
        "Automated post-deployment configurations with Ansible, streamlining infrastructure provisioning."
      ],
      current: false
    }
  ]

  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Professional Experience
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Building expertise through hands-on experience in cloud engineering and DevOps automation
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="relative">
              {/* Timeline line */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-8 top-20 w-0.5 h-full bg-gray-200 dark:bg-gray-700"></div>
              )}
              
              <div className="flex gap-8">
                {/* Timeline dot */}
                <div className={`flex-shrink-0 w-16 h-16 rounded-full border-4 flex items-center justify-center ${
                  exp.current 
                    ? 'bg-blue-600 border-blue-600' 
                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                }`}>
                  <Building size={20} className={exp.current ? 'text-white' : 'text-gray-600 dark:text-gray-300'} />
                </div>

                {/* Content */}
                <div className="flex-grow bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {exp.position}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">
                        {exp.company}
                      </p>
                    </div>
                    {exp.current && (
                      <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium mt-2 md:mt-0">
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
                      <li key={idx} className="text-gray-700 dark:text-gray-300 text-sm">
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

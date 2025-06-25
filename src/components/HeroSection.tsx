import { Github, Linkedin, Mail, Download } from 'lucide-react'

export function HeroSection() {

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-20">
      {/* Profile Photo */}
      <div className="w-40 h-40 rounded-full mb-8 overflow-hidden shadow-2xl ring-4 ring-blue-200 dark:ring-blue-800">
        <img 
          src="/images/noah-profile.jpg" 
          alt="Noah Gallo" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Title */}
      <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Noah Gallo
      </h1>

      {/* Subtitle */}
      <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 max-w-2xl">
        Cloud & DevOps Engineer
      </p>

      {/* Description */}
      <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-3xl leading-relaxed">
        Certified DevOps & Cloud Engineer specializing in automating CI/CD pipelines and designing scalable cloud infrastructures. 
        Expert in Azure, AWS, GCP, Kubernetes, and Infrastructure as Code with Terraform.
      </p>

      {/* Tech Stack Pills - Based on your resume */}
      <div className="flex flex-wrap justify-center gap-3 mb-8 max-w-4xl">
        {[
          'Azure', 'AWS', 'Google Cloud', 'Kubernetes', 'Terraform', 
          'Ansible', 'Azure DevOps', 'Jenkins', 'Docker', 'Python',
          'CI/CD', 'Prometheus', 'Grafana', 'Linux'
        ].map((tech) => (
          <span 
            key={tech}
            className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform cursor-default"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
          <Download size={20} />
          Download CV
        </button>
        <button className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-8 py-3 rounded-lg font-medium transition-colors">
          View Projects
        </button>
      </div>

      {/* Social Links */}
      <div className="flex gap-6">
        <a 
          href="https://github.com/NoahGallo" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <Github size={24} />
        </a>
        <a 
          href="https://linkedin.com/in/noahgallo" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <Linkedin size={24} />
        </a>
        <a 
          href="mailto:gallo.noah@gmail.com"
          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <Mail size={24} />
        </a>
      </div>
    </section>
  )
}

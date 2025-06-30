import { Github, Linkedin, Mail, Download } from 'lucide-react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

export function HeroSection() {
  const { ref: heroRef, hasIntersected } = useIntersectionObserver()
  
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const downloadCV = () => {
    const link = document.createElement('a')
    link.href = '/resume/noah-gallo-cv.pdf'
    link.download = 'Noah_Gallo_CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-20"
    >
      {/* Profile Photo */}
      <div className={`w-40 h-40 rounded-full mb-8 overflow-hidden shadow-2xl ring-4 ring-blue-200 dark:ring-blue-800 transition-all duration-600 ${
        hasIntersected ? 'animate-scaleIn' : 'opacity-0 scale-90'
      }`}>
        <img 
          src="/images/noah-profile.jpg" 
          alt="Noah Gallo" 
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Main Title */}
      <h1 className={`text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-600 delay-200 ${
        hasIntersected ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'
      }`}>
        Noah Gallo
      </h1>

      {/* Subtitle */}
      <p className={`text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 max-w-2xl transition-all duration-600 delay-300 ${
        hasIntersected ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'
      }`}>
        Cloud & DevOps Engineer
      </p>

      {/* Description */}
      <p className={`text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-3xl leading-relaxed transition-all duration-600 delay-400 ${
        hasIntersected ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'
      }`}>
        Certified DevOps & Cloud Engineer specializing in automating CI/CD pipelines and designing scalable cloud infrastructures. 
        Expert in Azure, AWS, GCP, Kubernetes, and Infrastructure as Code with Terraform.
      </p>

      {/* Tech Stack Pills */}
      <div className={`flex flex-wrap justify-center gap-3 mb-8 max-w-4xl transition-all duration-600 delay-500 ${
        hasIntersected ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'
      }`}>
        {[
          'Azure', 'AWS', 'Google Cloud', 'Kubernetes', 'Terraform', 
          'Ansible', 'Azure DevOps', 'Jenkins', 'Docker', 'Python',
          'CI/CD', 'Prometheus', 'Grafana', 'Linux'
        ].map((tech, index) => (
          <span 
            key={tech}
            className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-default animate-fadeIn"
            style={{ animationDelay: `${600 + index * 100}ms` }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className={`flex flex-col sm:flex-row gap-4 mb-8 transition-all duration-600 delay-700 ${
        hasIntersected ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'
      }`}>
        <button 
          onClick={downloadCV}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 hover:scale-105 hover:shadow-xl transform group"
        >
          <Download size={20} className="group-hover:animate-bounce" />
          Download CV
        </button>
        <button 
          onClick={scrollToProjects}
          className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl transform"
        >
          View Projects
        </button>
      </div>

      {/* Social Links */}
      <div className={`flex gap-6 transition-all duration-600 delay-800 ${
        hasIntersected ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'
      }`}>
        {[
          { href: "https://github.com/NoahGallo", icon: Github, label: "GitHub" },
          { href: "https://linkedin.com/in/noahgallo", icon: Linkedin, label: "LinkedIn" },
          { href: "mailto:gallo.noah@gmail.com", icon: Mail, label: "Email" }
        ].map(({ href, icon: Icon, label }) => (
          <a 
            key={label}
            href={href} 
            target={label !== "Email" ? "_blank" : undefined}
            rel={label !== "Email" ? "noopener noreferrer" : undefined}
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-125 hover:-translate-y-1"
            aria-label={label}
          >
            <Icon size={24} />
          </a>
        ))}
      </div>

      {/* Floating Animation Element */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-blue-200/20 dark:bg-blue-800/20 rounded-full animate-float hidden lg:block"></div>
      <div className="absolute bottom-20 left-10 w-16 h-16 bg-purple-200/20 dark:bg-purple-800/20 rounded-full animate-float hidden lg:block" style={{ animationDelay: '2s' }}></div>
    </section>
  )
}

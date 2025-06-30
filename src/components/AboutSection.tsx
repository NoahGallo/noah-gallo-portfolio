import { MapPin, Calendar, Languages, GraduationCap } from 'lucide-react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

export function AboutSection() {
  const { ref: aboutRef, hasIntersected } = useIntersectionObserver()
  const { ref: personalRef, hasIntersected: personalVisible } = useIntersectionObserver()
  const { ref: educationRef, hasIntersected: educationVisible } = useIntersectionObserver()
  const { ref: strengthsRef, hasIntersected: strengthsVisible } = useIntersectionObserver()

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={aboutRef}
          className={`text-center mb-16 transition-all duration-600 ${
            hasIntersected ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Recently graduated Cloud & DevOps Engineer with experience in automating 
            infrastructure and designing scalable cloud solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Personal Info */}
          <div 
            ref={personalRef}
            className={`transition-all duration-600 delay-200 ${
              personalVisible ? 'animate-slideInLeft' : 'opacity-0 -translate-x-8'
            }`}
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              Personal Information
            </h3>
            
            <div className="space-y-4">
              {[
                { icon: MapPin, text: "Mersch, Luxembourg" },
                { icon: Calendar, text: "Born: March 17, 2000 (25 years old)" },
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-3 transition-all duration-300 hover:translate-x-2 ${
                    personalVisible ? 'animate-fadeIn' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <item.icon className="text-blue-600 dark:text-blue-400" size={20} />
                  <span className="text-gray-700 dark:text-gray-300">
                    {item.text}
                  </span>
                </div>
              ))}
              
              <div className={`flex items-center gap-3 transition-all duration-300 hover:translate-x-2 ${
                personalVisible ? 'animate-fadeIn' : 'opacity-0'
              }`}
              style={{ animationDelay: '600ms' }}>
                <Languages className="text-blue-600 dark:text-blue-400" size={20} />
                <div className="text-gray-700 dark:text-gray-300">
                  <p className="font-medium mb-2">Languages:</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {[
                      "🇱🇺 Luxembourgish (Native)",
                      "🇩🇪 German (Fluent)",
                      "🇬🇧 English (Fluent)",
                      "🇫🇷 French (Fluent)"
                    ].map((lang, idx) => (
                      <span 
                        key={idx}
                        className={`transition-all duration-300 hover:scale-105 ${
                          personalVisible ? 'animate-fadeIn' : 'opacity-0'
                        }`}
                        style={{ animationDelay: `${700 + idx * 50}ms` }}
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div 
            ref={educationRef}
            className={`transition-all duration-600 delay-300 ${
              educationVisible ? 'animate-slideInRight' : 'opacity-0 translate-x-8'
            }`}
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              Education
            </h3>
            
            <div className="space-y-6">
              {[
                {
                  title: "Master's Degree",
                  description: "Master's in IT – Cloud Computing & Mobility",
                  school: "Université de Picardie Jules Verne",
                  period: "September 2023 – June 2025",
                  hasIcon: true
                },
                {
                  title: "Bachelor's Degree",
                  description: "Professional License – Networks & Telecommunications",
                  school: "Université Grenoble Alpes",
                  period: "September 2022 – July 2023",
                  hasIcon: false
                },
                {
                  title: "Technical Diploma",
                  description: "BTS Cloud Computing",
                  school: "Lycée Guillaume Kroll",
                  period: "July 2020 – July 2022",
                  hasIcon: false
                }
              ].map((edu, index) => (
                <div 
                  key={index}
                  className={`bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                    educationVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ animationDelay: `${400 + index * 150}ms` }}
                >
                  {edu.hasIcon && (
                    <div className="flex items-center gap-3 mb-3">
                      <GraduationCap className="text-blue-600 dark:text-blue-400" size={24} />
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {edu.title}
                      </h4>
                    </div>
                  )}
                  {!edu.hasIcon && (
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {edu.title}
                    </h4>
                  )}
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {edu.description}<br />
                    <span className="text-blue-600 dark:text-blue-400">{edu.school}</span><br />
                    <span className="text-xs text-gray-500 dark:text-gray-400">{edu.period}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Strengths */}
        <div 
          ref={strengthsRef}
          className={`mt-16 transition-all duration-600 delay-400 ${
            strengthsVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="text-2xl font-semibold text-center mb-8 text-gray-900 dark:text-white">
            Key Strengths
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                emoji: "☁️",
                title: "Cloud Architecture",
                description: "Designing and implementing scalable cloud infrastructures across Azure, AWS, and GCP",
                color: "blue"
              },
              {
                emoji: "🔄",
                title: "DevOps Automation",
                description: "Automating infrastructure provisioning and deployment with modern tools",
                color: "green"
              },
              {
                emoji: "🏗️",
                title: "Infrastructure as Code",
                description: "Expert in Terraform and Ansible for reproducible infrastructure management",
                color: "purple"
              }
            ].map((strength, index) => (
              <div 
                key={index}
                className={`text-center group cursor-default transition-all duration-300 hover:scale-105 ${
                  strengthsVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-4'
                }`}
                style={{ animationDelay: `${600 + index * 150}ms` }}
              >
                <div className={`bg-${strength.color}-100 dark:bg-${strength.color}-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl group-hover:animate-bounce">{strength.emoji}</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {strength.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {strength.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

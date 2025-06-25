import { MapPin, Calendar, Languages, GraduationCap } from 'lucide-react'

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
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
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              Personal Information
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="text-blue-600 dark:text-blue-400" size={20} />
                <span className="text-gray-700 dark:text-gray-300">
                  Mersch, Luxembourg
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="text-blue-600 dark:text-blue-400" size={20} />
                <span className="text-gray-700 dark:text-gray-300">
                  Born: March 17, 2000 (25 years old)
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <Languages className="text-blue-600 dark:text-blue-400" size={20} />
                <div className="text-gray-700 dark:text-gray-300">
                  <p className="font-medium mb-2">Languages:</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span>🇱🇺 Luxembourgish (Native)</span>
                    <span>🇩🇪 German (Fluent)</span>
                    <span>🇬🇧 English (Fluent)</span>
                    <span>🇫🇷 French (Fluent)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              Education
            </h3>
            
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <GraduationCap className="text-blue-600 dark:text-blue-400" size={24} />
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Master's Degree
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Master's in IT – Cloud Computing & Mobility<br />
                  <span className="text-blue-600 dark:text-blue-400">Université de Picardie Jules Verne</span><br />
                  <span className="text-xs text-gray-500 dark:text-gray-400">September 2023 – June 2025</span>
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Bachelor's Degree
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Professional License – Networks & Telecommunications<br />
                  <span className="text-blue-600 dark:text-blue-400">Université Grenoble Alpes</span><br />
                  <span className="text-xs text-gray-500 dark:text-gray-400">September 2022 – July 2023</span>
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Technical Diploma
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  BTS Cloud Computing<br />
                  <span className="text-blue-600 dark:text-blue-400">Lycée Guillaume Kroll</span><br />
                  <span className="text-xs text-gray-500 dark:text-gray-400">July 2020 – July 2022</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Strengths */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-center mb-8 text-gray-900 dark:text-white">
            Key Strengths
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">☁️</span>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Cloud Architecture
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Designing and implementing scalable cloud infrastructures across Azure, AWS, and GCP
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                DevOps Automation
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Automating infrastructure provisioning and deployment with modern tools
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏗️</span>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Infrastructure as Code
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Expert in Terraform and Ansible for reproducible infrastructure management
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

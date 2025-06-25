import { Award, ExternalLink } from 'lucide-react'

export function CertificationsSection() {
  const certifications = [
  {
    title: "Microsoft AZ-400",
    subtitle: "DevOps Engineer Expert",
    provider: "Microsoft",
    level: "Expert",
    image: "/images/certifications/microsoft-certified-expert-badge.svg",
    verifyUrl: "https://learn.microsoft.com/api/credentials/share/en-us/NoahGallo-0907/28B525747CAFAF0?sharingId=4F1E05F935934CF2",
    verified: true
  },
  {
    title: "Microsoft AZ-305",
    subtitle: "Azure Solutions Architect Expert",
    provider: "Microsoft",
    level: "Expert",
    image: "/images/certifications/microsoft-certified-expert-badge.svg",
    verifyUrl: "https://learn.microsoft.com/api/credentials/share/en-us/NoahGallo-0907/9B8EFD159360D6F?sharingId=4F1E05F935934CF2",
    verified: true
  },
  {
    title: "Microsoft AZ-104",
    subtitle: "Azure Administrator Associate",
    provider: "Microsoft",
    level: "Associate",
    image: "/images/certifications/microsoft-certified-associate-badge.svg",
    verifyUrl: "https://learn.microsoft.com/en-us/users/noahgallo-0907/credentials/441384d079111f73",
    verified: true
  },
  {
    title: "Microsoft AZ-900",
    subtitle: "Azure Fundamentals",
    provider: "Microsoft",
    level: "Fundamentals",
    image: "/images/certifications/microsoft-certified-fundamentals-badge.svg",
    verifyUrl: "https://learn.microsoft.com/api/credentials/share/en-us/NoahGallo-0907/35D3EB057EA87051?sharingId=4F1E05F935934CF2",
    verified: true
  },
  {
    title: "TOEIC Listening and Reading",
    subtitle: "Score: 970/990 (Listening: 495/495, Reading: 475/495)",
    provider: "ETS Global",
    level: "C2 Proficient",
    image: "/images/certifications/TOEIC_Black_RGB.png",
    verifyUrl: "https://www.etsglobal.org/fr/en/digital-score-report/62F47B1195BDBF5878BAF97CBE84DE9B1476D0B864F86035052845CFAA7EA225Q1BQODlsZWtMNzZDREhHSE56SzR4WFFtN1lXQUowSHhxa0lGUkFwM0VpTWlsVjdO",
    verified: true,
    validUntil: "May 15, 2027"
  },
  {
    title: "Cisco CCNA 1-4 v7",
    subtitle: "Networking Fundamentals",
    provider: "Cisco",
    level: "Course Completion",
    image: "/images/certifications/cisco-ccna-logo.webp",
    verifyUrl: null,
    verified: false
  },
  {
    title: "RedHat Certified System Administrator",
    subtitle: "Linux System Administration",
    provider: "Red Hat",
    level: "Professional",
    image: "/images/certifications/rhcsa.png",
    verifyUrl: "https://www.credly.com/badges/b917704d-9b09-435b-a266-9c3673b2a0ad/linked_in_profile",
    verified: true
  }
]


  const upcomingCerts = [
    {
      title: "CKA",
      subtitle: "Certified Kubernetes Administrator",
      provider: "CNCF",
      status: "In Progress",
      logo: "⎈"
    },
    {
      title: "RHCE",
      subtitle: "Red Hat Certified Engineer",
      provider: "Red Hat",
      status: "Planned",
      logo: "🎩"
    },
    {
      title: "GCP Associate",
      subtitle: "Google Cloud Associate",
      provider: "Google Cloud",
      status: "Planned",
      logo: "☁️"
    }
  ]

  return (
    <section id="certifications" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Certifications & Credentials
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Industry-recognized certifications demonstrating expertise in cloud platforms, DevOps practices, and infrastructure management
          </p>
        </div>

        {/* Current Certifications */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
            Current Certifications
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                {/* Badge Image Section */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-8 flex justify-center items-center">
                  <img 
                    src={cert.image} 
                    alt={cert.title}
                    className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                        {cert.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                        {cert.subtitle}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">
                        {cert.provider}
                      </p>
                    </div>
                    
                    {cert.verified && (
                      <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1.5">
                        <Award size={16} className="text-green-600 dark:text-green-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    cert.level === 'Expert' 
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                        : cert.level === 'Associate' 
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                        : cert.level === 'Professional'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                        : cert.level === 'Fundamentals'
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                        : cert.level === 'C2 Proficient'
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300'
                        : 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300'
                    }`}>
                    {cert.level}
                    </span>


                    {cert.verified && cert.verifyUrl ? (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2"
                      >
                        <ExternalLink size={14} />
                        Verify
                      </a>
                    ) : cert.verified === false ? (
                      <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-lg text-xs font-medium">
                        Course Completed
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Certifications */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
            Upcoming Certifications
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingCerts.map((cert, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-colors group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">{cert.logo}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {cert.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {cert.subtitle}
                  </p>
                  <p className="text-gray-500 dark:text-gray-500 text-xs mb-3">
                    {cert.provider}
                  </p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    cert.status === 'In Progress'
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                  }`}>
                    {cert.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kubestronaut Goal */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
              🎯 Goal: CNCF Kubestronaut
            </h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Working towards achieving the prestigious Kubestronaut certification by completing all 5 CNCF certifications, 
              demonstrating mastery of cloud-native technologies and Kubernetes ecosystem.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

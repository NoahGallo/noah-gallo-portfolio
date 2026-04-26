/**
 * CertificationsSection — three blocks: current certifications grid,
 * upcoming/planned certifications grid, and a "Kubestronaut" goal banner.
 *
 * To add a new certification, add an entry to CURRENT_CERTS or UPCOMING_CERTS
 * below; the layout will adapt automatically.
 */
import { Award, ExternalLink } from 'lucide-react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

type CertLevel =
  | 'Expert'
  | 'Associate'
  | 'Professional'
  | 'Fundamentals'
  | 'C2 Proficient'
  | 'Practitioner'
  | 'Engineer'
  | 'Course Completion'

interface Certification {
  title: string
  subtitle: string
  provider: string
  level: CertLevel
  image: string
  verifyUrl: string | null
  verified: boolean
  validUntil?: string
}

interface UpcomingCert {
  title: string
  subtitle: string
  provider: string
  status: 'Planned' | 'In Progress'
  logo: string
}

// Level → Tailwind classes. Static literals so Tailwind's JIT picks them up.
const LEVEL_BADGE: Record<CertLevel, string> = {
  Expert: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
  Associate: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
  Professional: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
  Fundamentals: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300',
  'C2 Proficient': 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300',
  Practitioner: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300',
  Engineer: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300',
  'Course Completion': 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300',
}

const CURRENT_CERTS: Certification[] = [
  {
    title: 'Microsoft AZ-400',
    subtitle: 'DevOps Engineer Expert',
    provider: 'Microsoft',
    level: 'Expert',
    image: '/images/certifications/microsoft-certified-expert-badge.svg',
    verifyUrl:
      'https://learn.microsoft.com/api/credentials/share/en-us/NoahGallo-0907/28B525747CAFAF0?sharingId=4F1E05F935934CF2',
    verified: true,
  },
  {
    title: 'Microsoft AZ-305',
    subtitle: 'Azure Solutions Architect Expert',
    provider: 'Microsoft',
    level: 'Expert',
    image: '/images/certifications/microsoft-certified-expert-badge.svg',
    verifyUrl:
      'https://learn.microsoft.com/api/credentials/share/en-us/NoahGallo-0907/9B8EFD159360D6F?sharingId=4F1E05F935934CF2',
    verified: true,
  },
  {
    title: 'Google Cloud Associate',
    subtitle: 'Cloud Engineer',
    provider: 'Google Cloud',
    level: 'Associate',
    image: '/images/certifications/gcp_ace.png',
    verifyUrl: 'https://www.credly.com/badges/cdf478b5-9dd9-4c02-82cf-ee0bddabff8b/public_url',
    verified: true,
  },
  {
    title: 'Microsoft AZ-104',
    subtitle: 'Azure Administrator Associate',
    provider: 'Microsoft',
    level: 'Associate',
    image: '/images/certifications/microsoft-certified-associate-badge.svg',
    verifyUrl:
      'https://learn.microsoft.com/en-us/users/noahgallo-0907/credentials/441384d079111f73',
    verified: true,
  },
  {
    title: 'Microsoft AZ-900',
    subtitle: 'Azure Fundamentals',
    provider: 'Microsoft',
    level: 'Fundamentals',
    image: '/images/certifications/microsoft-certified-fundamentals-badge.svg',
    verifyUrl:
      'https://learn.microsoft.com/api/credentials/share/en-us/NoahGallo-0907/35D3EB057EA87051?sharingId=4F1E05F935934CF2',
    verified: true,
  },
  {
    title: 'TOEIC Listening and Reading',
    subtitle: 'Score: 970/990 (Listening: 495/495, Reading: 475/495)',
    provider: 'ETS Global',
    level: 'C2 Proficient',
    image: '/images/certifications/TOEIC_Black_RGB.png',
    verifyUrl:
      'https://www.etsglobal.org/fr/en/digital-score-report/62F47B1195BDBF5878BAF97CBE84DE9B1476D0B864F86035052845CFAA7EA225Q1BQODlsZWtMNzZDREhHSE56SzR4WFFtN1lXQUowSHhxa0lGUkFwM0VpTWlsVjdO',
    verified: true,
    validUntil: 'May 15, 2027',
  },
  {
    title: 'Cisco CCNA 1-4 v7',
    subtitle: 'Networking Fundamentals',
    provider: 'Cisco',
    level: 'Course Completion',
    image: '/images/certifications/cisco-ccna-logo.webp',
    verifyUrl: null,
    verified: false,
  },
  {
    title: 'RedHat Certified System Administrator',
    subtitle: 'Linux System Administration',
    provider: 'Red Hat',
    level: 'Professional',
    image: '/images/certifications/rhcsa.png',
    verifyUrl: 'https://www.credly.com/badges/b917704d-9b09-435b-a266-9c3673b2a0ad/linked_in_profile',
    verified: true,
  },
  {
    title: 'Red Hat Certified Engineer',
    subtitle: 'Linux Automation & Configuration Management',
    provider: 'Red Hat',
    level: 'Professional',
    image: '/images/certifications/rhce.png',
    verifyUrl: 'https://www.credly.com/badges/868b69ef-f08b-47e0-b9fa-a5f5376f9bc8/linked_in_profile',
    verified: true,
  },
  {
    title: 'CKA',
    subtitle: 'Certified Kubernetes Administrator',
    provider: 'CNCF',
    level: 'Professional',
    image: '/images/certifications/cka.png',
    verifyUrl: 'https://www.credly.com/badges/e104264a-7b4f-445f-a503-54b80aa342b0/linked_in_profile',
    verified: true,
  },
  {
    title: 'CKS',
    subtitle: 'Certified Kubernetes Security Specialist',
    provider: 'CNCF',
    level: 'Professional',
    image: '/images/certifications/cks.png',
    verifyUrl: 'https://www.credly.com/badges/ffd354d2-51b4-4e0d-a6f2-5db285f4dc4a/public_url',
    verified: true,
  },
  {
    title: 'FinOps Certified Practitioner',
    subtitle: 'Cloud Financial Operations',
    provider: 'FinOps Foundation',
    level: 'Practitioner',
    image: '/images/certifications/focp.png',
    verifyUrl: 'https://www.credly.com/badges/5a335b48-773c-4d59-97df-8539b943db94/public_url',
    verified: true,
  },
  {
    title: 'FinOps Certified Engineer',
    subtitle: 'Cloud Cost Optimization & Engineering',
    provider: 'FinOps Foundation',
    level: 'Engineer',
    image: '/images/certifications/foce.png',
    verifyUrl: 'https://www.credly.com/badges/a8ce1006-ab48-4a23-a32e-5c22120c2cf7/public_url',
    verified: true,
  },
]

const UPCOMING_CERTS: UpcomingCert[] = [
  { title: 'AWS SAA-C03', subtitle: 'AWS Solutions Architect Associate', provider: 'Amazon Web Services', status: 'Planned', logo: '☁️' },
  { title: 'Terraform Associate', subtitle: 'Infrastructure as Code', provider: 'HashiCorp', status: 'Planned', logo: '🏗️' },
  { title: 'Google Professional DevOps', subtitle: 'DevOps Engineer', provider: 'Google Cloud', status: 'Planned', logo: '⚙️' },
  { title: 'Google Professional Architect', subtitle: 'Cloud Architect', provider: 'Google Cloud', status: 'Planned', logo: '🏛️' },
  { title: 'EX280', subtitle: 'Red Hat OpenShift Administrator', provider: 'Red Hat', status: 'Planned', logo: '🐧' },
]

function CertCard({ cert, index }: { cert: Certification; index: number }) {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    <div
      ref={ref}
      className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 group hover:-translate-y-1 flex flex-col ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
    >
      {/* Badge image */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-8 flex justify-center items-center">
        <img
          src={cert.image}
          alt={`${cert.title} badge`}
          width={96}
          height={96}
          loading="lazy"
          className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {cert.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{cert.subtitle}</p>
            <p className="text-gray-500 dark:text-gray-400 text-xs">{cert.provider}</p>
          </div>

          {cert.verified && (
            <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1.5">
              <Award size={16} className="text-green-600 dark:text-green-400" />
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-auto gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${LEVEL_BADGE[cert.level]}`}>
            {cert.level}
          </span>

          {cert.verified && cert.verifyUrl ? (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-2 hover:scale-105 hover:shadow-md"
            >
              <ExternalLink size={14} />
              Verify
            </a>
          ) : !cert.verified ? (
            <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-lg text-xs font-medium">
              Course Completed
            </span>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function UpcomingCertCard({ cert, index }: { cert: UpcomingCert; index: number }) {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    <div
      ref={ref}
      className={`bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-500 group hover:-translate-y-1 flex flex-col ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
    >
      <div className="text-center flex-grow flex flex-col">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
          <span className="text-2xl">{cert.logo}</span>
        </div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {cert.title}
        </h4>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{cert.subtitle}</p>
        <p className="text-gray-500 dark:text-gray-500 text-xs mb-3 flex-grow">{cert.provider}</p>
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-auto ${
            cert.status === 'In Progress'
              ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
          }`}
        >
          {cert.status}
        </span>
      </div>
    </div>
  )
}

export function CertificationsSection() {
  const { ref: titleRef, isVisible: titleVisible } = useIntersectionObserver()
  const { ref: goalRef, isVisible: goalVisible } = useIntersectionObserver()

  return (
    <section id="certifications" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Certifications & Credentials
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Industry-recognized certifications demonstrating expertise in cloud platforms, DevOps
            practices, and infrastructure management
          </p>
        </div>

        {/* Current */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
            Current Certifications
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CURRENT_CERTS.map((cert, index) => (
              <CertCard key={cert.title} cert={cert} index={index} />
            ))}
          </div>
        </div>

        {/* Upcoming */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
            Upcoming Certifications
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {UPCOMING_CERTS.map((cert, index) => (
              <UpcomingCertCard key={cert.title} cert={cert} index={index} />
            ))}
          </div>
        </div>

        {/* Kubestronaut goal banner */}
        <div
          ref={goalRef}
          className={`mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-white text-center relative overflow-hidden transition-all duration-700 ease-out hover:scale-[1.01] ${
            goalVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="absolute inset-0 bg-black/10" aria-hidden="true" />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
              🎯 Goal: CNCF Kubestronaut
            </h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Working towards achieving the prestigious Kubestronaut certification by completing
              all 5 CNCF certifications, demonstrating mastery of cloud-native technologies and
              Kubernetes ecosystem.
            </p>
          </div>

          <div
            className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full animate-float"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-4 left-4 w-6 h-6 bg-white/10 rounded-full animate-float"
            style={{ animationDelay: '2s' }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  )
}

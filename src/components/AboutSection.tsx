/**
 * AboutSection — personal info (location, languages), education timeline,
 * and three "key strengths" cards.
 *
 * Uses a single IntersectionObserver for the whole section: child blocks
 * stagger their reveal via `transitionDelay`. Static color classes (e.g.
 * `bg-blue-100`) are used directly instead of template-string interpolation,
 * because Tailwind's JIT scanner can't see dynamic class names.
 */
import { MapPin, Calendar, Languages, GraduationCap } from 'lucide-react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

type StrengthColor = 'blue' | 'green' | 'purple'

// Static class map — Tailwind cannot generate `bg-${color}-100` from template
// strings, so we hand-pick the full class names per color.
const STRENGTH_STYLES: Record<StrengthColor, string> = {
  blue: 'bg-blue-100 dark:bg-blue-900/30',
  green: 'bg-green-100 dark:bg-green-900/30',
  purple: 'bg-purple-100 dark:bg-purple-900/30',
}

const PERSONAL_INFO = [
  { icon: MapPin, text: 'Mersch, Luxembourg' },
  { icon: Calendar, text: 'Born: March 17, 2000 (25 years old)' },
] as const

const LANGUAGES = [
  '🇱🇺 Luxembourgish (Native)',
  '🇩🇪 German (Fluent)',
  '🇬🇧 English (Fluent)',
  '🇫🇷 French (Fluent)',
] as const

const EDUCATION = [
  {
    title: "Master's Degree",
    description: "Master's in IT – Cloud Computing & Mobility",
    school: 'Université de Picardie Jules Verne',
    period: 'September 2023 – June 2025',
    showIcon: true,
  },
  {
    title: "Bachelor's Degree",
    description: 'Professional License – Networks & Telecommunications',
    school: 'Université Grenoble Alpes',
    period: 'September 2022 – July 2023',
    showIcon: false,
  },
  {
    title: 'Technical Diploma',
    description: 'BTS Cloud Computing',
    school: 'Lycée Guillaume Kroll',
    period: 'July 2020 – July 2022',
    showIcon: false,
  },
] as const

const STRENGTHS: Array<{
  emoji: string
  title: string
  description: string
  color: StrengthColor
}> = [
  {
    emoji: '☁️',
    title: 'Cloud Architecture',
    description: 'Designing and implementing scalable cloud infrastructures across Azure, AWS, and GCP',
    color: 'blue',
  },
  {
    emoji: '🔄',
    title: 'DevOps Automation',
    description: 'Automating infrastructure provisioning and deployment with modern tools',
    color: 'green',
  },
  {
    emoji: '🏗️',
    title: 'Infrastructure as Code',
    description: 'Expert in Terraform and Ansible for reproducible infrastructure management',
    color: 'purple',
  },
]

export function AboutSection() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver()

  // Returns class names for a scroll-reveal block with optional slide axis.
  const revealCls = (extra = '', axis: 'y' | 'x' = 'y') => {
    const hidden = axis === 'y' ? 'opacity-0 translate-y-6' : 'opacity-0 -translate-x-6'
    const shown = axis === 'y' ? 'opacity-100 translate-y-0' : 'opacity-100 translate-x-0'
    return `transition-all duration-700 ease-out ${extra} ${isVisible ? shown : hidden}`
  }
  const revealStyle = (delayMs: number) => ({ transitionDelay: `${delayMs}ms` })

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className={revealCls('text-center mb-16')} style={revealStyle(0)}>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Recently graduated Cloud & DevOps Engineer with experience in automating
            infrastructure and designing scalable cloud solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Personal info */}
          <div className={revealCls('', 'x')} style={revealStyle(150)}>
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              Personal Information
            </h3>

            <div className="space-y-4">
              {PERSONAL_INFO.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 transition-transform duration-200 hover:translate-x-1"
                >
                  <Icon className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={20} />
                  <span className="text-gray-700 dark:text-gray-300">{text}</span>
                </div>
              ))}

              <div className="flex items-start gap-3">
                <Languages className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" size={20} />
                <div className="text-gray-700 dark:text-gray-300">
                  <p className="font-medium mb-2">Languages:</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {LANGUAGES.map((lang) => (
                      <span key={lang}>{lang}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Education timeline */}
          <div className={revealCls()} style={revealStyle(250)}>
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Education</h3>

            <div className="space-y-6">
              {EDUCATION.map((edu, index) => (
                <div
                  key={edu.title}
                  className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {edu.showIcon && (
                      <GraduationCap className="text-blue-600 dark:text-blue-400" size={24} />
                    )}
                    <h4 className="font-semibold text-gray-900 dark:text-white">{edu.title}</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {edu.description}
                    <br />
                    <span className="text-blue-600 dark:text-blue-400">{edu.school}</span>
                    <br />
                    <span className="text-xs text-gray-500 dark:text-gray-400">{edu.period}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key strengths */}
        <div className={revealCls('mt-16')} style={revealStyle(400)}>
          <h3 className="text-2xl font-semibold text-center mb-8 text-gray-900 dark:text-white">
            Key Strengths
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {STRENGTHS.map((strength, index) => (
              <div
                key={strength.title}
                className="text-center group cursor-default transition-transform duration-300 hover:-translate-y-1"
                style={{ transitionDelay: `${500 + index * 100}ms` }}
              >
                <div
                  className={`${STRENGTH_STYLES[strength.color]} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="text-2xl">{strength.emoji}</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{strength.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{strength.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

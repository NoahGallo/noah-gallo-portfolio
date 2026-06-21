/**
 * ProjectsSection — editorial numbered list of personal + school projects.
 * Click the title or "Details →" to open a modal with technical breakdown
 * and screenshots; thumbnails open in a fullscreen lightbox (prev/next/dot
 * nav, Escape to close).
 *
 * Order matters: personal/real work leads, school projects follow.
 */
import { Github, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

interface Project {
  title: string
  description: string
  technologies: string[]
  category: string
  githubUrl?: string
  liveUrl?: string
  highlights: string[]
  detailedDescription: string
  images?: string[]
  technicalDetails: string[]
}

const PROJECTS: Project[] = [
  {
    title: 'Portfolio Website & Infrastructure',
    description:
      'This site. React 19 + TypeScript + Tailwind on Azure Static Web Apps, with a Python Azure Functions backend and Cosmos DB for visitor analytics.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Azure Static Web Apps', 'Azure Functions', 'Cosmos DB'],
    category: 'Personal',
    githubUrl: 'https://github.com/NoahGallo/noah-gallo-portfolio',
    liveUrl: 'https://www.noah-gallo.com',
    highlights: [
      'Modern React with TypeScript',
      'Azure Static Web Apps hosting',
      'Serverless backend architecture',
      'Real-time visitor analytics with Cosmos DB',
    ],
    detailedDescription:
      'Modern web application showcasing cloud-native development practices. Built with React 19 and TypeScript for type safety, deployed on Azure Static Web Apps with global CDN distribution. Serverless Python backend handles visitor analytics through Azure Functions with Cosmos DB for persistent storage. Features responsive design with dark/light theme support and optimised performance.',
    technicalDetails: [
      '⚡ React 19 with TypeScript and Tailwind CSS styling framework',
      '☁️ Azure Static Web Apps deployment with global CDN',
      '🔧 Serverless Azure Functions backend with Python runtime',
      '📊 Cosmos DB for scalable visitor analytics storage',
      '🌙 Dynamic theme switching with CSS custom properties',
      '📱 Responsive design optimised for all device sizes',
      '🔒 CORS configuration and secure API endpoints',
    ],
  },
  {
    title: 'Trippify — Travel Itinerary Platform',
    description:
      'Comprehensive travel-planning platform with web + mobile apps, real-time collaboration, microservices on Google Cloud, and automated DevOps.',
    technologies: ['React', 'TypeScript', 'React Native', 'Google Cloud Platform', 'Redis', 'Terraform', 'Docker', 'GitHub Actions'],
    category: "Master's · Team",
    githubUrl: 'https://github.com/NoahGallo/Trippify',
    liveUrl: 'https://trippify-966751668529.europe-west9.run.app/',
    highlights: [
      'Full-stack web app (React/TypeScript) with interactive maps',
      'Mobile companion app (React Native)',
      'Microservices architecture on Google Cloud Platform',
      'Real-time collaboration and budget tracking',
    ],
    detailedDescription:
      "Comprehensive travel-itinerary planning platform developed as a collaborative master's project with classmates Dorian Gruny and Pascal Rohart. The platform helps users create, organise, and share travel experiences through both web and mobile interfaces. Microservices architecture deployed on Google Cloud Platform with Redis caching for performance and an API Gateway for secure backend communication.",
    images: [
      '/images/projects/Trippify.jpg',
      '/images/projects/Trippify-community.jpg',
      '/images/projects/Trippify_architecture.jpg',
      '/images/projects/Trippify_ci_cd.jpg',
    ],
    technicalDetails: [
      '🌐 Web application built with React and TypeScript for detailed trip planning',
      '📱 Mobile app developed with React Native for on-the-go access',
      '☁️ Microservices architecture deployed on Google Cloud Platform',
      '⚡ Redis caching layer for optimal performance and response times',
      '🔒 API Gateway implementation for secure and scalable backend communication',
      '🔧 Infrastructure as Code using Terraform for reproducible deployments',
      '🚀 CI/CD pipelines with GitHub Actions and Docker containerisation',
      '🛡️ Security scanning with Trivy and comprehensive automated testing',
      '🤝 Real-time collaboration features for shared trip planning',
      '💰 Integrated budget tracking and expense management',
      '🌤️ Weather integration for destination planning',
      '🎯 GCP Cloud Vision API for automated content moderation',
      '👥 Community sharing system for travel discovery',
    ],
  },
  {
    title: 'Event-Driven E-commerce Platform',
    description:
      'Distributed microservices with Apache Kafka event streaming, Quarkus services, real-time analytics, and full observability (Prometheus, Grafana, Jaeger).',
    technologies: ['Apache Kafka', 'Quarkus', 'Java', 'Prometheus', 'Grafana', 'Firebase', 'Docker'],
    category: "Master's",
    githubUrl: 'https://github.com/FilleuxStudio/KafkaQuarkusNGKFDF',
    highlights: [
      '3-node Kafka cluster with KRaft architecture',
      'Event-driven microservices (Orders, Inventory, Analytics)',
      'Real-time revenue tracking with Kafka Streams',
      'Complete observability: Prometheus, Grafana, Jaeger',
    ],
    detailedDescription:
      'Advanced microservices architecture leveraging Apache Kafka for event streaming and Quarkus for high-performance service development. The system implements event sourcing patterns with CQRS for order processing, real-time inventory management, and stream processing for analytics. Features a 3-node Kafka cluster using KRaft consensus protocol, eliminating ZooKeeper dependencies. Comprehensive monitoring and tracing implemented with Prometheus metrics collection, Grafana dashboards, and Jaeger distributed tracing.',
    images: [
      '/images/projects/kafka-architecture.jpg',
      '/images/projects/kafka-analytics.jpg',
      '/images/projects/kafka-inventory.jpg',
      '/images/projects/kafka-products.jpg',
      '/images/projects/kafka-product-detail.jpg',
    ],
    technicalDetails: [
      '🏗️ Microservices architecture with event sourcing and CQRS patterns',
      '📊 3-node Kafka cluster with KRaft consensus (ZooKeeper-free)',
      '🔄 Asynchronous event-driven communication between services',
      '📈 Real-time stream processing with Kafka Streams for revenue analytics',
      '🎯 Distributed tracing with Jaeger for request correlation',
      '⚡ High-performance reactive services built with Quarkus framework',
      '📊 Custom Prometheus metrics and Grafana monitoring dashboards',
      '🔧 Firebase integration for real-time inventory synchronisation',
    ],
  },
]

function ProjectRow({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: () => void
}) {
  const { ref, isVisible } = useIntersectionObserver<HTMLElement>()

  return (
    <article
      ref={ref}
      className={`group grid md:grid-cols-[60px_1fr_auto] gap-6 md:gap-10 py-10 first:pt-0 border-t border-edge first:border-t-0 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="font-display text-5xl font-light text-muted/70 leading-none">
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className="min-w-0">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-2">
          {project.category}
        </p>
        <h3 className="font-display text-2xl md:text-3xl font-semibold text-ink">
          <button
            onClick={onOpen}
            className="focus-ring text-left hover:text-accent transition-colors rounded-sm"
          >
            {project.title}
          </button>
        </h3>
        <p className="text-muted mt-3 leading-relaxed max-w-2xl">{project.description}</p>
        <div className="flex flex-wrap mt-4 font-mono text-xs uppercase tracking-wider text-ink/80">
          {project.technologies.map((tech, i) => (
            <span key={tech} className="inline-flex items-baseline whitespace-nowrap">
              {i > 0 && (
                <span className="text-muted/50 mx-3 select-none" aria-hidden="true">
                  ·
                </span>
              )}
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex md:flex-col gap-x-5 gap-y-2 md:items-end font-mono text-xs uppercase tracking-wider">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring text-muted hover:text-accent transition-colors flex items-center gap-2 rounded-sm"
          >
            <Github size={14} />
            Repo
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring text-muted hover:text-accent transition-colors flex items-center gap-2 rounded-sm"
          >
            <ExternalLink size={14} />
            Live
          </a>
        )}
        <button
          onClick={onOpen}
          className="focus-ring text-accent hover:underline rounded-sm"
        >
          Details →
        </button>
      </div>
    </article>
  )
}

export function ProjectsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useIntersectionObserver()

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [currentImage, setCurrentImage] = useState(0)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  const expanded = expandedIndex !== null ? PROJECTS[expandedIndex] : null

  const closeModal = useCallback(() => {
    setExpandedIndex(null)
    setIsViewerOpen(false)
  }, [])

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index)
    setIsViewerOpen(true)
  }, [])

  const closeImageViewer = useCallback(() => {
    setCurrentImage(0)
    setIsViewerOpen(false)
  }, [])

  const nextImage = useCallback(() => {
    if (!expanded?.images) return
    setCurrentImage((prev) => (prev < expanded.images!.length - 1 ? prev + 1 : 0))
  }, [expanded])

  const prevImage = useCallback(() => {
    if (!expanded?.images) return
    setCurrentImage((prev) => (prev > 0 ? prev - 1 : expanded.images!.length - 1))
  }, [expanded])

  // Keyboard support: Escape closes the topmost overlay; arrows navigate the lightbox
  useEffect(() => {
    if (expandedIndex === null) return

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isViewerOpen) closeImageViewer()
        else closeModal()
      }
      if (isViewerOpen) {
        if (e.key === 'ArrowRight') nextImage()
        if (e.key === 'ArrowLeft') prevImage()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [expandedIndex, isViewerOpen, closeModal, closeImageViewer, nextImage, prevImage])

  // Lock body scroll while modal is open
  useEffect(() => {
    if (expandedIndex === null) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [expandedIndex])

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`mb-16 transition-all duration-700 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
            06 · Projects
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink">
            Personal builds and lab work.
          </h2>
          <p className="text-muted mt-4 max-w-2xl">
            Client production work lives in the experience section. The projects below are personal
            builds and master's coursework — useful for showing how I think about architecture,
            event streaming, and end-to-end delivery.
          </p>
        </div>

        <div>
          {PROJECTS.map((project, index) => (
            <ProjectRow
              key={project.title}
              project={project}
              index={index}
              onOpen={() => setExpandedIndex(index)}
            />
          ))}
        </div>

        {/* Project detail modal */}
        {expanded && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label={`${expanded.title} details`}
          >
            <div
              className="bg-surface border border-edge rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border-b border-edge p-6 flex justify-between items-start gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-2">
                    {expanded.category}
                  </p>
                  <h3 className="font-display text-2xl font-bold text-ink">{expanded.title}</h3>
                </div>
                <button
                  onClick={closeModal}
                  className="focus-ring border border-edge hover:border-accent hover:text-accent p-2 rounded-md transition-colors duration-200 flex-shrink-0"
                  aria-label="Close project details"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <p className="text-muted mb-8 leading-relaxed">
                  {expanded.detailedDescription}
                </p>

                <div className="mb-8">
                  <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
                    Technical Implementation
                  </h4>
                  <div className="space-y-2">
                    {expanded.technicalDetails.map((detail, idx) => (
                      <div key={idx} className="text-ink/85 text-sm">
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>

                {expanded.images && (
                  <div className="mb-8">
                    <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
                      Screenshots&nbsp;&nbsp;<span className="text-muted normal-case tracking-normal">(click to enlarge)</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {expanded.images.map((image, idx) => (
                        <button
                          key={image}
                          className="focus-ring bg-surface-2 border border-edge rounded-md overflow-hidden hover:border-accent transition-colors duration-200 cursor-pointer group"
                          onClick={() => openImageViewer(idx)}
                          aria-label={`Enlarge screenshot ${idx + 1}`}
                        >
                          <img
                            src={image}
                            alt={`${expanded.title} screenshot ${idx + 1}`}
                            className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                            loading="lazy"
                            width={600}
                            height={400}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {expanded.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="border border-edge text-ink/85 font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fullscreen image lightbox */}
        {isViewerOpen && expanded?.images && (
          <div
            className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4"
            onClick={closeImageViewer}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <div className="relative max-w-6xl max-h-full">
              <img
                src={expanded.images[currentImage]}
                alt={`${expanded.title} screenshot ${currentImage + 1}`}
                className="max-w-full max-h-[85vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
                className="focus-ring absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-transform duration-200 hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
                className="focus-ring absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-transform duration-200 hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>

              <button
                onClick={closeImageViewer}
                className="focus-ring absolute top-4 right-4 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-transform duration-200 hover:rotate-90"
                aria-label="Close image"
              >
                <X size={24} />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full font-mono text-xs">
                {currentImage + 1} / {expanded.images.length}
              </div>

              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
                {expanded.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentImage(idx)
                    }}
                    className={`focus-ring w-2 h-2 rounded-full transition-all duration-200 ${
                      idx === currentImage
                        ? 'bg-white scale-125'
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

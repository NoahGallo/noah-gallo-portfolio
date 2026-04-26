/**
 * ProjectsSection — featured projects grid + per-project detail modal +
 * fullscreen image lightbox.
 *
 * Each project card opens a modal with technical details and screenshots.
 * Clicking a screenshot opens a fullscreen lightbox with prev/next/dot
 * navigation, also closeable with Escape via the document-level listener.
 */
import { Github, ExternalLink, Cloud, Database, X, Users, ChevronLeft, ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

interface Project {
  title: string
  description: string
  technologies: string[]
  category: string
  icon: ReactNode
  gradient: string
  githubUrl?: string
  liveUrl?: string
  highlights: string[]
  detailedDescription: string
  images?: string[]
  technicalDetails: string[]
}

const PROJECTS: Project[] = [
  {
    title: 'Trippify - Travel Itinerary Platform',
    description:
      'Comprehensive travel planning platform with web and mobile apps, featuring real-time collaboration, microservices architecture on Google Cloud Platform, and automated DevOps practices.',
    technologies: ['React', 'TypeScript', 'React Native', 'Google Cloud Platform', 'Redis', 'Terraform', 'Docker', 'GitHub Actions'],
    category: 'Masters Project (Team)',
    icon: <Users className="w-6 h-6" />,
    gradient: 'from-green-500 to-teal-500',
    githubUrl: 'https://github.com/NoahGallo/Trippify',
    liveUrl: 'https://trippify-966751668529.europe-west9.run.app/',
    highlights: [
      'Full-stack web app (React/TypeScript) with interactive maps',
      'Mobile companion app (React Native)',
      'Microservices architecture on Google Cloud Platform',
      'Real-time collaboration and budget tracking',
    ],
    detailedDescription:
      'Comprehensive travel itinerary planning platform developed as a collaborative masters project with classmates Dorian GRUNY and Pascal Rohart. The platform helps users create, organize, and share their travel experiences through both web and mobile interfaces. Features microservices architecture deployed on Google Cloud Platform with Redis caching for optimal performance and API Gateway for secure backend communication.',
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
      '🚀 CI/CD pipelines with GitHub Actions and Docker containerization',
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
      'Distributed microservices architecture implementing event streaming with Apache Kafka, real-time analytics, and comprehensive observability for high-throughput e-commerce operations.',
    technologies: ['Apache Kafka', 'Quarkus', 'Java', 'Prometheus', 'Grafana', 'Firebase', 'Docker'],
    category: 'Masters Project',
    icon: <Database className="w-6 h-6" />,
    gradient: 'from-orange-500 to-red-500',
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
      '🔧 Firebase integration for real-time inventory synchronization',
    ],
  },
  {
    title: 'Portfolio Website & Infrastructure',
    description:
      'Full-stack portfolio solution with serverless architecture, featuring React frontend, Azure Functions backend, and real-time visitor analytics with global CDN distribution.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Azure Functions', 'Cosmos DB'],
    category: 'Personal Project',
    icon: <Cloud className="w-6 h-6" />,
    gradient: 'from-indigo-500 to-purple-500',
    githubUrl: 'https://github.com/NoahGallo/noah-gallo-portfolio',
    liveUrl: 'https://www.noah-gallo.com',
    highlights: [
      'Modern React with TypeScript',
      'Azure Static Web Apps hosting',
      'Serverless backend architecture',
      'Real-time visitor analytics with Cosmos DB',
    ],
    detailedDescription:
      'Modern web application showcasing cloud-native development practices. Built with React 18 and TypeScript for type safety, deployed on Azure Static Web Apps with global CDN distribution. Serverless Python backend handles visitor analytics through Azure Functions with Cosmos DB for persistent storage. Features responsive design with dark/light theme support and optimized performance.',
    technicalDetails: [
      '⚡ React 18 with TypeScript and Tailwind CSS styling framework',
      '☁️ Azure Static Web Apps deployment with global CDN',
      '🔧 Serverless Azure Functions backend with Python runtime',
      '📊 Cosmos DB for scalable visitor analytics storage',
      '🌙 Dynamic theme switching with CSS custom properties',
      '📱 Responsive design optimized for all device sizes',
      '🔒 CORS configuration and secure API endpoints',
    ],
  },
]

function ProjectCard({ project, onOpen, index }: { project: Project; onOpen: () => void; index: number }) {
  const { ref, isVisible } = useIntersectionObserver<HTMLButtonElement>()

  return (
    <button
      ref={ref}
      onClick={onOpen}
      className={`focus-ring text-left bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 group cursor-pointer hover:-translate-y-1 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Header */}
      <div className={`bg-gradient-to-r ${project.gradient} p-6 text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-white/10 transform -skew-y-1 translate-y-8 group-hover:translate-y-4 transition-transform duration-500" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                {project.icon}
              </div>
              <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                {project.category}
              </span>
            </div>

            <div className="flex gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-all duration-200 hover:scale-110"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`${project.title} on GitHub`}
                >
                  <Github size={18} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-all duration-200 hover:scale-110"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`${project.title} live site`}
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          </div>
          <h3 className="text-xl font-bold">{project.title}</h3>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-gray-500 text-xs px-2 py-1">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        <span className="text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:underline">
          Click to view details →
        </span>
      </div>
    </button>
  )
}

export function ProjectsSection() {
  const { ref: titleRef, isVisible: titleVisible } = useIntersectionObserver()

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
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Key projects demonstrating expertise in cloud infrastructure, event-driven
            architectures, and modern development practices
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard
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
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label={`${expanded.title} details`}
          >
            <div
              className="bg-white dark:bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`bg-gradient-to-r ${expanded.gradient} p-6 text-white flex justify-between items-center`}>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{expanded.title}</h3>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    {expanded.category}
                  </span>
                </div>
                <button
                  onClick={closeModal}
                  className="focus-ring bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-transform duration-200 hover:rotate-90"
                  aria-label="Close project details"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {expanded.detailedDescription}
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Technical Implementation:
                  </h4>
                  <div className="space-y-2">
                    {expanded.technicalDetails.map((detail, idx) => (
                      <div key={idx} className="text-gray-600 dark:text-gray-300 text-sm">
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>

                {expanded.images && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Project Screenshots (click to enlarge):
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {expanded.images.map((image, idx) => (
                        <button
                          key={image}
                          className="focus-ring bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden hover:scale-[1.02] transition-transform duration-200 cursor-pointer group relative"
                          onClick={() => openImageViewer(idx)}
                          aria-label={`Enlarge screenshot ${idx + 1}`}
                        >
                          <img
                            src={image}
                            alt={`${expanded.title} screenshot ${idx + 1}`}
                            className="w-full h-48 object-cover rounded-lg group-hover:opacity-90 transition-opacity"
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
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Technologies Used:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {expanded.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium"
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
                onClick={(e) => { e.stopPropagation(); prevImage() }}
                className="focus-ring absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-transform duration-200 hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage() }}
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

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                {currentImage + 1} / {expanded.images.length}
              </div>

              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
                {expanded.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setCurrentImage(idx) }}
                    className={`focus-ring w-2 h-2 rounded-full transition-all duration-200 ${
                      idx === currentImage ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
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

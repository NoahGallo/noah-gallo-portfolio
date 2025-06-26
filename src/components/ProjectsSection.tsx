import { Github, ExternalLink, Cloud, Database, X, Users } from 'lucide-react'
import { useState, useCallback } from 'react'

export function ProjectsSection() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null)
  const [currentImage, setCurrentImage] = useState(0)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  const projects = [
    {
      title: "Trippify - Travel Itinerary Platform",
      description: "Comprehensive travel planning platform with web and mobile apps, featuring real-time collaboration, microservices architecture on Google Cloud Platform, and automated DevOps practices.",
      technologies: ["React", "TypeScript", "React Native", "Google Cloud Platform", "Redis", "Terraform", "Docker", "GitHub Actions"],
      category: "Masters Project (Team)",
      icon: <Users className="w-6 h-6" />,
      color: "from-green-500 to-teal-500",
      githubUrl: "https://github.com/NoahGallo/Trippify",
      liveUrl: "https://trippify-966751668529.europe-west9.run.app/",
      highlights: [
        "Full-stack web app (React/TypeScript) with interactive maps",
        "Mobile companion app (React Native)",
        "Microservices architecture on Google Cloud Platform",
        "Real-time collaboration and budget tracking"
      ],
      detailedDescription: "Comprehensive travel itinerary planning platform developed as a collaborative masters project with classmates Dorian GRUNY and Pascal Rohart. The platform helps users create, organize, and share their travel experiences through both web and mobile interfaces. Features microservices architecture deployed on Google Cloud Platform with Redis caching for optimal performance and API Gateway for secure backend communication.",
      images: [
        "/images/projects/Trippify.jpg",
        "/images/projects/Trippify-community.jpg",
        "/images/projects/Trippify_architecture.jpg",
        "/images/projects/Trippify_ci_cd.jpg"
      ],
      technicalDetails: [
        "🌐 Web application built with React and TypeScript for detailed trip planning",
        "📱 Mobile app developed with React Native for on-the-go access",
        "☁️ Microservices architecture deployed on Google Cloud Platform",
        "⚡ Redis caching layer for optimal performance and response times",
        "🔒 API Gateway implementation for secure and scalable backend communication",
        "🔧 Infrastructure as Code using Terraform for reproducible deployments",
        "🚀 CI/CD pipelines with GitHub Actions and Docker containerization",
        "🛡️ Security scanning with Trivy and comprehensive automated testing",
        "🤝 Real-time collaboration features for shared trip planning",
        "💰 Integrated budget tracking and expense management",
        "🌤️ Weather integration for destination planning",
        "🎯 GCP Cloud Vision API for automated content moderation",
        "👥 Community sharing system for travel discovery"
      ]
    },
    {
      title: "Event-Driven E-commerce Platform",
      description: "Distributed microservices architecture implementing event streaming with Apache Kafka, real-time analytics, and comprehensive observability for high-throughput e-commerce operations.",
      technologies: ["Apache Kafka", "Quarkus", "Java", "Prometheus", "Grafana", "Firebase", "Docker"],
      category: "Masters Project",
      icon: <Database className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      githubUrl: "https://github.com/FilleuxStudio/KafkaQuarkusNGKFDF",
      highlights: [
        "3-node Kafka cluster with KRaft architecture",
        "Event-driven microservices (Orders, Inventory, Analytics)",
        "Real-time revenue tracking with Kafka Streams",
        "Complete observability: Prometheus, Grafana, Jaeger"
      ],
      detailedDescription: "Advanced microservices architecture leveraging Apache Kafka for event streaming and Quarkus for high-performance service development. The system implements event sourcing patterns with CQRS for order processing, real-time inventory management, and stream processing for analytics. Features a 3-node Kafka cluster using KRaft consensus protocol, eliminating ZooKeeper dependencies. Comprehensive monitoring and tracing implemented with Prometheus metrics collection, Grafana dashboards, and Jaeger distributed tracing.",
      images: [
        "/images/projects/kafka-architecture.jpg",
        "/images/projects/kafka-analytics.jpg", 
        "/images/projects/kafka-inventory.jpg",
        "/images/projects/kafka-products.jpg",
        "/images/projects/kafka-product-detail.jpg"
      ],
      technicalDetails: [
        "🏗️ Microservices architecture with event sourcing and CQRS patterns",
        "📊 3-node Kafka cluster with KRaft consensus (ZooKeeper-free)",
        "🔄 Asynchronous event-driven communication between services",
        "📈 Real-time stream processing with Kafka Streams for revenue analytics",
        "🎯 Distributed tracing with Jaeger for request correlation",
        "⚡ High-performance reactive services built with Quarkus framework",
        "📊 Custom Prometheus metrics and Grafana monitoring dashboards",
        "🔧 Firebase integration for real-time inventory synchronization"
      ]
    },
    {
      title: "Portfolio Website & Infrastructure",
      description: "Full-stack portfolio solution with serverless architecture, featuring React frontend, Azure Functions backend, and real-time visitor analytics with global CDN distribution.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Azure Functions", "Cosmos DB"],
      category: "Personal Project",
      icon: <Cloud className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-500",
      githubUrl: "https://github.com/NoahGallo/noah-gallo-portfolio",
      liveUrl: "https://www.noah-gallo.com",
      highlights: [
        "Modern React with TypeScript",
        "Azure Static Web Apps hosting",
        "Serverless backend architecture", 
        "Real-time visitor analytics with Cosmos DB"
      ],
      detailedDescription: "Modern web application showcasing cloud-native development practices. Built with React 18 and TypeScript for type safety, deployed on Azure Static Web Apps with global CDN distribution. Serverless Python backend handles visitor analytics through Azure Functions with Cosmos DB for persistent storage. Features responsive design with dark/light theme support and optimized performance.",
      technicalDetails: [
        "⚡ React 18 with TypeScript and Tailwind CSS styling framework",
        "☁️ Azure Static Web Apps deployment with global CDN",
        "🔧 Serverless Azure Functions backend with Python runtime",
        "📊 Cosmos DB for scalable visitor analytics storage",
        "🌙 Dynamic theme switching with CSS custom properties",
        "📱 Responsive design optimized for all device sizes",
        "🔒 CORS configuration and secure API endpoints"
      ]
    }
  ]

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index)
    setIsViewerOpen(true)
  }, [])

  const closeImageViewer = () => {
    setCurrentImage(0)
    setIsViewerOpen(false)
  }

  const nextImage = () => {
    if (expandedProject !== null) {
      setCurrentImage((prev) => 
        prev < projects[expandedProject].images.length - 1 ? prev + 1 : 0
      )
    }
  }

  const prevImage = () => {
    if (expandedProject !== null) {
      setCurrentImage((prev) => 
        prev > 0 ? prev - 1 : projects[expandedProject].images.length - 1
      )
    }
  }

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Key projects demonstrating expertise in cloud infrastructure, event-driven architectures, and modern development practices
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                 onClick={() => setExpandedProject(index)}>
              {/* Header */}
              <div className={`bg-gradient-to-r ${project.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
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
                        className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-bold">{project.title}</h3>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
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

                <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                  Click to view details →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Expanded Project Modal */}
        {expandedProject !== null && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
               onClick={() => setExpandedProject(null)}>
            <div className="bg-white dark:bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                 onClick={(e) => e.stopPropagation()}>
              
              {/* Modal Header */}
              <div className={`bg-gradient-to-r ${projects[expandedProject].color} p-6 text-white flex justify-between items-center`}>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{projects[expandedProject].title}</h3>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    {projects[expandedProject].category}
                  </span>
                </div>
                <button 
                  onClick={() => setExpandedProject(null)}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {projects[expandedProject].detailedDescription}
                </p>

                {/* Technical Details */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Technical Implementation:</h4>
                  <div className="space-y-2">
                    {projects[expandedProject].technicalDetails?.map((detail, idx) => (
                      <div key={idx} className="text-gray-600 dark:text-gray-300 text-sm">
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clickable Project Screenshots */}
                {projects[expandedProject].images && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Project Screenshots (Click to view fullscreen):
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {projects[expandedProject].images.map((image, idx) => (
                        <div 
                          key={idx} 
                          className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer group relative"
                          onClick={() => openImageViewer(idx)}
                        >
                          <img 
                            src={image} 
                            alt={`${projects[expandedProject].title} ${idx + 1}`} 
                            className="w-full h-48 object-cover rounded-lg group-hover:opacity-90 transition-opacity"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                              Click to enlarge
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {projects[expandedProject].technologies.map((tech, idx) => (
                      <span
                        key={idx}
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

        {/* Improved Image Lightbox with Better Arrow Visibility */}
        {isViewerOpen && expandedProject !== null && (
          <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4"
               onClick={closeImageViewer}>
            <div className="relative max-w-6xl max-h-full">
              <img 
                src={projects[expandedProject].images[currentImage]} 
                alt={`${projects[expandedProject].title} ${currentImage + 1}`}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Improved Navigation Arrows with Better Visibility */}
              <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all backdrop-blur-sm border border-white/20 shadow-lg"
              >
                <span className="text-xl font-bold">←</span>
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all backdrop-blur-sm border border-white/20 shadow-lg"
              >
                <span className="text-xl font-bold">→</span>
              </button>
              
              {/* Improved Close button */}
              <button 
                onClick={closeImageViewer}
                className="absolute top-4 right-4 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all backdrop-blur-sm border border-white/20 shadow-lg"
              >
                <X size={24} />
              </button>
              
              {/* Improved Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm border border-white/20 shadow-lg">
                {currentImage + 1} / {projects[expandedProject].images.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

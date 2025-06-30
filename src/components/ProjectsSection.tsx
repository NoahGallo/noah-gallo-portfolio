import { Github, ExternalLink, Cloud, Database, X, Users, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useCallback } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

export function ProjectsSection() {
  const { ref: titleRef, hasIntersected: titleVisible } = useIntersectionObserver()
  const { ref: projectsRef, hasIntersected: projectsVisible } = useIntersectionObserver()
  
  const [expandedProject, setExpandedProject] = useState<number | null>(null)
  const [currentImage, setCurrentImage] = useState(0)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [isModalAnimating, setIsModalAnimating] = useState(false)

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

  const openModal = (index: number) => {
    setIsModalAnimating(true)
    setExpandedProject(index)
    setTimeout(() => setIsModalAnimating(false), 50)
  }

  const closeModal = () => {
    setIsModalAnimating(true)
    setTimeout(() => {
      setExpandedProject(null)
      setIsModalAnimating(false)
    }, 200)
  }

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
      const project = projects[expandedProject]
      if (project && project.images) {
        setCurrentImage((prev) => 
          prev < project.images.length - 1 ? prev + 1 : 0
        )
      }
    }
  }

  const prevImage = () => {
    if (expandedProject !== null) {
      const project = projects[expandedProject]
      if (project && project.images) {
        setCurrentImage((prev) => 
          prev > 0 ? prev - 1 : project.images.length - 1
        )
      }
    }
  }

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-600 ${
            titleVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Key projects demonstrating expertise in cloud infrastructure, event-driven architectures, and modern development practices
          </p>
        </div>

        <div 
          ref={projectsRef}
          className="grid lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <div 
              key={index} 
              className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:scale-105 hover:-translate-y-2 ${
                projectsVisible ? 'animate-scaleIn' : 'opacity-0 scale-90'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
              onClick={() => openModal(index)}
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${project.color} p-6 text-white relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/10 transform -skew-y-1 translate-y-8 group-hover:translate-y-4 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 p-2 rounded-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        {project.icon}
                      </div>
                      <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full group-hover:bg-white/30 transition-colors">
                        {project.category}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-all duration-300 hover:scale-110"
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
                          className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-all duration-300 hover:scale-110"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-white/90 transition-colors">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-all duration-300 hover:scale-105"
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

                <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                  Click to view details →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Project Modal with Smooth Animations */}
        {expandedProject !== null && projects[expandedProject] && (
          <div 
            className={`fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
              isModalAnimating ? 'opacity-0' : 'opacity-100'
            }`}
            onClick={closeModal}
          >
            <div 
              className={`bg-white dark:bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
                isModalAnimating ? 'scale-95 opacity-0 translate-y-4' : 'scale-100 opacity-100 translate-y-0'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Modal Header with Enhanced Animation */}
              <div className={`bg-gradient-to-r ${projects[expandedProject].color} p-6 text-white flex justify-between items-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/10 transform -skew-y-1 translate-y-full animate-slideInDown"></div>
                <div className="relative z-10 animate-fadeInLeft">
                  <h3 className="text-2xl font-bold mb-2">{projects[expandedProject].title}</h3>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    {projects[expandedProject].category}
                  </span>
                </div>
                <button 
                  onClick={closeModal}
                  className="relative z-10 bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-90 animate-fadeInRight"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content with Staggered Animations */}
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed animate-fadeInUp">
                  {projects[expandedProject].detailedDescription}
                </p>

                {/* Technical Details with Staggered Animation */}
                <div className="mb-6 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Technical Implementation:</h4>
                  <div className="space-y-2">
                    {projects[expandedProject].technicalDetails?.map((detail, idx) => (
                      <div 
                        key={idx} 
                        className="text-gray-600 dark:text-gray-300 text-sm hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200 animate-fadeIn"
                        style={{ animationDelay: `${300 + idx * 50}ms` }}
                      >
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Image Gallery with Smooth Transitions */}
                {projects[expandedProject].images && (
                  <div className="mb-6 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Project Screenshots (Click to view fullscreen):
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {projects[expandedProject].images.map((image, idx) => (
                        <div 
                          key={idx} 
                          className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer group relative animate-scaleIn"
                          style={{ animationDelay: `${500 + idx * 100}ms` }}
                          onClick={() => openImageViewer(idx)}
                        >
                          <img 
                            src={image} 
                            alt={`${projects[expandedProject]!.title} ${idx + 1}`} 
                            className="w-full h-48 object-cover rounded-lg group-hover:opacity-90 transition-opacity"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium transform translate-y-2 group-hover:translate-y-0">
                              Click to enlarge ✨
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies with Individual Animations */}
                <div className="animate-fadeInUp" style={{ animationDelay: '600ms' }}>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {projects[expandedProject].technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium hover:scale-105 transition-all duration-300 animate-fadeIn"
                        style={{ animationDelay: `${700 + idx * 50}ms` }}
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

        {/* Enhanced Image Lightbox with Smooth Transitions */}
        {isViewerOpen && expandedProject !== null && projects[expandedProject]?.images && (
          <div 
            className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4 animate-fadeIn"
            onClick={closeImageViewer}
          >
            <div className="relative max-w-6xl max-h-full animate-scaleIn">
              <img 
                src={projects[expandedProject]!.images[currentImage]} 
                alt={`${projects[expandedProject]!.title} ${currentImage + 1}`}
                className="max-w-full max-h-full object-contain transition-all duration-500"
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Enhanced Navigation with Better UX */}
              <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg hover:scale-110 group"
              >
                <ChevronLeft size={24} className="group-hover:animate-pulse" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg hover:scale-110 group"
              >
                <ChevronRight size={24} className="group-hover:animate-pulse" />
              </button>
              
              {/* Enhanced Close Button */}
              <button 
                onClick={closeImageViewer}
                className="absolute top-4 right-4 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg hover:scale-110 hover:rotate-90"
              >
                <X size={24} />
              </button>
              
              {/* Enhanced Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-full text-sm backdrop-blur-sm border border-white/20 shadow-lg animate-fadeIn">
                <span className="font-medium">{currentImage + 1}</span>
                <span className="mx-2 opacity-60">/</span>
                <span className="opacity-80">{projects[expandedProject]!.images.length}</span>
              </div>

              {/* Image Navigation Dots */}
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2">
                {projects[expandedProject]!.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setCurrentImage(idx); }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentImage 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/80 hover:scale-110'
                    }`}
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

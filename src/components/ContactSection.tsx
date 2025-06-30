import { Mail, Phone, MapPin, Linkedin, Github, Send } from 'lucide-react'
import { useState } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

export function ContactSection() {
  const { ref: titleRef, hasIntersected: titleVisible } = useIntersectionObserver()
  const { ref: contentRef, hasIntersected: contentVisible } = useIntersectionObserver()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailtoLink = `mailto:gallo.noah@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Hello Noah,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`
    window.location.href = mailtoLink
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-600 ${
            titleVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ready to discuss cloud infrastructure, DevOps automation, or potential opportunities? 
            I'd love to hear from you!
          </p>
        </div>

        <div 
          ref={contentRef}
          className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
        >
          {/* Contact Information */}
          <div className={`transition-all duration-600 delay-200 ${
            contentVisible ? 'animate-slideInLeft' : 'opacity-0 -translate-x-8'
          }`}>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
              Contact Information
            </h3>
            
            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  content: "gallo.noah@gmail.com",
                  href: "mailto:gallo.noah@gmail.com",
                  color: "blue"
                },
                {
                  icon: MapPin,
                  title: "Location",
                  content: "Mersch, Luxembourg",
                  color: "green"
                },
                {
                  icon: Phone,
                  title: "Availability",
                  content: "Open to new opportunities",
                  color: "purple"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-4 group hover:translate-x-2 transition-all duration-300 ${
                    contentVisible ? 'animate-fadeIn' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${400 + index * 150}ms` }}
                >
                  <div className={`bg-${item.color}-100 dark:bg-${item.color}-900/30 p-3 rounded-lg group-hover:scale-110 transition-all duration-300`}>
                    <item.icon className={`text-${item.color}-600 dark:text-${item.color}-400`} size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h4>
                    {item.href ? (
                      <a 
                        href={item.href} 
                        className="text-blue-600 dark:text-blue-400 hover:underline transition-colors"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className={`mt-8 transition-all duration-600 delay-700 ${
              contentVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-4'
            }`}>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Connect With Me</h4>
              <div className="flex gap-4">
                {[
                  {
                    href: "https://linkedin.com/in/noahgallo",
                    icon: Linkedin,
                    color: "bg-blue-600 hover:bg-blue-700",
                    label: "LinkedIn"
                  },
                  {
                    href: "https://github.com/NoahGallo",
                    icon: Github,  
                    color: "bg-gray-800 hover:bg-gray-900",
                    label: "GitHub"
                  }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} text-white p-3 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:-translate-y-1 group animate-fadeIn`}
                    style={{ animationDelay: `${800 + index * 100}ms` }}
                    aria-label={social.label}
                  >
                    <social.icon size={24} className="group-hover:animate-pulse" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-600 delay-400 ${
            contentVisible ? 'animate-slideInRight' : 'opacity-0 translate-x-8'
          }`}>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Send a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className={`transition-all duration-300 ${
                  contentVisible ? 'animate-fadeIn' : 'opacity-0'
                }`} style={{ animationDelay: '600ms' }}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500"
                    placeholder="Your full name"
                  />
                </div>

                <div className={`transition-all duration-300 ${
                  contentVisible ? 'animate-fadeIn' : 'opacity-0'
                }`} style={{ animationDelay: '700ms' }}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className={`transition-all duration-300 ${
                  contentVisible ? 'animate-fadeIn' : 'opacity-0'
                }`} style={{ animationDelay: '800ms' }}>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500"
                    placeholder="What's this about?"
                  />
                </div>

                <div className={`transition-all duration-300 ${
                  contentVisible ? 'animate-fadeIn' : 'opacity-0'
                }`} style={{ animationDelay: '900ms' }}>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500 resize-none"
                    placeholder="Tell me about your project, opportunity, or just say hello!"
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg group ${
                    contentVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ animationDelay: '1000ms' }}
                >
                  <Send size={20} className="group-hover:animate-pulse" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

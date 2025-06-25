import { Layout } from './components/Layout'
import { ThemeProvider } from './context/ThemeContext'
import { HeroSection } from './components/HeroSection'
import { AboutSection } from './components/AboutSection'
import { ExperienceSection } from './components/ExperienceSection'
import { SkillsSection } from './components/SkillsSection'
import { CertificationsSection } from './components/CertificationsSection'
import { ProjectsSection } from './components/ProjectsSection'
import { ContactSection } from './components/ContactSection'
import { VisitorCounter } from './components/VisitorCounter'

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <CertificationsSection />
        <ProjectsSection />
        <ContactSection />
        <VisitorCounter />
      </Layout>
    </ThemeProvider>
  )
}

export default App

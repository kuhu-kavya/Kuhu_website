import { useLayoutEffect, useRef } from 'react'
import Contact from './components/Contact.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import ProjectPage from './components/ProjectPage.jsx'
import TopBar from './components/TopBar.jsx'
import { projects } from './projects.js'
import { SECTION_HASHES, scrollToSection } from './sections.js'
import useHashRoute, { scrollMemory } from './hooks/useHashRoute.js'

// We handle scroll positions ourselves when switching between pages.
if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'

export default function App() {
  // "#/projects/<slug>" shows that project's page; anything else shows the homepage.
  const hash = useHashRoute()
  const slug = hash.match(/^#\/projects\/([\w-]+)/)?.[1]
  const project = projects.find((p) => p.slug === slug)

  // A project page opens at its top. "#about" / "#projects" / "#contact" jump to
  // that part of the homepage. Otherwise the browser's back button returns to
  // where the homepage was scrolled.
  const wasProject = useRef(false)
  useLayoutEffect(() => {
    if (project) window.scrollTo(0, 0)
    else if (SECTION_HASHES.includes(hash)) scrollToSection(hash)
    else if (wasProject.current) window.scrollTo(0, scrollMemory.y)
    wasProject.current = Boolean(project)
  }, [project, hash])

  if (project) {
    return (
      <>
        <TopBar />
        <main>
          <ProjectPage key={project.slug} project={project} />
        </main>
      </>
    )
  }

  return (
    <>
      <TopBar overlay />
      <main>
        <Hero />
        <Projects />
        <Contact />
      </main>
    </>
  )
}

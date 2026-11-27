import { useLayoutEffect, useRef } from 'react'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import ProjectPage from './components/ProjectPage.jsx'
import { projects } from './projects.js'
import useHashRoute, { scrollMemory } from './hooks/useHashRoute.js'

// We handle scroll positions ourselves when switching between pages.
if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'

export default function App() {
  // "#/projects/<slug>" shows that project's page; anything else shows the homepage.
  const hash = useHashRoute()
  const slug = hash.match(/^#\/projects\/([\w-]+)/)?.[1]
  const project = projects.find((p) => p.slug === slug)

  // A project page opens at its top. The browser's back button
  // returns to where the homepage was scrolled.
  const wasProject = useRef(false)
  useLayoutEffect(() => {
    if (project) window.scrollTo(0, 0)
    else if (wasProject.current) window.scrollTo(0, scrollMemory.y)
    wasProject.current = Boolean(project)
  }, [project])

  if (project) {
    return (
      <main>
        <ProjectPage key={project.slug} project={project} />
      </main>
    )
  }

  return (
    <main>
      <Hero />
      <Projects />
    </main>
  )
}

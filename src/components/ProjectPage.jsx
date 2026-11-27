import { useEffect } from 'react'
import { content } from '../content.js'

// A project's own page. Blank (black) for now: content will be added later.
// The heading is hidden on screen but read out by screen readers.
export default function ProjectPage({ project }) {
  const name = `${project.title}: ${project.script}`

  useEffect(() => {
    document.title = `${name} | ${content.fullName}`
    return () => {
      document.title = `${content.fullName} — ${content.tagline}`
    }
  }, [name])

  return (
    <article className="work">
      <h1 className="visually-hidden">{name}</h1>
    </article>
  )
}

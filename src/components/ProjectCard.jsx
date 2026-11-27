import { motion } from 'framer-motion'
import { projectImage } from '../projects.js'
import { scrollMemory } from '../hooks/useHashRoute.js'

// One project card: cover image, big number, title and a small category line.
// Clicking it opens the project's page. `style` carries the carousel's
// position/size/fade (motion values).
export default function ProjectCard({ project, style, className = '' }) {
  return (
    <motion.a
      className={`card ${className}`}
      href={`#/projects/${project.slug}`}
      style={style}
      onClick={() => {
        scrollMemory.y = window.scrollY
      }}
    >
      <span className="card__image">
        <img src={projectImage(project.cover)} alt={project.coverAlt} loading="lazy" draggable="false" />
      </span>
      <span className="card__text">
        <span className="card__number">{project.number}</span>
        <span className="card__title">{project.title}</span>
        <span className="card__script">{project.script}</span>
        <span className="card__category">{project.category}</span>
      </span>
    </motion.a>
  )
}

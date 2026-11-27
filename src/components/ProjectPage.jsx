import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { content } from '../content.js'
import { projectImage, projects } from '../projects.js'
import Sparkle from './Sparkle.jsx'
import Ticker from './Ticker.jsx'

// One rounded panel of images. Several images sit side by side in a row.
function Panel({ panel }) {
  const reduceMotion = useReducedMotion()
  const many = panel.images.length > 1

  return (
    <motion.figure
      className={`shot${many ? ' shot--many' : ''}${panel.tall ? ' shot--tall' : ''}`}
      style={{ '--cols': panel.columns || 1, '--cols-phone': panel.phoneColumns || 1 }}
      initial={reduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {panel.images.map((img) => (
        <img key={img.src} src={projectImage(img.src)} alt={img.alt} loading="lazy" />
      ))}
    </motion.figure>
  )
}

// A project's own page.
// With a `gallery` (see projects.js): text pinned on the left, the pink strip,
// and the work scrolling past on the right. Without one: a blank black page.
export default function ProjectPage({ project }) {
  const name = `${project.title}: ${project.script}`
  const index = projects.indexOf(project)
  const next = projects[(index + 1) % projects.length]

  useEffect(() => {
    document.title = `${name} | ${content.fullName}`
    return () => {
      document.title = `${content.fullName} — ${content.tagline}`
    }
  }, [name])

  if (!project.gallery) {
    return (
      <article className="work">
        <h1 className="visually-hidden">{name}</h1>
      </article>
    )
  }

  const stripText = `${content.fullName} - ${content.tagline}`
  // Long words like "ILLUSTRATIONS" get a smaller title so they fit the panel.
  const longestWord = Math.max(...project.title.split(' ').map((w) => w.length))

  return (
    <article className="work work--split">
      <aside className="work__panel">
        <a className="work__back" href="#">
          ← Back
        </a>

        <header className="work__head" style={{ '--longest': longestWord }}>
          <p className="work__number">{project.number}</p>
          <h1>
            <span className="work__wide">{project.title}</span>
            <span className="work__script">{project.script}</span>
          </h1>
          <p className="work__meta">{project.category}</p>
          <Sparkle className="work__sparkle" />
        </header>

        <section className="work__text">
          <h2>What I did</h2>
          <p>{project.did}</p>
        </section>

        <section className="work__text">
          <h2>What I learnt</h2>
          <p>{project.learnt}</p>
        </section>

        <a className="work__next" href={`#/projects/${next.slug}`}>
          <span className="work__next-label">Next project ›</span>
          <span className="work__next-title">{next.title}</span>
        </a>
      </aside>

      {/* Vertical pink strip on desktop, a horizontal band on phones. */}
      <div className="work__strip" aria-hidden="true">
        <Ticker text={stripText} />
      </div>
      <div className="work__band" aria-hidden="true">
        <span>{`${stripText} - `.repeat(8)}</span>
      </div>

      <div className="work__gallery">
        {project.gallery.map((panel, i) => (
          <Panel key={i} panel={panel} />
        ))}
      </div>
    </article>
  )
}

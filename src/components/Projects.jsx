import { useRef, useState } from 'react'
import { useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { projects } from '../projects.js'
import useIsMobile from '../hooks/useIsMobile.js'
import ProjectCard from './ProjectCard.jsx'
import Sparkle from './Sparkle.jsx'

// The ring turns while the section scrolls between these two points (0 = top, 1 = end).
// The gaps at each end let the first and last card rest at the front for a moment.
const SPIN = [0.08, 0.92]

const toRad = (deg) => (deg * Math.PI) / 180

// One card on the ring. Its place is worked out from the ring's current turn:
// cards at the front are big and bright, cards round the back are small and faded.
function RingCard({ project, index, turn, step, radius }) {
  // This card's angle on the ring, from -180 to 180 (0 = facing you).
  const angle = useTransform(turn, (t) => ((((index * step + t) % 360) + 540) % 360) - 180)
  const front = useTransform(angle, (a) => (Math.cos(toRad(a)) + 1) / 2) // 1 front … 0 back

  const style = {
    x: useTransform(angle, (a) => `${Math.sin(toRad(a)) * radius}vw`),
    y: useTransform(front, (f) => `${(1 - f) * -7}vh`),
    scale: useTransform(front, (f) => 0.5 + 0.5 * f),
    rotateY: useTransform(angle, (a) => Math.sin(toRad(a)) * 32),
    opacity: useTransform(front, (f) => 0.15 + 0.85 * f ** 1.6),
    zIndex: useTransform(front, (f) => Math.round(f * 100)),
  }

  return <ProjectCard project={project} style={style} className="card--ring" />
}

export default function Projects() {
  const ref = useRef(null)
  const isMobile = useIsMobile()
  const reduceMotion = useReducedMotion()

  const count = projects.length
  const step = 360 / count

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const turn = useTransform(scrollYProgress, SPIN, [0, -(count - 1) * step])

  // Which card is at the front, for the "02 / 05" label.
  const [active, setActive] = useState(0)
  useMotionValueEvent(turn, 'change', (t) => {
    setActive(Math.min(count - 1, Math.max(0, Math.round(-t / step))))
  })

  const heading = (
    <header className="projects__heading">
      <h2>
        <span className="projects__wide">Projects</span>
        <span className="projects__script">selected work</span>
      </h2>
      <Sparkle className="projects__sparkle" />
    </header>
  )

  // Visitors who prefer less motion get a plain grid.
  if (reduceMotion) {
    return (
      <section ref={ref} id="work" className="projects projects--grid">
        {heading}
        <div className="projects__grid">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    )
  }

  const current = projects[active]

  return (
    <section ref={ref} id="work" className="projects" style={{ height: `${count * 80 + 20}vh` }}>
      <div className="projects__stage">
        {heading}

        <div className="ring">
          {projects.map((p, i) => (
            <RingCard
              key={p.slug}
              project={p}
              index={i}
              turn={turn}
              step={step}
              radius={isMobile ? 30 : 27}
            />
          ))}
        </div>

        <p className="projects__label" aria-live="polite">
          <span className="projects__count">
            {current.number} / {String(count).padStart(2, '0')}
          </span>
          <span>{current.title}</span>
        </p>
      </div>
    </section>
  )
}

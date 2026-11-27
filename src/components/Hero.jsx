import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { content } from '../content.js'
import useIsMobile from '../hooks/useIsMobile.js'
import Sparkle from './Sparkle.jsx'
import Ticker from './Ticker.jsx'

// Scroll timeline for the section, from 0 (top) to 1 (end).
// Tweak these numbers to make things happen earlier or later.
const T = {
  introOut: [0.05, 0.3], // big "PORTFOLIO" + script name fade away
  faceMove: [0.1, 0.45], // face slides aside and shrinks
  strip: [0.35, 0.5], // pink ticker strip grows in
  heading: [0.4, 0.55], // "About me" fades in
  underline: [0.45, 0.6],
  paragraphs: [
    [0.5, 0.65],
    [0.6, 0.75],
    [0.7, 0.85],
  ],
}

export default function Hero() {
  const ref = useRef(null)
  const isMobile = useIsMobile()
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  // Visitors who prefer less motion see the finished layout straight away.
  const finished = useMotionValue(1)
  const p = reduceMotion ? finished : scrollYProgress

  const fadeIn = (range) => useTransform(p, range, [0, 1])
  const rise = (range) => useTransform(p, range, [40, 0])

  const introOpacity = useTransform(p, T.introOut, [1, 0])
  const cueOpacity = useTransform(p, [0, 0.06], [1, 0])

  // Desktop: face moves to the left half. Phone: face moves up and shrinks.
  const faceX = useTransform(p, T.faceMove, isMobile ? ['0vw', '0vw'] : ['0vw', '-24vw'])
  const faceY = useTransform(p, T.faceMove, isMobile ? ['0svh', '-31svh'] : ['0vh', '2vh'])
  const faceScale = useTransform(p, T.faceMove, isMobile ? [1, 0.42] : [1, 0.86])

  const stripScale = useTransform(p, T.strip, [0, 1])
  const sparkleRotate = useTransform(p, [0, 1], [0, 135])

  const headingOpacity = fadeIn(T.heading)
  const headingY = rise(T.heading)
  const underline = useTransform(p, T.underline, [0, 1])
  const paraOpacity = T.paragraphs.map((r) => fadeIn(r))
  const paraY = T.paragraphs.map((r) => rise(r))

  return (
    <section ref={ref} className="hero" style={{ height: reduceMotion ? 'auto' : '260vh' }}>
      <div className={`hero__stage${reduceMotion ? ' hero__stage--static' : ''}`}>
        <motion.div className="hero__intro" style={{ opacity: introOpacity }} aria-hidden="true">
          <span className="hero__wordmark">{content.tagline}</span>
        </motion.div>

        <div className="hero__face-wrap">
          <motion.img
            className="hero__face"
            src={`${import.meta.env.BASE_URL}images/${content.face}`}
            alt={content.faceAlt}
            style={{ x: faceX, y: faceY, scale: faceScale }}
          />
        </div>

        <motion.div className="hero__name" style={{ opacity: introOpacity }}>
          <Sparkle className="hero__name-sparkle" />
          <h1>{content.fullName}</h1>
        </motion.div>

        <motion.div className="hero__strip" style={{ scaleY: stripScale }}>
          <Ticker text={`${content.fullName} - ${content.tagline}`} />
        </motion.div>

        <div className="hero__about">
          <motion.h2 style={{ opacity: headingOpacity, y: headingY }}>{content.aboutHeading}</motion.h2>
          <motion.span className="hero__underline" style={{ scaleX: underline }} aria-hidden="true" />
          {content.about.map((text, i) => (
            <motion.p key={i} style={{ opacity: paraOpacity[i], y: paraY[i] }}>
              {text}
            </motion.p>
          ))}
        </div>

        <motion.div className="hero__corner" style={{ rotate: sparkleRotate }} aria-hidden="true">
          <Sparkle />
        </motion.div>

        {!reduceMotion && (
          <motion.p className="hero__cue" style={{ opacity: cueOpacity }} aria-hidden="true">
            scroll
          </motion.p>
        )}
      </div>
    </section>
  )
}

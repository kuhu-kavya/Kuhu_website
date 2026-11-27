import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { content } from '../content.js'
import useIsMobile from '../hooks/useIsMobile.js'
import NameGreeting from './NameGreeting.jsx'
import Sparkle from './Sparkle.jsx'
import Ticker from './Ticker.jsx'

// Scroll timeline for the section, from 0 (top) to 1 (end).
// Tweak these numbers to make things happen earlier or later.
// How much of the illustration's top is plain black (0.12 = 12%).
// If you swap in a new illustration, adjust this to match it.
const FACE_BLANK_TOP = 0.12

const T = {
  introOut: [0.05, 0.3], // greeting + name fade away
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
  const stageRef = useRef(null)
  const titleRef = useRef(null)
  const nameRef = useRef(null)
  const faceRef = useRef(null)
  const isMobile = useIsMobile()
  const reduceMotion = useReducedMotion()

  // At the top of the page the illustration sits between the greeting and
  // "Kuhu Kavya", at full size when it fits, never with text over the drawing.
  // Measured live, because the text's size depends on screen size and fonts.
  const [fit, setFit] = useState({ scale: 1, y: 0, endY: 0 })
  useLayoutEffect(() => {
    const stage = stageRef.current
    const title = titleRef.current
    const name = nameRef.current
    const face = faceRef.current
    if (!stage || !title || !name || !face) return

    const measure = () => {
      const height = face.offsetHeight // size before any scroll animation
      if (!height) return // image not loaded yet
      const stageTop = stage.getBoundingClientRect().top
      const stageHeight = stage.clientHeight
      const gap = stageHeight * 0.02
      const top = title.getBoundingClientRect().bottom - stageTop + gap
      const bottom = name.getBoundingClientRect().top - stageTop - gap

      // The top of the image is plain black, so only the drawn part must fit.
      const drawn = height * (1 - FACE_BLANK_TOP)
      const room = bottom - top
      const scale = Math.min(1, Math.max(0.3, room / drawn))
      const faceBottom = top + (room + scale * drawn) / 2 // centred in the space

      // Turn that into a vertical shift. Desktop scales from the image's bottom
      // edge, phones from its centre.
      const restingBottom = face.offsetTop + height
      const y = isMobile
        ? faceBottom - (face.offsetTop + height / 2) - (scale * height) / 2
        : faceBottom - restingBottom
      // Where it ends up beside the About text (same as before).
      const endY = isMobile ? -0.31 * stageHeight : 0.02 * stageHeight
      setFit({ scale, y, endY })
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(stage)
    observer.observe(title)
    face.addEventListener('load', measure)
    return () => {
      observer.disconnect()
      face.removeEventListener('load', measure)
    }
  }, [isMobile])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  // Visitors who prefer less motion see the finished layout straight away.
  const finished = useMotionValue(1)
  const p = reduceMotion ? finished : scrollYProgress

  const fadeIn = (range) => useTransform(p, range, [0, 1])
  const rise = (range) => useTransform(p, range, [40, 0])

  const introOpacity = useTransform(p, T.introOut, [1, 0])
  // Once the greeting has faded out, hide it fully so the name box can't be clicked.
  const introVisibility = useTransform(introOpacity, (o) => (o < 0.02 ? 'hidden' : 'visible'))
  const cueOpacity = useTransform(p, [0, 0.06], [1, 0])

  // Desktop: face moves to the left half. Phone: face moves up and shrinks.
  const faceX = useTransform(p, T.faceMove, isMobile ? ['0vw', '0vw'] : ['0vw', '-24vw'])
  const faceY = useTransform(p, T.faceMove, [`${fit.y}px`, `${fit.endY}px`])
  const faceScale = useTransform(p, T.faceMove, [fit.scale, isMobile ? 0.42 : 0.86])

  const stripScale = useTransform(p, T.strip, [0, 1])
  const sparkleRotate = useTransform(p, [0, 1], [0, 135])

  const headingOpacity = fadeIn(T.heading)
  const headingY = rise(T.heading)
  const underline = useTransform(p, T.underline, [0, 1])
  const paraOpacity = T.paragraphs.map((r) => fadeIn(r))
  const paraY = T.paragraphs.map((r) => rise(r))

  return (
    <section ref={ref} className="hero" style={{ height: reduceMotion ? 'auto' : '260vh' }}>
      <div ref={stageRef} className={`hero__stage${reduceMotion ? ' hero__stage--static' : ''}`}>
        {/* "HI, [name] / welcome to my portfolio", centred at the top */}
        <motion.div className="hero__intro" style={{ opacity: introOpacity, visibility: introVisibility }}>
          <div ref={titleRef} className="hero__title">
            <NameGreeting />
          </div>
        </motion.div>

        {/* "✦ Kuhu Kavya" under the illustration */}
        <motion.div ref={nameRef} className="hero__name" style={{ opacity: introOpacity }}>
          <Sparkle className="hero__name-sparkle" />
          <h1>{content.fullName}</h1>
        </motion.div>

        <div className="hero__face-wrap">
          <motion.img
            ref={faceRef}
            className="hero__face"
            src={`${import.meta.env.BASE_URL}images/${content.face}`}
            alt={content.faceAlt}
            style={{ x: faceX, y: faceY, scale: faceScale }}
          />
        </div>

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

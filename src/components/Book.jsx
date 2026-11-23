import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Leaf from './Leaf.jsx'
import useIsMobile from '../hooks/useIsMobile.js'

// Each page turn takes one screen-height of scrolling. Inside that stretch
// the page turns during the middle part, so every spread rests for a moment.
const TURN_START = 0.15
const TURN_END = 0.85

function turnRange(i, turns) {
  const seg = 1 / turns
  return [i * seg + seg * TURN_START, i * seg + seg * TURN_END]
}

// pages: [{ key, content, phone }]; phone: false hides a page on phones.
export default function Book({ pages }) {
  const isMobile = useIsMobile()
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return <StackedBook pages={pages} />

  const leaves = isMobile ? singlePageLeaves(pages) : spreadLeaves(pages)
  return <TurningBook key={isMobile ? 'phone' : 'desk'} leaves={leaves} isMobile={isMobile} />
}

// Desktop: two pages per sheet (front = right page, back = left page).
function spreadLeaves(pages) {
  const leaves = []
  for (let i = 0; i < pages.length; i += 2) {
    leaves.push({ key: pages[i].key, front: pages[i].content, back: pages[i + 1]?.content, turns: true })
  }
  return leaves
}

// Phones: one page per sheet; the last page stays put.
function singlePageLeaves(pages) {
  const shown = pages.filter((p) => p.phone !== false)
  return shown.map((p, i) => ({ key: p.key, front: p.content, turns: i < shown.length - 1 }))
}

function TurningBook({ leaves, isMobile }) {
  const scrollRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start start', 'end end'] })

  const turns = leaves.filter((l) => l.turns).length
  const first = turnRange(0, turns)
  const last = turnRange(turns - 1, turns)

  // Desktop: closed book shows only the right half, so slide it left to centre
  // the cover, back to the middle once open, and right to centre the back cover.
  const x = useTransform(
    scrollYProgress,
    [first[0], first[1], last[0], last[1]],
    isMobile ? ['0%', '0%', '0%', '0%'] : ['-25%', '0%', '0%', '25%'],
  )
  const hintOpacity = useTransform(scrollYProgress, [0, first[0]], [1, 0])

  return (
    <div ref={scrollRef} className="book-scroll" style={{ height: `${(turns + 1) * 100}vh` }}>
      <div className="book-stage">
        <motion.div className={isMobile ? 'book book--single' : 'book'} style={{ x }}>
          {leaves.map((leaf, i) => (
            <Leaf
              key={leaf.key}
              index={i}
              total={leaves.length}
              progress={scrollYProgress}
              range={leaf.turns ? turnRange(i, turns) : [2, 3]}
              front={leaf.front}
              back={leaf.back}
            />
          ))}
        </motion.div>
        <motion.p className="scroll-hint" style={{ opacity: hintOpacity }} aria-hidden="true">
          scroll to open ↓
        </motion.p>
      </div>
    </div>
  )
}

// For visitors who prefer less motion: the pages one after another, no 3D.
function StackedBook({ pages }) {
  return (
    <div className="book-stack">
      {pages
        .filter((p) => p.phone !== false)
        .map((p) => (
          <div key={p.key} className="book-stack__page">
            {p.content}
          </div>
        ))}
    </div>
  )
}

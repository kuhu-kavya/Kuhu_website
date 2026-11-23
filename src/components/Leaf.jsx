import { motion, useTransform } from 'framer-motion'

// One sheet of paper. It turns from 0° to -180° around the spine while the
// scroll progress moves through `range` ([start, end], numbers from 0 to 1).
export default function Leaf({ index, total, progress, range, front, back }) {
  const rotateY = useTransform(progress, range, [0, -180], { clamp: true })

  // Unturned sheets stack with the first one on top; once a sheet passes
  // halfway it lands on the left pile, where the latest one is on top.
  const zIndex = useTransform(rotateY, (r) => (r < -90 ? index + 1 : total - index))

  return (
    <motion.div className="leaf" style={{ rotateY, zIndex }}>
      <div className="face face--front">{front}</div>
      {back && <div className="face face--back">{back}</div>}
    </motion.div>
  )
}

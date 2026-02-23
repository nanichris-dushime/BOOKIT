import { motion } from 'framer-motion'

const pageTransition = {
  duration: 0.4,
  ease: 'easeInOut',
}

export function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={pageTransition}
      className="h-full"
    >
      {children}
    </motion.div>
  )
}

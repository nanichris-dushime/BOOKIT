import { motion } from 'framer-motion'

export function CardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative overflow-hidden bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08)]"
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 dark:via-slate-700/40 to-transparent" />
      <div className="relative z-10 flex gap-4">
        <div className="w-16 h-16 rounded-xl bg-slate-200 dark:bg-slate-700" />
        <div className="flex-1 space-y-3">
          <div className="h-5 w-1/2 bg-slate-200 dark:bg-slate-700 rounded-xl" />
          <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-700 rounded-xl" />
          <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-700 rounded-xl" />
        </div>
      </div>
      <div className="relative z-10 mt-4 flex justify-between items-center">
        <div className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded-xl" />
        <div className="h-10 w-28 bg-slate-200 dark:bg-slate-700 rounded-xl" />
      </div>
    </motion.div>
  )
}

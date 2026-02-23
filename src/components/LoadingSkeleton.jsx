import { motion } from 'framer-motion'

export function CardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08)] animate-pulse"
    >
      <div className="flex gap-4">
        <div className="w-16 h-16 rounded-xl bg-slate-200 dark:bg-slate-700" />
        <div className="flex-1 space-y-3">
          <div className="h-5 w-1/2 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-700 rounded" />
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded-lg" />
        <div className="h-10 w-28 bg-slate-200 dark:bg-slate-700 rounded-xl" />
      </div>
    </motion.div>
  )
}

import { motion } from 'framer-motion'
import { BarChart3 } from 'lucide-react'

export function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Analytics</h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08)]"
      >
        <BarChart3 className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
        <p className="text-slate-500 dark:text-slate-400">Route analytics and reports</p>
      </motion.div>
    </div>
  )
}

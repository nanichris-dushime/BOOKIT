import { motion } from 'framer-motion'
import { Bus, Plus } from 'lucide-react'

export function AdminBusesPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Bus Management</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F7B5F] text-white font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Bus
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08)]"
      >
        <Bus className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
        <p className="text-slate-500 dark:text-slate-400">Bus management interface</p>
      </motion.div>
    </div>
  )
}

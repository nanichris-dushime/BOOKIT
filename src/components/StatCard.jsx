import { motion } from 'framer-motion'

export function StatCard({ value, label, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.25 }}
      whileHover={{ y: -6 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center shadow-[0_4px_6px_-1px_rgba(0,0,0,0.07),0_2px_4px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_18px_30px_-14px_rgba(15,123,95,0.28)] transition-shadow duration-[250ms]"
    >
      <p className="text-3xl sm:text-4xl font-bold text-[#0F7B5F] dark:text-emerald-400">{value}</p>
      <p className="text-slate-600 dark:text-slate-400 mt-1">{label}</p>
    </motion.div>
  )
}

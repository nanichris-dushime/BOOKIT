import { motion } from 'framer-motion'
import { SearchBar } from '../components/SearchBar'

export function Booking() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <span className="inline-flex items-center rounded-full bg-[#0F7B5F]/10 text-[#0F7B5F] dark:text-emerald-400 px-4 py-1.5 text-sm font-semibold">
          Booking Flow
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
          Select Your Route
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Choose your from, to, and departure date to continue booking.
        </p>
      </motion.div>

      <div className="flex justify-center">
        <SearchBar compact={false} />
      </div>
    </div>
  )
}

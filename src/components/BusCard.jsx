import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Users, ChevronRight } from 'lucide-react'

const springButton = { type: 'spring', stiffness: 300, damping: 20 }

export function BusCard({ bus, from, to, date, index = 0 }) {
  const searchParams = new URLSearchParams({
    busId: bus.id,
    from,
    to,
    date,
    company: bus.company,
    departure: bus.departure,
    arrival: bus.arrival,
    price: bus.price.toString(),
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25 }}
      whileHover={{ y: -6 }}
      className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08),0_4px_6px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_30px_-12px_rgba(15,123,95,0.32)] transition-shadow duration-[250ms] border border-slate-100 dark:border-slate-700"
    >
      <span className="absolute top-4 right-4 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Live
      </span>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-14 h-14 rounded-xl bg-[#0F7B5F]/10 dark:bg-emerald-500/20 flex items-center justify-center text-2xl">
            🚌
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-lg">{bus.company}</h3>
            <div className="flex items-center gap-4 mt-1 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {bus.departure} → {bus.arrival}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {bus.remainingSeats} seats left
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-4">
          <div className="text-right">
            <p className="text-2xl font-bold text-[#0F7B5F] dark:text-emerald-400">
              {Number(bus.price).toLocaleString()} RWF
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">per seat</p>
          </div>
          <Link to={`/seats?${searchParams.toString()}`}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={springButton}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F7B5F] hover:bg-[#0a5a45] text-white font-semibold transition-colors"
            >
              Select Seat
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </div>
      </div>
      {bus.remainingSeats <= 5 && (
        <div className="mt-3 px-3 py-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-sm font-medium inline-flex">
          Only {bus.remainingSeats} seats left
        </div>
      )}
    </motion.div>
  )
}

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Ticket, Search } from 'lucide-react'

export function TicketsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0F7B5F]/10 dark:bg-emerald-500/20 mb-4">
          <Ticket className="w-8 h-8 text-[#0F7B5F] dark:text-emerald-400" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">My Tickets</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Your upcoming and past bookings</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl bg-white dark:bg-slate-800 p-12 text-center shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08)]"
      >
        <p className="text-slate-500 dark:text-slate-400 mb-6">You don&apos;t have any tickets yet.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F7B5F] hover:bg-[#0a5a45] text-white font-semibold transition-colors"
        >
          <Search className="w-5 h-5" />
          Search for buses
        </Link>
      </motion.div>
    </div>
  )
}

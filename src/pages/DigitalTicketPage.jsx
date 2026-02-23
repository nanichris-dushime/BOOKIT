import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TicketCard } from '../components/TicketCard'
import { CheckCircle } from 'lucide-react'

export function DigitalTicketPage() {
  const [searchParams] = useSearchParams()
  const ref = searchParams.get('ref') || 'N/A'
  const from = searchParams.get('from') || ''
  const to = searchParams.get('to') || ''
  const date = searchParams.get('date') || ''
  const company = searchParams.get('company') || ''
  const departure = searchParams.get('departure') || ''
  const arrival = searchParams.get('arrival') || ''
  const seats = (searchParams.get('seats') || '').split(',').filter(Boolean)
  const total = parseInt(searchParams.get('total') || '0', 10)

  const booking = {
    reference: ref,
    from,
    to,
    date,
    company,
    departure,
    arrival,
    seats,
    total,
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0F7B5F] text-white mb-4"
        >
          <CheckCircle className="w-10 h-10" />
        </motion.div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          Booking Confirmed!
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Your digital ticket is ready</p>
      </motion.div>

      <TicketCard booking={booking} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-center"
      >
        <Link
          to="/"
          className="inline-flex items-center text-[#0F7B5F] dark:text-emerald-400 font-medium hover:underline"
        >
          Book another trip
        </Link>
      </motion.div>
    </div>
  )
}

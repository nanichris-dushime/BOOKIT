import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SeatGrid } from '../components/SeatGrid'
import { ArrowLeft } from 'lucide-react'

export function SeatSelectionPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const from = searchParams.get('from') || ''
  const to = searchParams.get('to') || ''
  const date = searchParams.get('date') || ''
  const company = searchParams.get('company') || ''
  const departure = searchParams.get('departure') || ''
  const arrival = searchParams.get('arrival') || ''
  const price = parseInt(searchParams.get('price') || '4000', 10)

  const [selectedSeats, setSelectedSeats] = useState([])
  const occupiedSeats = [3, 7, 12, 15, 21, 28]

  const handleContinue = () => {
    if (selectedSeats.length === 0) return
    const params = new URLSearchParams({
      from,
      to,
      date,
      company,
      departure,
      arrival,
      price: price.toString(),
      seats: selectedSeats.join(','),
      total: (selectedSeats.length * price).toString(),
    })
    navigate(`/booking?${params.toString()}`)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-[#0F7B5F] dark:hover:text-emerald-400 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to results
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08)]"
      >
        <h2 className="font-semibold text-lg text-slate-800 dark:text-slate-100">{company}</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          {from} → {to} • {date} • {departure} - {arrival}
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <SeatGrid
          totalSeats={32}
          occupiedSeats={occupiedSeats}
          pricePerSeat={price}
          onSelect={setSelectedSeats}
        />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          disabled={selectedSeats.length === 0}
          className={`px-8 py-3 rounded-xl font-semibold transition-all ${
            selectedSeats.length > 0
              ? 'bg-[#0F7B5F] hover:bg-[#0a5a45] text-white cursor-pointer'
              : 'bg-slate-300 dark:bg-slate-600 text-slate-500 cursor-not-allowed'
          }`}
        >
          Continue to Booking
        </motion.button>
      </motion.div>
    </div>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'

export function SeatGrid({ totalSeats = 32, occupiedSeats = [], pricePerSeat, onSelect }) {
  const [selected, setSelected] = useState([])

  const seats = Array.from({ length: totalSeats }, (_, i) => {
    const num = i + 1
    const isOccupied = occupiedSeats.includes(num)
    const isSelected = selected.includes(num)
    return { num, isOccupied, isSelected }
  })

  const toggleSeat = (num) => {
    const seat = seats.find((s) => s.num === num)
    if (seat?.isOccupied) return
    setSelected((prev) => {
      const next = prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
      onSelect?.(next)
      return next
    })
  }

  const total = selected.length * pricePerSeat

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="w-28 h-10 rounded-lg bg-slate-300 dark:bg-slate-600 flex items-center justify-center text-sm font-medium text-slate-600 dark:text-slate-300">
          Driver
        </div>
      </div>
      <div className="max-w-xs mx-auto">
        <div className="grid grid-cols-4 gap-3">
          {seats.map((seat) => (
            <SeatButton key={seat.num} seat={seat} onClick={() => toggleSeat(seat.num)} />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">{selected.length} seat(s) selected</p>
            <p className="text-xl font-bold text-[#0F7B5F] dark:text-emerald-400">{total.toLocaleString()} RWF</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-slate-200 dark:bg-slate-600" />
              Available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-slate-500" />
              Occupied
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-[#0F7B5F]" />
              Selected
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function SeatButton({ seat, onClick }) {
  const getStyles = () => {
    if (seat.isOccupied) return 'bg-slate-400 dark:bg-slate-600 cursor-not-allowed opacity-70'
    if (seat.isSelected) {
      return 'bg-[#0F7B5F] text-white cursor-pointer ring-2 ring-[#0F7B5F] ring-offset-2 dark:ring-offset-slate-900'
    }
    return 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 cursor-pointer'
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={seat.isOccupied}
      animate={
        !seat.isOccupied && seat.isSelected
          ? { scale: [1, 1.1, 1] }
          : { scale: 1 }
      }
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      whileHover={!seat.isOccupied ? { scale: 1.03 } : {}}
      whileTap={!seat.isOccupied ? { scale: 0.97 } : {}}
      className={`w-10 h-10 rounded-lg font-medium text-sm transition-colors duration-300 ${getStyles()}`}
      aria-label={`Seat ${seat.num}`}
    >
      {seat.num}
    </motion.button>
  )
}

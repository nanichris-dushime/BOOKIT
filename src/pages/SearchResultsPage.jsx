import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BusCard } from '../components/BusCard'
import { CardSkeleton } from '../components/LoadingSkeleton'
import { getBusesForRoute } from '../utils/mockData'

export function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from') || ''
  const to = searchParams.get('to') || ''
  const date = searchParams.get('date') || ''
  const [buses, setBuses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setBuses(getBusesForRoute(from, to))
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [from, to, date])

  if (!from || !to || !date) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-600 dark:text-slate-400">
          Please select a route and date to search for buses.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Buses from {from} to {to}
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          {date} • {buses.length} buses available
        </p>
      </motion.div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : buses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 rounded-2xl bg-slate-100 dark:bg-slate-800"
        >
          <p className="text-slate-600 dark:text-slate-400">No buses found for this route.</p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {buses.map((bus, i) => (
            <BusCard
              key={bus.id}
              bus={bus}
              from={from}
              to={to}
              date={date}
              index={i}
            />
          ))}
        </div>
      )}
    </div>
  )
}

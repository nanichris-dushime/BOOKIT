import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { PROVINCES } from '../utils/constants'

export function SearchBar({ compact = false }) {
  const navigate = useNavigate()
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams({ from, to, date })
    navigate(`/search?${params.toString()}`)
  }

  const swapLocations = () => {
    setFrom(to)
    setTo(from)
  }

  return (
    <motion.form
      onSubmit={handleSearch}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-4 sm:p-6 ${
        compact ? 'max-w-2xl' : 'max-w-4xl'
      }`}
    >
      <div
        className={`grid gap-4 ${
          compact
            ? 'grid-cols-1 sm:grid-cols-4'
            : 'grid-cols-1 sm:grid-cols-5'
        } items-end`}
      >
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            From
          </label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-[#0F7B5F] focus:border-transparent outline-none transition-all"
          >
            <option value="">Select province</option>
            {PROVINCES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center items-end h-[52px]">
          <button
            type="button"
            onClick={swapLocations}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            aria-label="Swap"
          >
            <svg
              className="w-5 h-5 text-slate-600 dark:text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            To
          </label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-[#0F7B5F] focus:border-transparent outline-none transition-all"
          >
            <option value="">Select province</option>
            {PROVINCES.filter((p) => p !== from).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            Departure date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-[#0F7B5F] focus:border-transparent outline-none transition-all"
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#0F7B5F] hover:bg-[#0a5a45] text-white font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <Search className="w-5 h-5" />
          Search
        </motion.button>
      </div>
    </motion.form>
  )
}

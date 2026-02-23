import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CreditCard, Smartphone, Wallet } from 'lucide-react'
import { generateBookingReference } from '../utils/mockData'

const PAYMENT_OPTIONS = [
  { id: 'mtn', label: 'MTN MoMo', icon: Smartphone },
  { id: 'airtel', label: 'Airtel Money', icon: Wallet },
  { id: 'visa', label: 'Visa', icon: CreditCard },
]

const springButton = { type: 'spring', stiffness: 300, damping: 20 }

export function BookingSummaryPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const from = searchParams.get('from') || ''
  const to = searchParams.get('to') || ''
  const date = searchParams.get('date') || ''
  const company = searchParams.get('company') || ''
  const departure = searchParams.get('departure') || ''
  const arrival = searchParams.get('arrival') || ''
  const total = parseInt(searchParams.get('total') || '0', 10)
  const seats = (searchParams.get('seats') || '').split(',').filter(Boolean)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [confirming, setConfirming] = useState(false)

  const handleConfirm = (e) => {
    e.preventDefault()
    if (!name || !email || !phone || !paymentMethod) return
    setConfirming(true)
    const ref = generateBookingReference()
    setTimeout(() => {
      navigate(
        `/ticket?ref=${ref}&from=${from}&to=${to}&date=${date}&company=${company}&departure=${departure}&arrival=${arrival}&seats=${seats.join(',')}&total=${total}`
      )
    }, 1500)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-8"
      >
        Confirm Booking
      </motion.h1>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08)]"
        >
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-4">Trip Details</h3>
          <div className="space-y-2 text-slate-600 dark:text-slate-400">
            <p>
              <strong className="text-slate-800 dark:text-slate-100">Route:</strong> {from} → {to}
            </p>
            <p>
              <strong className="text-slate-800 dark:text-slate-100">Date:</strong> {date}
            </p>
            <p>
              <strong className="text-slate-800 dark:text-slate-100">Bus:</strong> {company}
            </p>
            <p>
              <strong className="text-slate-800 dark:text-slate-100">Time:</strong> {departure} - {arrival}
            </p>
            <p>
              <strong className="text-slate-800 dark:text-slate-100">Seats:</strong> {seats.join(', ')}
            </p>
            <p className="text-lg font-bold text-[#0F7B5F] dark:text-emerald-400 pt-2">
              Total: {total.toLocaleString()} RWF
            </p>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleConfirm}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08)] space-y-4"
        >
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">Passenger Details</h3>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-[#0F7B5F]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-[#0F7B5F]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="+250..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-[#0F7B5F]"
            />
          </div>

          <h3 className="font-semibold text-slate-800 dark:text-slate-100 pt-4">Payment Method</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PAYMENT_OPTIONS.map((opt) => {
              const Icon = opt.icon
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPaymentMethod(opt.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === opt.id
                      ? 'border-[#0F7B5F] bg-[#0F7B5F]/5 dark:bg-emerald-500/10'
                      : 'border-slate-200 dark:border-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-sm font-medium">{opt.label}</span>
                </button>
              )
            })}
          </div>

          <motion.button
            type="submit"
            disabled={!name || !email || !phone || !paymentMethod || confirming}
            whileHover={{ scale: confirming ? 1 : 1.03 }}
            whileTap={{ scale: confirming ? 1 : 0.97 }}
            transition={springButton}
            className={`w-full py-3 rounded-xl font-semibold mt-6 ${
              confirming || !name || !email || !phone || !paymentMethod
                ? 'bg-slate-300 dark:bg-slate-600 cursor-not-allowed'
                : 'bg-[#0F7B5F] hover:bg-[#0a5a45] text-white'
            }`}
          >
            {confirming ? 'Processing...' : 'Confirm Booking'}
          </motion.button>
        </motion.form>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 p-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-400"
      >
        <strong>Email confirmation:</strong> A confirmation will be sent to your email after booking.
      </motion.div>
    </div>
  )
}

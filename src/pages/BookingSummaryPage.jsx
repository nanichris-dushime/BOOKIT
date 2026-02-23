import { useMemo, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PaymentModal } from '../components/PaymentModal'
import { usePayment } from '../context/PaymentContext'
import { generateBookingReference } from '../utils/booking'

const springButton = { type: 'spring', stiffness: 300, damping: 20 }

export function BookingSummaryPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { completePayment, resetPayment } = usePayment()

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
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  const canProceed = useMemo(() => {
    return Boolean(name && email && phone && from && to && date && seats.length > 0)
  }, [name, email, phone, from, to, date, seats.length])

  const handleOpenPayment = (e) => {
    e.preventDefault()
    if (!canProceed) return
    resetPayment()
    setIsPaymentModalOpen(true)
  }

  const handlePaymentSuccess = ({ method }) => {
    const bookingReference = generateBookingReference()

    completePayment({
      bookingReference,
      passengerName: name,
      passengerEmail: email,
      passengerPhone: phone,
      from,
      to,
      date,
      company,
      departure,
      arrival,
      seats,
      total,
      paymentMethod: method,
    })

    setIsPaymentModalOpen(false)
    navigate('/ticket', { replace: true })
  }

  return (
    <>
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
            onSubmit={handleOpenPayment}
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

            <motion.button
              type="submit"
              whileHover={{ scale: canProceed ? 1.03 : 1 }}
              whileTap={{ scale: canProceed ? 0.97 : 1 }}
              transition={springButton}
              disabled={!canProceed}
              className={`w-full py-3 rounded-xl font-semibold mt-4 ${
                canProceed
                  ? 'bg-[#0F7B5F] hover:bg-[#0a5a45] text-white'
                  : 'bg-slate-300 dark:bg-slate-600 text-slate-500 cursor-not-allowed'
              }`}
            >
              Proceed to Payment
            </motion.button>
          </motion.form>
        </div>
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />
    </>
  )
}

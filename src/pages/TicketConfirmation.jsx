import { useRef, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import html2canvas from 'html2canvas'
import { QRCodeSVG } from 'qrcode.react'
import { usePayment } from '../context/PaymentContext'

const springButton = { type: 'spring', stiffness: 300, damping: 20 }

export function TicketConfirmation() {
  const { isPaid, bookingData } = usePayment()
  const ticketRef = useRef(null)
  const [emailAddress, setEmailAddress] = useState('')
  const [emailStatus, setEmailStatus] = useState('')
  const [emailStatusType, setEmailStatusType] = useState('')
  const [isSending, setIsSending] = useState(false)

  if (!isPaid || !bookingData) {
    return <Navigate to="/booking" replace />
  }

  const handleDownload = async () => {
    if (!ticketRef.current) return

    const canvas = await html2canvas(ticketRef.current, {
      useCORS: true,
      backgroundColor: null,
      scale: 2,
    })

    const dataUrl = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = `BOOKIT-Ticket-${bookingData.bookingReference}.png`
    link.click()
  }

  const handleSendEmail = () => {
    if (!emailAddress.trim()) return
    setIsSending(true)
    setEmailStatus('')

    setTimeout(() => {
      setIsSending(false)
      if (emailAddress.trim().toLowerCase() === 'tester@bookit.rw') {
        setEmailStatus('Ticket successfully sent to your email.')
        setEmailStatusType('success')
      } else {
        setEmailStatus('Email not found.')
        setEmailStatusType('error')
      }
    }, 1500)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Ticket Confirmed</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Payment successful. Your BOOKIT ticket is ready.
        </p>
      </motion.div>

      <motion.div
        ref={ticketRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl bg-gradient-to-br from-white via-emerald-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6 shadow-[0_24px_45px_-20px_rgba(15,123,95,0.45)] border border-emerald-100 dark:border-slate-700"
      >
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="space-y-2 text-slate-700 dark:text-slate-300">
            <p className="text-sm text-emerald-700 dark:text-emerald-400 font-semibold">BOOKIT E-Ticket</p>
            <p><strong>Reference:</strong> {bookingData.bookingReference}</p>
            <p><strong>Passenger:</strong> {bookingData.passengerName}</p>
            <p><strong>Route:</strong> {bookingData.from} → {bookingData.to}</p>
            <p><strong>Seat Number:</strong> {bookingData.seats.join(', ')}</p>
            <p><strong>Date:</strong> {bookingData.date}</p>
            <p><strong>Payment Method:</strong> {bookingData.paymentMethod}</p>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 shadow-md">
            <QRCodeSVG
              value={`${bookingData.bookingReference}|${bookingData.from}|${bookingData.to}|${bookingData.date}|${bookingData.seats.join(',')}`}
              size={150}
              level="H"
            />
          </div>
        </div>
      </motion.div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={springButton}
          onClick={handleDownload}
          className="w-full rounded-xl bg-[#0F7B5F] hover:bg-[#0c644f] text-white py-3 font-semibold transition-colors"
        >
          Download Ticket
        </motion.button>
        <Link
          to="/"
          className="w-full rounded-xl border border-slate-300 dark:border-slate-600 py-3 font-semibold text-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          Book Another Trip
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 rounded-2xl bg-white dark:bg-slate-800 p-5 shadow-[0_16px_30px_-18px_rgba(15,123,95,0.4)]"
      >
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Send ticket to email
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            placeholder="Enter email address"
            className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 outline-none focus:ring-2 focus:ring-[#0F7B5F]"
          />
          <motion.button
            type="button"
            onClick={handleSendEmail}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={springButton}
            disabled={isSending || !emailAddress.trim()}
            className="px-6 rounded-xl bg-[#0F7B5F] hover:bg-[#0c644f] text-white font-semibold py-3 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
          >
            {isSending ? 'Sending...' : 'Send'}
          </motion.button>
        </div>

        {emailStatus ? (
          <p
            className={`mt-3 text-sm ${
              emailStatusType === 'success'
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {emailStatus}
          </p>
        ) : null}
      </motion.div>
    </div>
  )
}

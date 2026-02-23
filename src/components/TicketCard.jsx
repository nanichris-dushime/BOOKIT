import { useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { motion } from 'framer-motion'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export function TicketCard({ booking }) {
  const ticketRef = useRef(null)

  const handleDownloadPDF = async () => {
    if (!ticketRef.current) return
    const canvas = await html2canvas(ticketRef.current, { scale: 2, useCORS: true })
    const img = canvas.toDataURL('image/png')
    const pdf = new jsPDF({ format: 'a4', unit: 'mm' })
    const w = pdf.internal.pageSize.getWidth()
    const h = (canvas.height * w) / canvas.width
    pdf.addImage(img, 'PNG', 0, 0, w, Math.min(h, 297))
    pdf.save(`BOOKIT-${booking.reference}.pdf`)
  }

  return (
    <motion.div
      ref={ticketRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08)] border-2 border-slate-200 dark:border-slate-700 max-w-md mx-auto"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#0F7B5F] dark:text-emerald-400 mb-1">
          BOOKIT
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Digital Bus Ticket</p>
      </div>

      <div className="flex justify-center mb-6">
        <div className="p-4 bg-white rounded-xl border border-slate-200 dark:border-slate-600">
          <QRCodeSVG value={booking.reference} size={140} level="H" />
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between py-2 border-b border-slate-200 dark:border-slate-600">
          <span className="text-slate-500 dark:text-slate-400">Booking Reference</span>
          <span className="font-mono font-semibold">{booking.reference}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-slate-200 dark:border-slate-600">
          <span className="text-slate-500 dark:text-slate-400">Route</span>
          <span>
            {booking.from} → {booking.to}
          </span>
        </div>
        <div className="flex justify-between py-2 border-b border-slate-200 dark:border-slate-600">
          <span className="text-slate-500 dark:text-slate-400">Date</span>
          <span>{booking.date}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-slate-200 dark:border-slate-600">
          <span className="text-slate-500 dark:text-slate-400">Departure</span>
          <span>{booking.departure}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-slate-200 dark:border-slate-600">
          <span className="text-slate-500 dark:text-slate-400">Bus</span>
          <span>{booking.company}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-slate-200 dark:border-slate-600">
          <span className="text-slate-500 dark:text-slate-400">Seats</span>
          <span>{booking.seats?.join(', ')}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-slate-500 dark:text-slate-400">Total</span>
          <span className="font-bold text-[#0F7B5F] dark:text-emerald-400">
            {Number(booking.total).toLocaleString()} RWF
          </span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleDownloadPDF}
        className="w-full py-3 rounded-xl bg-[#0F7B5F] hover:bg-[#0a5a45] text-white font-semibold transition-colors"
      >
        Download PDF
      </motion.button>
    </motion.div>
  )
}

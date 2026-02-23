import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Smartphone, Wallet, CreditCard, X, Loader2 } from 'lucide-react'

const METHODS = [
  { id: 'mtn', label: 'MTN MoMo', icon: Smartphone },
  { id: 'airtel', label: 'Airtel Money', icon: Wallet },
  { id: 'visa', label: 'Visa', icon: CreditCard },
]

const springButton = { type: 'spring', stiffness: 300, damping: 20 }
const VALID_PROMO = 'BOOKIT-TEST-2026'

export function PaymentModal({ isOpen, onClose, onSuccess }) {
  const [selectedMethod, setSelectedMethod] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [requestMessage, setRequestMessage] = useState('')
  const [promoCode, setPromoCode] = useState('')
  const [promoError, setPromoError] = useState('')

  const resetState = () => {
    setSelectedMethod('')
    setPhoneNumber('')
    setIsProcessing(false)
    setRequestMessage('')
    setPromoCode('')
    setPromoError('')
  }

  const handleClose = () => {
    resetState()
    onClose()
  }

  const handleConfirmNumber = () => {
    if (!phoneNumber.trim()) return
    setRequestMessage('')
    setIsProcessing(true)

    setTimeout(() => {
      setIsProcessing(false)
      setRequestMessage(
        `A payment request has been sent to ${phoneNumber}. Please confirm on your phone.`
      )
    }, 2000)
  }

  const handlePromoSubmit = () => {
    if (promoCode.trim() === VALID_PROMO) {
      onSuccess({ method: 'Promo Code' })
      resetState()
      return
    }
    setPromoError('Invalid promo code')
  }

  const handleVisaPayment = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      onSuccess({ method: 'Visa' })
      resetState()
    }, 2000)
  }

  const handleMomoAirtelSuccess = () => {
    if (!selectedMethod) return
    onSuccess({ method: selectedMethod === 'mtn' ? 'MTN MoMo' : 'Airtel Money' })
    resetState()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Complete Payment</h2>
              <button
                type="button"
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close payment modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">Select payment method</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {METHODS.map((method) => {
                  const Icon = method.icon
                  const active = selectedMethod === method.id
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => {
                        setSelectedMethod(method.id)
                        setRequestMessage('')
                      }}
                      className={`rounded-2xl border-2 p-4 flex flex-col items-center gap-2 transition-all ${
                        active
                          ? 'border-[#0F7B5F] bg-[#0F7B5F]/10 dark:bg-emerald-500/10'
                          : 'border-slate-200 dark:border-slate-700 hover:border-[#0F7B5F]/40'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{method.label}</span>
                    </button>
                  )
                })}
              </div>

              {(selectedMethod === 'mtn' || selectedMethod === 'airtel') && (
                <div className="space-y-3 pt-1">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+2507XXXXXXXX"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#0F7B5F]"
                  />
                  <motion.button
                    type="button"
                    onClick={handleConfirmNumber}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={springButton}
                    disabled={!phoneNumber.trim() || isProcessing}
                    className="w-full rounded-xl bg-[#0F7B5F] hover:bg-[#0c644f] text-white font-semibold py-3 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {isProcessing ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      'Confirm Number'
                    )}
                  </motion.button>
                  {requestMessage ? (
                    <div className="space-y-3">
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">{requestMessage}</p>
                      <motion.button
                        type="button"
                        onClick={handleMomoAirtelSuccess}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        transition={springButton}
                        className="w-full rounded-xl border border-emerald-600 text-emerald-700 dark:text-emerald-400 py-2.5 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors"
                      >
                        I Have Confirmed Payment
                      </motion.button>
                    </div>
                  ) : null}
                </div>
              )}

              {selectedMethod === 'visa' && (
                <div className="pt-1">
                  <motion.button
                    type="button"
                    onClick={handleVisaPayment}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={springButton}
                    disabled={isProcessing}
                    className="w-full rounded-xl bg-[#0F7B5F] hover:bg-[#0c644f] text-white font-semibold py-3 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {isProcessing ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      'Pay with Visa'
                    )}
                  </motion.button>
                </div>
              )}

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Or use Promo Code</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value)
                      setPromoError('')
                    }}
                    placeholder="Enter promo code"
                    className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#0F7B5F]"
                  />
                  <motion.button
                    type="button"
                    onClick={handlePromoSubmit}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={springButton}
                    className="px-5 rounded-xl bg-[#0F7B5F] hover:bg-[#0c644f] text-white font-semibold transition-colors"
                  >
                    Apply
                  </motion.button>
                </div>
                {promoError ? <p className="text-sm text-red-600 mt-2">{promoError}</p> : null}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

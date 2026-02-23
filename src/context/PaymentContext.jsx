import { createContext, useContext, useMemo, useState } from 'react'

const PaymentContext = createContext(null)

export function PaymentProvider({ children }) {
  const [isPaid, setIsPaid] = useState(false)
  const [bookingData, setBookingData] = useState(null)

  const completePayment = (data) => {
    setBookingData(data)
    setIsPaid(true)
  }

  const resetPayment = () => {
    setIsPaid(false)
    setBookingData(null)
  }

  const value = useMemo(
    () => ({
      isPaid,
      bookingData,
      completePayment,
      resetPayment,
    }),
    [isPaid, bookingData]
  )

  return <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
}

export function usePayment() {
  const context = useContext(PaymentContext)
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider')
  }
  return context
}

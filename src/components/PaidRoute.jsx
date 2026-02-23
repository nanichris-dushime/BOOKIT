import { Navigate } from 'react-router-dom'
import { usePayment } from '../context/PaymentContext'

export function PaidRoute({ children }) {
  const { isPaid } = usePayment()

  if (!isPaid) {
    return <Navigate to="/booking" replace />
  }

  return children
}

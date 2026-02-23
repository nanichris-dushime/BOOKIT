import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Login } from '../pages/Login'

export function ProtectedRoute({ children, role }) {
  const { isAuthenticated, userRole } = useAuth()

  if (!isAuthenticated) {
    return <Login />
  }

  if (role && userRole !== role) {
    return <Login />
  }

  return children
}

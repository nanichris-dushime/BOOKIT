import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const springButton = { type: 'spring', stiffness: 300, damping: 20 }

export function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Please enter both email and password.')
      return
    }

    try {
      const result = login(email, password)
      if (result.role === 'admin') {
        navigate('/only-admin', { replace: true })
        return
      }
      navigate('/', { replace: true })
    } catch {
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-800 shadow-[0_18px_30px_-14px_rgba(15,123,95,0.28)] p-8"
      >
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Login</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-6">
          Sign in to continue to BOOKIT.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-3 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-[#0F7B5F]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-3 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-[#0F7B5F]"
            />
          </div>

          {error ? (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          ) : null}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={springButton}
            className="w-full rounded-xl bg-[#0F7B5F] hover:bg-[#0c644f] text-white font-semibold py-3 transition-colors"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

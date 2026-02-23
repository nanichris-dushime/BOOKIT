import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Bus, Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

export function Navbar() {
  const { isDark, toggle } = useTheme()
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const transparent = pathname === '/'

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        transparent
          ? 'bg-transparent text-white'
          : 'bg-white dark:bg-slate-900 shadow-sm text-slate-800 dark:text-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#0F7B5F] flex items-center justify-center">
              <Bus className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-inherit">BOOKIT</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium hover:opacity-80 transition-opacity"
            >
              Home
            </Link>
            <Link
              to="/tickets"
              className="text-sm font-medium hover:opacity-80 transition-opacity"
            >
              My Tickets
            </Link>
            <Link
              to="/admin"
              className="text-sm font-medium hover:opacity-80 transition-opacity"
            >
              Admin
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggle}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/20 dark:border-slate-700 bg-slate-900 dark:bg-slate-900"
          >
            <div className="px-4 py-3 space-y-2">
              <Link
                to="/"
                className="block py-2 font-medium"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/tickets"
                className="block py-2 font-medium"
                onClick={() => setMobileOpen(false)}
              >
                My Tickets
              </Link>
              <Link
                to="/admin"
                className="block py-2 font-medium"
                onClick={() => setMobileOpen(false)}
              >
                Admin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Bus, Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/tickets', label: 'My Tickets' },
]

const springButton = { type: 'spring', stiffness: 300, damping: 20 }

export function Navbar() {
  const { isDark, toggle } = useTheme()
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const isHome = pathname === '/'
  const transparent = isHome && !isScrolled

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  const navClasses = transparent
    ? 'bg-transparent text-white'
    : 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md text-slate-900 dark:text-slate-100'

  const iconButtonClasses = transparent
    ? 'p-2 rounded-lg hover:bg-white/10 transition-all duration-300'
    : 'p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300'

  const mobilePanelClasses = transparent
    ? 'md:hidden border-t border-white/20 bg-slate-900/95 text-white backdrop-blur-sm'
    : 'md:hidden border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100'

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClasses}`}
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
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group relative text-sm font-medium hover:opacity-90 transition-all duration-300"
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100 ${
                    transparent ? 'bg-white' : 'bg-[#0F7B5F]'
                  }`}
                />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              transition={springButton}
              onClick={toggle}
              className={iconButtonClasses}
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className={iconButtonClasses}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              transition={springButton}
              onClick={toggle}
              className={iconButtonClasses}
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={mobilePanelClasses}
          >
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block py-2 font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

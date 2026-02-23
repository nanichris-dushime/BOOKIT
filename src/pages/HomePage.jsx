import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { StatCard } from '../components/StatCard'
import { FEATURED_BUS_COMPANIES } from '../utils/constants'

const STATS = [
  { value: '10,000+', label: 'Tickets Booked' },
  { value: '20+', label: 'Bus Companies' },
  { value: '5', label: 'Provinces Covered' },
]

const heroContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const heroItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const springButton = { type: 'spring', stiffness: 300, damping: 20 }

export function HomePage() {
  const navigate = useNavigate()

  return (
    <>
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90" />
        </motion.div>

        <div className="relative z-10 w-full max-w-5xl px-4 py-20 text-center">
          <motion.div variants={heroContainer} initial="hidden" animate="show">
            <motion.span
              variants={heroItem}
              className="inline-block px-4 py-1.5 rounded-full bg-[#0F7B5F] text-white text-sm font-medium mb-6"
            >
              1% smarter travel
            </motion.span>
            <motion.h1
              variants={heroItem}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight"
            >
              Travel Across Rwanda, The Smart Way
            </motion.h1>
            <motion.p
              variants={heroItem}
              className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10"
            >
              Book inter-province bus tickets in Rwanda. Skip the queues. Travel smart.
            </motion.p>
            <motion.button
              variants={heroItem}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={springButton}
              onClick={() => navigate('/booking')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl shadow-lg text-lg font-semibold transition-all duration-300"
            >
              Proceed to Booking
            </motion.button>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {STATS.map((stat, i) => (
              <StatCard key={stat.label} value={stat.value} label={stat.label} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 text-center mb-12"
          >
            Featured Bus Companies
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_BUS_COMPANIES.map((company, i) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.25 }}
                whileHover={{ y: -6 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_30px_-12px_rgba(15,123,95,0.32)] transition-shadow duration-[250ms]"
              >
                <div className="text-4xl mb-3">{company.logo}</div>
                <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">
                  {company.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  ★ {company.rating} rating
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

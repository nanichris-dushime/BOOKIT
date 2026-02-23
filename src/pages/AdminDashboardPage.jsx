import { motion } from 'framer-motion'
import { Ticket, TrendingUp, Route, Bus } from 'lucide-react'

const STATS = [
  { label: 'Total Bookings', value: '2,847', icon: Ticket, color: 'bg-[#0F7B5F]' },
  { label: 'Revenue', value: '12.4M RWF', icon: TrendingUp, color: 'bg-blue-600' },
  { label: 'Active Routes', value: '18', icon: Route, color: 'bg-amber-500' },
]

const BUS_COMPANIES = [
  { id: 1, name: 'Horizon Express', routes: 5, buses: 12 },
  { id: 2, name: 'Volcano Express', routes: 4, buses: 8 },
  { id: 3, name: 'Jaguar Bus', routes: 6, buses: 15 },
  { id: 4, name: 'Royal Express', routes: 3, buses: 6 },
]

export function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {STATS.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08)]"
            >
              <div
                className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mb-4`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stat.value}</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{stat.label}</p>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08)] overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">Bus Management</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Company
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Routes
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Buses
                </th>
                <th className="text-right px-6 py-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {BUS_COMPANIES.map((company) => (
                <tr
                  key={company.id}
                  className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#0F7B5F]/10 flex items-center justify-center">
                        <Bus className="w-5 h-5 text-[#0F7B5F]" />
                      </div>
                      <span className="font-medium text-slate-800 dark:text-slate-100">
                        {company.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{company.routes}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{company.buses}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm text-[#0F7B5F] hover:underline">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bus, Facebook, Twitter, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-slate-900 dark:bg-slate-950 text-slate-300 pt-16 pb-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0F7B5F] flex items-center justify-center">
                <Bus className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-white">BOOKIT</span>
            </div>
            <p className="text-slate-400 max-w-md text-sm leading-relaxed">
              Your trusted platform for inter-province bus travel across Rwanda. Book tickets
              digitally, skip the queues, travel smart.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-[#0F7B5F] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-[#0F7B5F] transition-colors">
                  Search Buses
                </Link>
              </li>
              <li>
                <Link to="/tickets" className="hover:text-[#0F7B5F] transition-colors">
                  My Tickets
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-[#0F7B5F] transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#0F7B5F] transition-colors">
                  Terms
                </a>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-800 hover:bg-[#0F7B5F] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-800 hover:bg-[#0F7B5F] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-800 hover:bg-[#0F7B5F] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} BOOKIT Rwanda. All rights reserved.
        </div>
      </div>
    </motion.footer>
  )
}

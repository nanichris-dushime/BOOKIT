import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export function MainLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <main className={`flex-1 ${isHome ? '' : 'pt-16 md:pt-20'}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

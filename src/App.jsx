import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { MainLayout } from './layouts/MainLayout'
import { DashboardLayout } from './layouts/DashboardLayout'
import { HomePage } from './pages/HomePage'
import { SearchResultsPage } from './pages/SearchResultsPage'
import { SeatSelectionPage } from './pages/SeatSelectionPage'
import { Booking } from './pages/Booking'
import { BookingSummaryPage } from './pages/BookingSummaryPage'
import { DigitalTicketPage } from './pages/DigitalTicketPage'
import { TicketsPage } from './pages/TicketsPage'
import { AdminDashboardPage } from './pages/AdminDashboardPage'
import { AdminBusesPage } from './pages/AdminBusesPage'
import { AdminAnalyticsPage } from './pages/AdminAnalyticsPage'
import { AdminOnly } from './pages/AdminOnly'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/seats" element={<SeatSelectionPage />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking/summary" element={<BookingSummaryPage />} />
            <Route path="/ticket" element={<DigitalTicketPage />} />
            <Route path="/tickets" element={<TicketsPage />} />
          </Route>
          <Route element={<DashboardLayout />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/buses" element={<AdminBusesPage />} />
            <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          </Route>
          <Route path="/only-admin" element={<AdminOnly />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

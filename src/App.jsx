import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { PaymentProvider } from './context/PaymentContext'
import { MainLayout } from './layouts/MainLayout'
import { DashboardLayout } from './layouts/DashboardLayout'
import { PageWrapper } from './components/PageWrapper'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PaidRoute } from './components/PaidRoute'
import { HomePage } from './pages/HomePage'
import { SearchResultsPage } from './pages/SearchResultsPage'
import { SeatSelectionPage } from './pages/SeatSelectionPage'
import { Booking } from './pages/Booking'
import { BookingSummaryPage } from './pages/BookingSummaryPage'
import { TicketConfirmation } from './pages/TicketConfirmation'
import { TicketsPage } from './pages/TicketsPage'
import { AdminDashboardPage } from './pages/AdminDashboardPage'
import { AdminBusesPage } from './pages/AdminBusesPage'
import { AdminAnalyticsPage } from './pages/AdminAnalyticsPage'
import { AdminOnly } from './pages/AdminOnly'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={(
              <PageWrapper>
                <HomePage />
              </PageWrapper>
            )}
          />
          <Route
            path="/search"
            element={(
              <PageWrapper>
                <SearchResultsPage />
              </PageWrapper>
            )}
          />
          <Route
            path="/seats"
            element={(
              <PageWrapper>
                <SeatSelectionPage />
              </PageWrapper>
            )}
          />
          <Route
            path="/booking"
            element={(
              <PageWrapper>
                <Booking />
              </PageWrapper>
            )}
          />
          <Route
            path="/booking/summary"
            element={(
              <PageWrapper>
                <BookingSummaryPage />
              </PageWrapper>
            )}
          />
          <Route
            path="/ticket"
            element={(
              <PaidRoute>
                <PageWrapper>
                  <TicketConfirmation />
                </PageWrapper>
              </PaidRoute>
            )}
          />
          <Route
            path="/tickets"
            element={(
              <PageWrapper>
                <TicketsPage />
              </PageWrapper>
            )}
          />
        </Route>
        <Route
          element={(
            <ProtectedRoute role="admin">
              <DashboardLayout />
            </ProtectedRoute>
          )}
        >
          <Route
            path="/admin"
            element={(
              <PageWrapper>
                <AdminDashboardPage />
              </PageWrapper>
            )}
          />
          <Route
            path="/admin/buses"
            element={(
              <PageWrapper>
                <AdminBusesPage />
              </PageWrapper>
            )}
          />
          <Route
            path="/admin/analytics"
            element={(
              <PageWrapper>
                <AdminAnalyticsPage />
              </PageWrapper>
            )}
          />
        </Route>
        <Route
          path="/only-admin"
          element={(
            <ProtectedRoute role="admin">
              <PageWrapper>
                <AdminOnly />
              </PageWrapper>
            </ProtectedRoute>
          )}
        />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PaymentProvider>
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </PaymentProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
